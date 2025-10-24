import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default:'Order Placed' },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true , default: false },
    date: {type: Number, required:true},
    deliveredDate: { type: Number }, // When order was delivered for time validation    
    
    // Pre-booking payment structure
    prebooking: {
        isPrebooking: { type: Boolean, default: false },
        firstPaymentAmount: { type: Number }, // Amount paid initially (29%)
        remainingAmount: { type: Number }, // Amount to be paid later (71%)
        firstPaymentStatus: { type: String, default: 'pending' }, // pending, paid, failed
        remainingPaymentStatus: { type: String, default: 'pending' }, // pending, paid, failed
        firstPaymentDate: { type: Number }, // When first payment was made
        remainingPaymentDate: { type: Number }, // When remaining payment was made
    },
    
    // Order management features
    canCancel: { type: Boolean, default: true }, // Can cancel order anytime before delivery
    cancelRequest: {
        isRequested: { type: Boolean, default: false },
        requestDate: { type: Number },
        reason: { type: String },
        status: { type: String, default: 'pending' } // pending, approved, rejected
    },
    
    // Replace order (within 5 days of delivery)
    replaceRequest: {
        isRequested: { type: Boolean, default: false },
        requestDate: { type: Number },
        reason: { type: String },
        status: { type: String, default: 'pending' } // pending, approved, rejected, completed
    },
    
    // Tele Modify request (within 9 months of order)
    repairRequest: {
        isRequested: { type: Boolean, default: false },
        requestDate: { type: Number },
        issue: { type: String },
        status: { type: String, default: 'pending' } // pending, in_progress, completed, rejected
    },

    // Item-level requests submitted by user via Orders page
    itemRequests: [{
        itemIndex: { type: Number },
        productId: { type: String },
        name: { type: String },
        size: { type: String },
        quantity: { type: Number },
        type: { type: String, enum: ['cancel', 'replace', 'repair', 'modify'], required: true },
        description: { type: String },
        status: { type: String, default: 'pending' }, // pending, approved, rejected, resolved
        requestedAt: { type: Number, default: () => Date.now() }
    }],

    // Rating system for each order
    rating: {
        isRated: { type: Boolean, default: false },
        rating: { type: Number, min: 1, max: 5 },
        review: { type: String },
        ratedAt: { type: Number }
    }
})

// Add database indexes for better performance with multiple users
orderSchema.index({ userId: 1, date: -1 }); // For user orders query (most important)
orderSchema.index({ status: 1 }); // For admin order filtering
orderSchema.index({ date: -1 }); // For order listing
orderSchema.index({ 'prebooking.isPrebooking': 1 }); // For pre-booking queries
orderSchema.index({ 'itemRequests.type': 1 });
orderSchema.index({ 'itemRequests.status': 1 });

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;