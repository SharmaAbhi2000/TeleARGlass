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
    
    // Pre-booking payment structure
    prebooking: {
        isPrebooking: { type: Boolean, default: false },
        firstPaymentAmount: { type: Number }, // Amount paid initially (29%)
        remainingAmount: { type: Number }, // Amount to be paid later (71%)
        firstPaymentStatus: { type: String, default: 'pending' }, // pending, paid, failed
        remainingPaymentStatus: { type: String, default: 'pending' }, // pending, paid, failed
        firstPaymentDate: { type: Number }, // When first payment was made
        remainingPaymentDate: { type: Number }, // When remaining payment was made
    }
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;