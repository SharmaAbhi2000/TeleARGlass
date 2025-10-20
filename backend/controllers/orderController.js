import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import mongoose from 'mongoose'; // Add mongoose import for transactions and validation
import Stripe from 'stripe'
import razorpay from 'razorpay'

// Validate required environment variables
const requiredEnvVars = ['STRIPE_SECRET_KEY', 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'JWT_SECRET'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`Missing required environment variable: ${varName}`);
    }
});

// global variables
const currency = 'inr'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET,
})

// Utility: Compute server-side totals using authoritative product data
const computeServerSideTotals = async (items) => {
    // Input validation
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error('Invalid items array: items must be a non-empty array');
    }
    
    // items: array with {_id, quantity}
    let nowDueSubTotal = 0; // amount to charge now
    let fullOrderSubTotal = 0; // full product value (if needed)
    let normalizedItems = [];

    for (const clientItem of items) {
        const productId = clientItem._id || clientItem.id || clientItem.itemId;
        
        // Validate product ID
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('Invalid product ID provided');
        }
        
        const doc = await productModel.findById(productId);
        if (!doc) {
            throw new Error(`Product not found for ID: ${productId}`);
        }
        
        // Validate quantity
        const quantity = Number(clientItem.quantity || 1);
        if (quantity <= 0 || quantity > 100 || isNaN(quantity)) {
            throw new Error(`Invalid quantity for product ${doc.name}: ${clientItem.quantity}`);
        }

        const actualPrice = Number(doc.actual_price);
        const discountedPrice = Number(doc.discountPrice);
        const isPre = Boolean(doc.is_prebooking);
        const preNow = Number(doc.pre_book_price || 0);
        const postLater = Number(doc.post_book_price || 0);

        // Prioritize actual_price, only use discountedPrice if it's positive and actual_price is not available/invalid
        let validPrice = 0;
        if (actualPrice && !isNaN(actualPrice) && actualPrice > 0) {
            validPrice = actualPrice;
        } else if (discountedPrice && !isNaN(discountedPrice) && discountedPrice > 0) {
            validPrice = discountedPrice;
        } else if (actualPrice && !isNaN(actualPrice)) {
            // Use actual_price even if it seems low, it might be correct
            validPrice = actualPrice;
        } else {
            throw new Error(`Invalid pricing for product ${doc.name}: actual_price=${actualPrice}, discountPrice=${discountedPrice}`);
        }
        
        const priceToChargeNow = isPre ? preNow : validPrice;
        const fullValue = isPre ? preNow + postLater : validPrice;

        nowDueSubTotal += priceToChargeNow * quantity;
        fullOrderSubTotal += fullValue * quantity;

        // Normalize item payload stored in order (avoid trusting client price)
        normalizedItems.push({
            _id: doc._id,
            name: doc.name,
            image: doc.image,
            category: doc.category,
            quantity,
            priceNow: priceToChargeNow,
            fullPrice: fullValue,
            is_prebooking: isPre,
        });
    }

    return { nowDueSubTotal, fullOrderSubTotal, normalizedItems };
}

// Placing orders using COD Method (server-side totals with transaction)
const placeOrder = async (req,res) => {
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction(async () => {
            const { userId, items, address } = req.body;

            // Validate inputs
            if (!userId || !items || !address) {
                throw new Error('Missing required fields: userId, items, or address');
            }

            const { nowDueSubTotal, fullOrderSubTotal, normalizedItems } = await computeServerSideTotals(items || []);
            const amount = nowDueSubTotal + deliveryCharge;

            const orderData = {
                userId,
                items: normalizedItems,
                address,
                amount,
                paymentMethod: "COD",
                payment: false,
                date: Date.now()
            }

            const newOrder = new orderModel(orderData)
            await newOrder.save({ session })

            await userModel.findByIdAndUpdate(userId, { cartData: {} }, { session })
        });

        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.error('Order placement error:', error);
        res.json({ success: false, message: error.message });
    } finally {
        session.endSession();
    }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req,res) => {
    try {
        const { userId, items, address } = req.body
        const { origin } = req.headers;

        // Validate inputs
        if (!userId || !items || !address) {
            throw new Error('Missing required fields: userId, items, or address');
        }

        const { nowDueSubTotal, normalizedItems } = await computeServerSideTotals(items || []);
        const amount = nowDueSubTotal + deliveryCharge;

        const orderData = {
            userId,
            items: normalizedItems,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        // Save order first, then create Stripe session
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = normalizedItems.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.priceNow * 100)
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: stripeSession.url });

    } catch (error) {
        console.error('Stripe order placement error:', error);
        res.json({ success: false, message: error.message });
    }
}

