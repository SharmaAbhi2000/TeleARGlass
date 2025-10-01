import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  features: { type: Array, required: false },
  bestseller: { type: Boolean },
  subscribtion: { type: Boolean },
  
  // Pre-booking payment structure
  prebooking: {
    enabled: { type: Boolean, default: false },
    firstPaymentPercentage: { type: Number, default: 29 }, // 29% for first payment
    firstPaymentAmount: { type: Number }, // Calculated: price * (firstPaymentPercentage / 100)
    remainingAmount: { type: Number }, // Calculated: price - firstPaymentAmount
  },

  date: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
});

const productModel  = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel