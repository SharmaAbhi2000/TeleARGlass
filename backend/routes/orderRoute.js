import express from 'express'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay, placePrebookingOrder, updatePrebookingPayment, payRemainingAmount, verifyRemainingPayment, cancelOrderRequest, cancelOrderDirect, replaceOrderRequest, repairOrderRequest, createItemRequest} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// Pre-booking Features
orderRouter.post('/prebooking',authUser,placePrebookingOrder)
orderRouter.post('/prebooking/payment',authUser,updatePrebookingPayment)
orderRouter.post('/pay-remaining',authUser,payRemainingAmount)
orderRouter.post('/verify-remaining',authUser,verifyRemainingPayment)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)

// Order management features
orderRouter.post('/cancel-request',authUser, cancelOrderRequest)
orderRouter.post('/cancel-direct',authUser, cancelOrderDirect)
orderRouter.post('/replace-request',authUser, replaceOrderRequest)
orderRouter.post('/repair-request',authUser, repairOrderRequest)
orderRouter.post('/item-request',authUser, createItemRequest)

export default orderRouter