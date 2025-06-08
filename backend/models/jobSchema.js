// models/Applicant.js
import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  fullName: String,
  birthDate: Date,
  gender: String,
  address: String,
  aadhar: String,
  contact: String,
  email: String,
  resumeUrl: String, // store uploaded resume file URL or path
});

export const Applicant = mongoose.model("Applicant", applicantSchema);
