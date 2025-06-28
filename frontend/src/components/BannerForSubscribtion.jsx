import { useState, useEffect } from "react";
import {
  Eye,
  Cpu,
  Smartphone,
  Zap,
  Sparkles,
  Brain,
  Glasses,
} from "lucide-react";
import Subscribtion from "./Subscribtion";

export default function BannerForSubscribtion() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: Brain, text: "Thinking" },
    { icon: Eye, text: "Immersive AR Display" },
    { icon: Smartphone, text: "Speaking Accessibility" },
    { icon: Cpu, text: "PanOS Operating System" },
    { icon: Zap, text: "AI Data Interpretation" },
    { icon: Sparkles, text: "30+ Product Apps" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Peacock Feather Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <Glasses className="w-16 h-16 text-emerald-400 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent mb-4 animate-pulse">
            TeleARGlass
          </h1>

          <div className="text-2xl md:text-3xl font-semibold text-cyan-300 mb-8">
            Patent Licensing
          </div>
        </div>

        {/* Main Content Card */}
        <div
          className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            {/* Innovation Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Innovative, Sustainable
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  {" "}
                  MakeInIndia
                </span>{" "}
                Patented Product
              </h2>
            </div>

            {/* Technology Description */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-emerald-300 mb-6">
                  Advanced Technology Stack
                </h3>
                <div className="space-y-4 text-lg text-gray-200">
                  <p>
                    <span className="text-cyan-300 font-semibold">
                      TeleARGlass
                    </span>{" "}
                    works with cutting-edge technology using our proprietary
                    <span className="text-emerald-400 font-semibold">
                      {" "}
                      PanOS Operating System
                    </span>{" "}
                    and its customizable range of
                    <span className="text-blue-400 font-semibold">
                      {" "}
                      30+ Product Software Apps
                    </span>
                    .
                  </p>
                  <p>
                    Experience{" "}
                    <span className="text-purple-400 font-semibold">
                      Immersive Augmented Reality (AR) Display
                    </span>
                    , advanced{" "}
                    <span className="text-pink-400 font-semibold">
                      Speaking Accessibility
                    </span>{" "}
                    features, and much more.
                  </p>
                </div>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-lg delay-${
                      index * 100
                    }`}
                  >
                    <feature.icon className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="text-sm text-gray-300 text-center">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Solution */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Complete Solution Package
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
                  <div className="text-emerald-400 font-bold text-lg mb-2">
                    Customizable Software
                  </div>
                  <div className="text-gray-300 text-sm">
                    Highly adaptable TeleARGlass software suite
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                  <div className="text-blue-400 font-bold text-lg mb-2">
                    Aesthetic Design
                  </div>
                  <div className="text-gray-300 text-sm">
                    Beautiful aesthetics & ergonomic design
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                  <div className="text-purple-400 font-bold text-lg mb-2">
                    AI Interpretation
                  </div>
                  <div className="text-gray-300 text-sm">
                    Advanced AI data interpretation techniques
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-400/30">
                  <div className="text-indigo-400 font-bold text-lg mb-2">
                    Sensor Design
                  </div>
                  <div className="text-gray-300 text-sm">
                    Sophisticated data capturing sensor design
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              {/* <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Explore Licensing Opportunities
              </button> */}

              <Subscribtion />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-1/4 left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
        <div className="fixed top-1/3 right-8 w-3 h-3 bg-blue-400 rounded-full animate-ping delay-1000"></div>
        <div className="fixed bottom-1/4 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-2000"></div>
      </div>
    </div>
  );
}
