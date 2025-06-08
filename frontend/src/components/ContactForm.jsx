import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
    date: "",
    time: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
const navigate=useNavigate()
  const handleChange = (
    e
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/contact/addContact`,
        formData
      );

      setSuccess(res.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        query: "",
        date: "",
        time: "",

      });
      if(res.status==201){
      navigate("/")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-900 via-teal-800 to-blue-900 p-10">
        <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-teal-100 via-sky-100 to-violet-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Contact Us
          </h2>

          {success && <p className="mb-4 text-green-600">{success}</p>}
          {error && <p className="mb-4 text-red-600">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-md p-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="query"
              placeholder="Your Query"
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 resize-none"
              value={formData.query}
              onChange={handleChange}
              required
            />
            <div className="flex space-x-4">
              <input
                type="date"
                name="date"
                className="flex-1 border border-gray-300 rounded-md p-2"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="time"
                className="flex-1 border border-gray-300 rounded-md p-2"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
