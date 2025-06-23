import React from "react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const router=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600 p-6 font-serif">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl border-2 border-blue-200 p-8 rounded-3xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full -ml-12 -mb-12 opacity-50"></div>

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-5xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
              TeleServices
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 mb-8">
            {/* Service 1 */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-blue-800">
                  TeleOrientation
                </h3>
              </div>
              <div className="ml-12">
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=AA4sS5zEqeg&list=TLGGcYcGan7ykf4yMzA2MjAyNQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="bg-blue-200 text-blue-800 px-4 py-2 cursor-pointer rounded-full text-sm font-medium">
                      TeleWatch
                    </span>
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=AA4sS5zEqeg&list=TLGGcYcGan7ykf4yMzA2MjAyNQ&index=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="bg-blue-200 cursor-pointer text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      TeleBook Live in Store
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-purple-800">
                  Parijat Services
                </h3>
              </div>
              <p className="ml-12 text-purple-700 leading-relaxed">
                Comprehensive solutions for software issues in TeleARGlass. Our
                expert team provides remote diagnostics and troubleshooting to
                ensure optimal performance.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-green-800">
                  TeleMaintenance
                </h3>
              </div>
              <p className="ml-12 text-green-700 leading-relaxed">
                Professional repair services for TeleARGlass devices after
                warranty expiration. Certified technicians ensure quality
                repairs and extended device longevity.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl border border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  4
                </div>
                <h3 className="text-xl font-bold text-red-800">TeleSecurity</h3>
              </div>
              <p className="ml-12 text-red-700 leading-relaxed">
                Elite cybersecurity specialists dedicated to TeleARGlass
                protection. Advanced IT security protocols and threat prevention
                for your augmented reality experience.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-2xl text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="mb-4 opacity-90">
              Fill out the customer details form in each section to access our
              premium TeleServices
            </p>
            <button
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              onClick={() => router("/contact")}
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
