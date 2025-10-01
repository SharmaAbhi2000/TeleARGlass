import React from "react";
import { useNavigate } from "react-router-dom";
const About = () => {
  const router=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50">
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-6">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            ALL <span className="text-teal-600">SERVICES</span>
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Comprehensive TeleARGlass services for all your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Service 1 */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-2 text-xs">
                1
              </div>
              <h3 className="text-base font-bold text-gray-800">
                TeleOrientation
              </h3>
            </div>
            <div className="ml-8">
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.youtube.com/watch?v=AA4sS5zEqeg&list=TLGGcYcGan7ykf4yMzA2MjAyNQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 cursor-pointer rounded text-xs font-medium hover:bg-blue-200 transition-colors duration-200">
                    TeleWatch
                  </span>
                </a>
                <a
                  href="contact"
                  className="block"
                >
                  <span className="bg-blue-100 cursor-pointer text-blue-800 px-2 py-1 rounded text-xs font-medium hover:bg-blue-200 transition-colors duration-200">
                    TeleBook Live in Store
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-2 text-xs">
                2
              </div>
              <h3 className="text-base font-bold text-gray-800">
                Parijat Services
              </h3>
            </div>
            <p className="ml-8 text-gray-600 leading-relaxed text-sm">
              It is for the solutions regarding software issues in the TeleARGlass.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-2 text-xs">
                3
              </div>
              <h3 className="text-base font-bold text-gray-800">
                TeleMaintenance
              </h3>
            </div>
            <p className="ml-8 text-gray-600 leading-relaxed text-sm">
             It is for the repairing of TeleARGlass once warranty expires.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mr-2 text-xs">
                4
              </div>
              <h3 className="text-base font-bold text-gray-800">TeleSecurity</h3>
            </div>
            <p className="ml-8 text-gray-600 leading-relaxed text-sm">
              It is highly expert TeleARGlass Cyber officials, if 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
