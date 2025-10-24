import { useContext, useEffect, useState } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { ShopContext } from "../context/ShopContext";



export default function Preorder() {
  const {addToCart,products} = useContext(ShopContext);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const preorder=products.find((e)=>e.bestseller===true);
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    if (preorder) {
      setProduct(preorder);
    }
  }, [products]);
 if(product==null){
  return <p>comming soon</p>
 }
  // Calculate discount percentage
  const discount = product
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <div className="w-full bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600 p-6 rounded-xl shadow-xl relative overflow-hidden">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full transform -translate-x-12 -translate-y-12"></div>
        <div className="absolute top-16 right-8 w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full"></div>
        <div className="absolute bottom-8 left-16 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full transform translate-x-16 translate-y-16"></div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        {/* Left Half - Prebooking Info */}
        <div className="text-white space-y-4 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Pre-booking
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-2xl md:text-3xl font-bold text-cyan-300">
                with 29% Payment
              </span>
              <div className="bg-gradient-to-r from-cyan-300 to-emerald-300 text-teal-900 px-3 py-1 rounded-full text-sm font-semibold">
                Limited Time
              </div>
            </div>
          </div>

          <div className="space-y-4">
          

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-cyan-300/20">
              <h3 className="font-bold text-lg text-cyan-200 text-center">
                Pre-booking Benefits
              </h3>
              <div className="text-center">
                <h4 className="text-base font-semibold text-white leading-relaxed">
                  TELE AR GLASS ARE ENTITLED TO RECEIVE<br/>
                  <span className="text-cyan-300 font-bold">EARLY DELIVERY OF TELEPRODUCTS</span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Product Image and Details */}
        <div className="bg-white rounded-xl p-5 shadow-xl">
          <div className="space-y-4">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image[0]} // use first image in array
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg"
                onError={(e) => {
                  //@ts-ignore
                  e.target.src =
                    "https://via.placeholder.com/500x300?text=Product+Image";
                }}
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
              <div className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                -{discount}%
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating || 4)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.rating || "0"} ({product.reviews || "10"} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Revolutionary Communication Technology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Enhanced User Experience with TeleARGlass and PanOS</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {product.features &&
                    JSON.parse(product.features).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 text-xs text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <span className="text-lg text-gray-600">Total Price</span>
                    <div className="text-2xl font-bold text-gray-800">₹49,000</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">First Payment (29%)</span>
                      <span className="text-lg font-bold text-teal-600">₹14,210</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Remaining Payment</span>
                      <span className="text-lg font-bold text-gray-700">₹34,790</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-teal-200">
                    <p className="text-xs text-center text-emerald-600 font-medium">
                      Pay ₹14,210 now, rest before delivery
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity and Pre-book Button */}
              <div className="space-y-3">
                <button
                  className={`w-full bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:from-teal-700 hover:via-cyan-700 hover:to-emerald-700 transition-all duration-300 transform flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl shining-button shining-emerald ${
                    isAddingToCart ? 'scale-95 bg-green-600' : 'hover:scale-105'
                  }`}
                  onClick={() => {
                    setIsAddingToCart(true);
                    addToCart(product._id, 1);
                    setTimeout(() => setIsAddingToCart(false), 2000);
                  }}
                >
                  <ShoppingCart className={`w-4 h-4 transition-transform duration-300 ${
                    isAddingToCart ? 'animate-bounce' : ''
                  }`} />
                  <span>{isAddingToCart ? 'Pre-booked!' : 'Pre-book for ₹14,210'}</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  * Pay ₹14,210 now, remaining ₹34,790 before delivery. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
