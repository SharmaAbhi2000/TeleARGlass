import  { useEffect, useState } from "react";
import { Star, Heart, ShoppingCart, Loader2 } from "lucide-react";



const products = {
  name: "Premium Wireless Headphones",
  originalPrice: 299.99,
  discountedPrice: 209.99,
  rating: 4.8,
  reviews: 1247,
  image: "https://i.postimg.cc/qNPg795R/TELEARGLASS-2.jpg",
  features: [
    "Active Noise Cancellation",
    "30-hour Battery Life",
    "Premium Sound Quality",
    "Comfortable Design",
  ],
  description:
    "Experience premium audio with our latest wireless headphones featuring advanced noise cancellation and exceptional battery life.",
};


export default function Preorder() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(products);


  

  // Calculate discount percentage
  const discount = product
    ? Math.round(
        ((product.originalPrice - product.discountedPrice) /
          product.originalPrice) *
          100
      )
    : 0;

  return (
    <div className="w-full bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600 p-8 rounded-lg shadow-2xl relative overflow-hidden">
      {/* Peacock Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full transform -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full transform translate-x-20 translate-y-20"></div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Left Half - Prebooking Info */}
        <div className="text-white space-y-6 relative z-10">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Pre-booking
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-3xl md:text-5xl font-bold text-cyan-300">
                Get {discount}% OFF
              </span>
              <div className="bg-gradient-to-r from-cyan-300 to-emerald-300 text-teal-900 px-3 py-1 rounded-full text-sm font-semibold">
                Limited Time
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg opacity-90">
              Be among the first to experience our latest product launch.
              Pre-book now and save big!
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-cyan-300/20">
              <h3 className="font-semibold text-lg text-cyan-200">
                Pre-booking Benefits:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-emerald-300 rounded-full"></div>
                  <span>Priority shipping when available</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-emerald-300 rounded-full"></div>
                  <span>Exclusive {discount}% discount</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-emerald-300 rounded-full"></div>
                  <span>Free premium accessories worth $50</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-300 to-emerald-300 rounded-full"></div>
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Half - Product Image and Details */}
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <div className="space-y-6">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                    //@ts-ignore
                  e.target.src =
                    "https://via.placeholder.com/500x300?text=Product+Image";
                }}
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                -{discount}%
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm">{product.description}</p>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {product.features &&
                    product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                    ${product.discountedPrice}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <p className="text-sm text-emerald-600 font-medium">
                  You save $
                  {(product.originalPrice - product.discountedPrice).toFixed(2)}
                </p>
              </div>

              {/* Quantity and Pre-book Button */}
              <div className="space-y-4">
               

                <button className="w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-teal-700 hover:via-cyan-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Pre-book Now</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Pre-booking doesn't charge until shipping. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
