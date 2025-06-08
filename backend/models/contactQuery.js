import mongoose, { Schema, Document } from "mongoose";

const ContactQuerySchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  query: { type: String, required: true, trim: true },
  submittedAt: { type: Date, default: () => Date.now() },
});

export const contactQuery = mongoose.model("ContactQuery", ContactQuerySchema);
