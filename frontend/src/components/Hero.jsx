import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import Button from "./ui/Button";


const Hero = () => {
  return (
    <div className="rounded-lg  bg-gradient-to-br from-indigo-900 via-teal-800 to-blue-900 text-white">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-sm font-medium mb-4">
                New Products Available
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Serving humanity through technology.
            </h1>
            <p className="text-gray-200 text-lg md:text-xl">
              Explore our collection of cutting-edge TeleAR Glasses.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                variant="primary"
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Link to="/products" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </Button>

        
            </div>
            <div className="flex items-center space-x-6 text-sm pt-2">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1.5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>After sales service</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1.5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>5-Day Returns with receipt</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-1.5 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Repair</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Blurry background animation */}
            <div className="absolute -top-12 -left-12 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            {/* Embedded YouTube Video */}
            <div className="relative w-full max-w-4xl mx-auto aspect-video overflow-hidden rounded-xl shadow-lg">
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
