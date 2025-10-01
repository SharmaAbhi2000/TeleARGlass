import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Title from "./Title";

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
      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50">
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-6">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <Title text1={"TELE"} text2={"MODIFY"} />
            </div>
             <p className="text-sm font-bold text-teal-600 mt-2 bg-teal-50 rounded-lg">
               Please let us know for TeleARGlass Products Exchange or Repair
             </p>
          </div>

           <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
             <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
               Contact Us
             </h3>
             
             {/* 5-Day Policy Notice */}
             <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                 <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                 </svg>
                 <h4 className="text-sm font-semibold text-orange-800">Please Keep in mind</h4>
               </div>
               <p className="text-sm text-orange-700">
                 <strong>5-Day Policy:</strong> TeleARGlass Products are only acceptable for exchange or repair within 5 days of purchase.
               </p>
             </div>

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="query"
                placeholder="Your Query"
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                value={formData.query}
                onChange={handleChange}
                required
              />
              <div className="flex space-x-3">
                <input
                  type="date"
                  name="date"
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <input
                  type="time"
                  name="time"
                  className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed shining-button shining-teal"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
