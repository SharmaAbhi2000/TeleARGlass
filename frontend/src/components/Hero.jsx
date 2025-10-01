import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import Button from "./ui/Button";


const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600 text-white">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-5 max-w-lg">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-sm font-medium">
                New TeleProducts Available
              </span>
            </div>
            <div className="inline-flex gap-2 items-center mb-2">
              <p className="text-3xl md:text-4xl lg:text-5xl text-gray-200 font-light leading-tight">
                SERVING HUMANITY <span className="text-white font-bold">THROUGH TECHNOLOGY</span>
              </p>
            </div>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed">
              Explore the TeleARGlass products and discover how It will cater your needs.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                asChild
                variant="primary"
                size="md"
                className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 py-2.5 shining-emerald"
              >
                <Link to="teleProducts" className="flex items-center gap-2">
                  TelePurchase Now
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Subtle background animation */}
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            {/* Embedded YouTube Video */}
            <div className="relative w-full max-w-2xl mx-auto aspect-video overflow-hidden rounded-2xl shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/AA4sS5zEqeg?autoplay=1&mute=1&loop=1&controls=1&modestbranding=1&rel=0&playlist=AA4sS5zEqeg"
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