// Verify Stripe 
const verifyStripe = async (req,res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true});
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req,res) => {
    try {
        const { userId, items, address } = req.body

        // Validate inputs
        if (!userId || !items || !address) {
            throw new Error('Missing required fields: userId, items, or address');
        }

        const { nowDueSubTotal, normalizedItems } = await computeServerSideTotals(items || []);
        const amount = nowDueSubTotal + deliveryCharge;

        const orderData = {
            userId,
            items: normalizedItems,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: Math.round(amount * 100),
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success:true,order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const verifyRazorpay = async (req,res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            const order = await orderModel.findById(orderInfo.receipt);
            
            if (order) {
                // Check if this is a pre-booking order first payment
                if (order.prebooking && order.prebooking.isPrebooking && 
                    orderInfo.receipt === order._id.toString() && 
                    !orderInfo.receipt.includes('_remaining')) {
                    
                    // This is a first payment for pre-booking
                    await orderModel.findByIdAndUpdate(orderInfo.receipt, {
                        payment: true,
                        'prebooking.firstPaymentStatus': 'paid',
                        'prebooking.firstPaymentDate': Date.now()
                    });
                } else {
                    // Regular order payment
                    await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
                }
                
                await userModel.findByIdAndUpdate(userId, { cartData: {} });
            }
            
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        
        const orders = await orderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// User Order Data For Forntend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        
        const { orderId, status } = req.body

        // If status is being updated to 'Delivered', set the deliveredDate
        const updateData = { status };
        if (status === 'Delivered') {
            updateData.deliveredDate = Date.now();
        }

        await orderModel.findByIdAndUpdate(orderId, updateData)
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// Place Pre-booking Order (server-side computed amounts with transaction)
const placePrebookingOrder = async (req, res) => {
    const session = await mongoose.startSession();
    
    try {
        await session.withTransaction(async () => {
            const { userId, items, address } = req.body;

            // Validate inputs
            if (!userId || !items || !address) {
                throw new Error('Missing required fields: userId, items, or address');
            }

            const { normalizedItems } = await computeServerSideTotals(items || []);
            // Aggregate first and remaining amounts only for pre-booking items
            let firstPaymentAmount = 0;
            let remainingAmount = 0;
            for (const item of normalizedItems) {
                if (item.is_prebooking) {
                    firstPaymentAmount += (item.priceNow || 0) * item.quantity;
                    // For remaining, use fullPrice - priceNow per unit
                    const unitRemaining = Math.max(0, (item.fullPrice || 0) - (item.priceNow || 0));
                    remainingAmount += unitRemaining * item.quantity;
                } else {
                    // Non-prebooking items are charged fully now
                    firstPaymentAmount += (item.priceNow || 0) * item.quantity;
                }
            }

            const totalAmount = firstPaymentAmount + remainingAmount + deliveryCharge;

            const orderData = {
                userId,
                items: normalizedItems,
                address,
                amount: totalAmount,
                paymentMethod: "Pre-booking",
                payment: false,
                date: Date.now(),
                prebooking: {
                    isPrebooking: true,
                    firstPaymentAmount,
                    remainingAmount,
                    firstPaymentStatus: 'pending',
                    remainingPaymentStatus: 'pending',
                }
            }

            const newOrder = new orderModel(orderData);
            await newOrder.save({ session });

            await userModel.findByIdAndUpdate(userId, { cartData: {} }, { session });

            // Store order data for response outside transaction
            req.tempOrderData = {
                orderId: newOrder._id,
                firstPaymentAmount,
                remainingAmount
            };
        });

        // Send response outside transaction
        res.json({ 
            success: true, 
            message: "Pre-booking order placed", 
            orderId: req.tempOrderData.orderId,
            firstPaymentAmount: req.tempOrderData.firstPaymentAmount,
            remainingAmount: req.tempOrderData.remainingAmount
        });

    } catch (error) {
        console.error('Pre-booking order placement error:', error);
        res.json({ success: false, message: error.message });
    } finally {
        session.endSession();
    }
}

// Update Pre-booking Payment Status
const updatePrebookingPayment = async (req, res) => {
    try {
        const { orderId, paymentType, status } = req.body; // paymentType: 'first' or 'remaining'

        const updateData = {};
        if (paymentType === 'first') {
            updateData['prebooking.firstPaymentStatus'] = status;
            updateData['prebooking.firstPaymentDate'] = Date.now();
        } else if (paymentType === 'remaining') {
            updateData['prebooking.remainingPaymentStatus'] = status;
            updateData['prebooking.remainingPaymentDate'] = Date.now();
        }

        await orderModel.findByIdAndUpdate(orderId, updateData);

        res.json({ success: true, message: `${paymentType} payment status updated` });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Pay remaining amount for pre-booking order
const payRemainingAmount = async (req, res) => {
    try {
        const { userId, orderId } = req.body;

        // Find the order and verify ownership
        const order = await orderModel.findOne({ _id: orderId, userId });
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        if (!order.prebooking || !order.prebooking.isPrebooking) {
            return res.json({ success: false, message: "Not a pre-booking order" });
        }

        if (order.prebooking.firstPaymentStatus !== 'paid') {
            return res.json({ success: false, message: "First payment must be completed first" });
        }

        if (order.prebooking.remainingPaymentStatus === 'paid') {
            return res.json({ success: false, message: "Remaining amount already paid" });
        }

        const remainingAmount = order.prebooking.remainingAmount || 0;
        if (remainingAmount <= 0) {
            return res.json({ success: false, message: "No remaining amount to pay" });
        }

        // Create Razorpay order for remaining payment
        const options = {
            amount: remainingAmount * 100,
            currency: currency.toUpperCase(),
            receipt: `${orderId}_remaining`,
            notes: {
                paymentType: 'prebooking_remaining',
                orderId: orderId.toString()
            }
        }

        await razorpayInstance.orders.create(options, (error, razorpayOrder) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({
                success: true,
                order: razorpayOrder,
                remainingAmount: remainingAmount
            });
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Verify remaining payment
const verifyRemainingPayment = async (req, res) => {
    try {
        const { userId } = req.body; // From auth middleware
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === 'paid') {
            // Extract order ID from receipt (format: orderId_remaining)
            const orderId = orderInfo.receipt.split('_')[0];
            
            // Find and update the order
            const order = await orderModel.findOne({ 
                _id: orderId,
                userId: userId // Ensure user owns this order
            });
            
            if (order && order.prebooking && order.prebooking.isPrebooking) {
                await orderModel.findByIdAndUpdate(order._id, {
                    'prebooking.remainingPaymentStatus': 'paid',
                    'prebooking.remainingPaymentDate': Date.now()
                });
                
                res.json({ success: true, message: "Remaining payment successful" });
            } else {
                res.json({ success: false, message: "Order not found or invalid" });
            }
        } else {
            res.json({ success: false, message: 'Remaining payment failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Create an item-level request (cancel/replace/repair) irrespective of delivery state
const createItemRequest = async (req, res) => {
    try {
        const { userId } = req.body; // from auth middleware
        const { orderId, itemIndex, type, description } = req.body;

        if (!orderId || itemIndex === undefined || !type) {
            return res.json({ success: false, message: 'orderId, itemIndex and type are required' });
        }

        if (!['cancel', 'replace', 'repair'].includes(type)) {
            return res.json({ success: false, message: 'Invalid request type' });
        }

        const order = await orderModel.findOne({ _id: orderId, userId });
        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        if (!Array.isArray(order.items) || itemIndex < 0 || itemIndex >= order.items.length) {
            return res.json({ success: false, message: 'Invalid item index' });
        }

        const targetItem = order.items[itemIndex] || {};

        const requestEntry = {
            itemIndex,
            productId: (targetItem._id && targetItem._id.toString) ? targetItem._id.toString() : (targetItem._id || targetItem.id || ''),
            name: targetItem.name,
            size: targetItem.size,
            quantity: Number(targetItem.quantity || 1),
            type,
            description: description || '',
            status: 'pending',
            requestedAt: Date.now()
        };

        await orderModel.findByIdAndUpdate(orderId, { $push: { itemRequests: requestEntry } });

        res.json({ success: true, message: 'Request submitted', request: requestEntry });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Cancel Order Request
const cancelOrderRequest = async (req, res) => {
    try {
        const { orderId, reason } = req.body;
        const { userId } = req.body; // From auth middleware

        const order = await orderModel.findOne({ _id: orderId, userId });
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Check if order can be cancelled (before delivery)
        if (order.status === 'Delivered') {
            return res.json({ success: false, message: "Cannot cancel delivered order" });
        }

        if (order.cancelRequest.isRequested) {
            return res.json({ success: false, message: "Cancel request already submitted" });
        }

        await orderModel.findByIdAndUpdate(orderId, {
            'cancelRequest.isRequested': true,
            'cancelRequest.requestDate': Date.now(),
            'cancelRequest.reason': reason,
            'cancelRequest.status': 'pending'
        });

        res.json({ success: true, message: "Cancel request submitted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Direct Cancel Order (without pending status)
const cancelOrderDirect = async (req, res) => {
    try {
        const { orderId, reason } = req.body;
        const { userId } = req.body; // From auth middleware

        const order = await orderModel.findOne({ _id: orderId, userId });
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Check if order can be cancelled (before delivery)
        if (order.status === 'Delivered') {
            return res.json({ success: false, message: "Cannot cancel delivered order" });
        }

        if (order.cancelRequest.isRequested) {
            return res.json({ success: false, message: "Order is already being cancelled" });
        }

        // Directly cancel the order and update status
        await orderModel.findByIdAndUpdate(orderId, {
            status: 'Cancelled',
            'cancelRequest.isRequested': true,
            'cancelRequest.requestDate': Date.now(),
            'cancelRequest.reason': reason || 'User requested cancellation',
            'cancelRequest.status': 'approved'
        });

        res.json({ success: true, message: "Order cancelled successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Replace Order Request (within 5 days)
const replaceOrderRequest = async (req, res) => {
    try {
        const { orderId, reason } = req.body;
        const { userId } = req.body; // From auth middleware

        const order = await orderModel.findOne({ _id: orderId, userId });
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Check if order is delivered
        if (order.status !== 'Delivered') {
            return res.json({ success: false, message: "Order must be delivered first" });
        }

        // Check if within 5 days of delivery
        const deliveryDate = order.deliveredDate || order.date;
        const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
        const currentTime = Date.now();
        
        if (currentTime - deliveryDate > fiveDaysInMs) {
            return res.json({ success: false, message: "Replace request must be made within 5 days of delivery" });
        }

        if (order.replaceRequest.isRequested) {
            return res.json({ success: false, message: "Replace request already submitted" });
        }

        await orderModel.findByIdAndUpdate(orderId, {
            'replaceRequest.isRequested': true,
            'replaceRequest.requestDate': Date.now(),
            'replaceRequest.reason': reason,
            'replaceRequest.status': 'pending'
        });

        res.json({ success: true, message: "Replace request submitted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Repair Request (within 3 months)
const repairOrderRequest = async (req, res) => {
    try {
        const { orderId, issue } = req.body;
        const { userId } = req.body; // From auth middleware

        const order = await orderModel.findOne({ _id: orderId, userId });
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        // Check if order is delivered
        if (order.status !== 'Delivered') {
            return res.json({ success: false, message: "Order must be delivered first" });
        }

        // Check if within 3 months of delivery
        const deliveryDate = order.deliveredDate || order.date;
        const threeMonthsInMs = 3 * 30 * 24 * 60 * 60 * 1000; // 3 months in milliseconds (approximate)
        const currentTime = Date.now();
        
        if (currentTime - deliveryDate > threeMonthsInMs) {
            return res.json({ success: false, message: "Repair request must be made within 3 months of delivery" });
        }

        if (order.repairRequest.isRequested) {
            return res.json({ success: false, message: "Repair request already submitted" });
        }

        await orderModel.findByIdAndUpdate(orderId, {
            'repairRequest.isRequested': true,
            'repairRequest.requestDate': Date.now(),
            'repairRequest.issue': issue,
            'repairRequest.status': 'pending'
        });

        res.json({ success: true, message: "Repair request submitted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {verifyRazorpay, verifyStripe ,placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, placePrebookingOrder, updatePrebookingPayment, payRemainingAmount, verifyRemainingPayment, cancelOrderRequest, cancelOrderDirect, replaceOrderRequest, repairOrderRequest, createItemRequest}