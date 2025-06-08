import { contactQuery } from "../models/contactQuery.js";

export const contactus = async (req, res) => {
  try {
    const { name, email, phone, query } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !query) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuery = new contactQuery({
      name,
      email,
      phone,
      query,
    });

    await newQuery.save();

    return res.status(201).json({ message: "Query submitted successfully." });
  } catch (error) {
    console.error("Error saving contact query:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
