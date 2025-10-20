import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  features: { type: Array, required: false },
  bestseller: { type: Boolean },
  subscribtion: { type: Boolean },

  // New pricing structure
  actual_price: { type: Number, required: true },
  discountPrice: { type: Number, required: true },

  // Pre-booking flags and prices
  is_prebooking: { type: Boolean, default: false },
  pre_book_price: { type: Number },
  post_book_price: { type: Number },

  date: { type: Number, required: true },
});

const productModel  = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel