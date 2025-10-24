import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Title from "./Title";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
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
        query: "",
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
              <Title text1={"TELE"} text2={"FEEDBACK"} />
            </div>
             <p className="text-sm font-bold text-teal-600 mt-2 bg-teal-50 rounded-lg">
               Please share your feedback about TeleARGlass Products
             </p>
          </div>

           <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
             
             {/* Feedback Policy Notice */}
             <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
               <div className="flex items-center gap-2 mb-2">
                 <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                 </svg>
                 <h4 className="text-sm font-semibold text-blue-800">We Value Your Feedback</h4>
               </div>
               <p className="text-sm text-blue-700">
                 <strong>Your Opinion Matters:</strong> Help us improve our TeleARGlass products by sharing your experience and suggestions.
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
              <textarea
                name="query"
                placeholder="Your Query"
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                value={formData.query}
                onChange={handleChange}
                required
              />

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
