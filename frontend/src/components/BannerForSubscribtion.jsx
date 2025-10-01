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
    <div className="relative bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-0 w-48 h-48 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex justify-center items-center mb-4">
            <div className="relative">
              <img src={"logo.jpeg"} className="w-48 h-24 rounded-xl" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-3">
            TeleARGlass
          </h1>

          <div className="text-lg md:text-xl font-semibold text-orange-500 mb-6">
            Patent Licensing
          </div>
        </div>

        {/* Main Content Card */}
        <div
          className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-teal-600/80 via-blue-700/80 to-emerald-600/80 rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl">
            {/* Innovation Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Our Innovative, Sustainable
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  {" "}
                  MakeInIndia
                </span>{" "}
                Patented Product
              </h2>
            </div>

            {/* Technology Description */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <div className="space-y-3 text-base text-white">
                  <p>
                    <span className="text-purple-600 font-semibold">
                      TeleARGlass
                    </span>{" "}
                    works with technology using our 
                    <span className="text-purple-600 font-semibold">
                      {" "}
                      PanOS Operating System
                    </span>{" "}
                    and its customizable range of
                    <span className="text-purple-600 font-semibold">
                      {" "}
                      30+ Product Software Apps
                    </span>
                    .
                  </p>
                  <p>
                    Experience{" "}
                    <span className="text-purple-600 font-semibold">
                      Immersive Augmented Reality (AR) Display
                    </span>
                    , advanced{" "}
                    <span className="text-purple-600 font-semibold">
                      Speaking Accessibility
                    </span>{" "}
                    features, and much more.
                  </p>
                </div>
              </div>

              {/* Feature Icons */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-3 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-md`}
                  >
                    <feature.icon className="w-6 h-6 text-emerald-400 mb-2" />
                    <span className="text-xs text-white text-center">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Solution */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                Complete Solution Package
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
                  <div className="text-emerald-400 font-bold text-base mb-2">
                    Customizable Software
                  </div>
                  <div className="text-white text-xs">
                    <ul className="text-left list-disc space-y-1">
                      <li>ISRO Space Communication</li>
                      <li>DRDO Applications</li>
                      <li>Legacy Mobile Features</li>
                      <li>Accessibility Tools</li>
                      <li>Social Media Integration</li>
                      <li>Gaming & Entertainment</li>
                      <li>Home Automation</li>
                      <li>Robotics Control</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                  <div className="text-blue-400 font-bold text-base mb-2">
                    Aesthetic Design and Ergonomics
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-pink-600/20 to-pink-700/20 border border-pink-500/30">
                  <div className="text-pink-600 font-bold text-base mb-2">
                    Data Interpretation Techniques
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/30">
                  <div className="text-indigo-600 font-bold text-base mb-2">
                    Data capturing Sensor Design
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <Subscribtion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
