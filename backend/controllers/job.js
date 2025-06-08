import { Applicant } from "../models/jobSchema.js";


export const job = async (req, res) => {
  try {
    const { fullName, birthDate, gender, address, aadhar, contact, email } =
      req.body.formData;

    // Save new applicant
    const newApplicant = new Applicant({
      fullName,
      birthDate,
      gender,
      address,
      aadhar,
      contact,
      email,
      resumeUrl: req.file ? req.file.path : null,
    });

    await newApplicant.save();
    res.status(201).json({ message: "Application saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
