import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { Check, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"

const reviews = [
  {
    name: "John Doe",
    review: "Great product! Works better than expected.",
    stars: 5,
  },
  {
    name: "Jane Smith",
    review: "Solid build and premium feel. Recommended!",
    stars: 4,
  },
  {
    name: "Alex Johnson",
    review: "Value for money. Battery lasts long.",
    stars: 5,
  },
  {
    name: "Emily Davis",
    review: "Looks great and performs well.",
    stars: 4,
  },
  {
    name: "Chris Lee",
    review: "Customer service was helpful.",
    stars: 3,
  },
  {
    name: "Sara Wilson",
    review: "Fast delivery and excellent packaging.",
    stars: 5,
  },
  {
    name: "Daniel Kim",
    review: "A bit overpriced but still good.",
    stars: 3,
  },
  {
    name: "Olivia Brown",
    review: "Perfect for daily use. Highly recommended!",
    stars: 5,
  },
  {
    name: "Ethan White",
    review: "Decent product. Can improve build quality.",
    stars: 3,
  },
  {
    name: "Mia Thomas",
    review: "I loved it! Will buy again.",
    stars: 5,
  },
];
const Product = () => {

  const { productId } = useParams();
  const[id,setId]=useState(1);
  const { products, currency ,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size,setSize] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(() => {
    fetchProductData();
  }, [productId,products])

  return productData ? (
    <div className="min-h-screen bg-gray-50">
      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Details Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
            
            {/* Product Images Gallery */}
            <div className="space-y-4">
              {/* Main Product Image */}
              <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden group">
                <img 
                  src={image} 
                  alt={productData.name}
                  className="w-full h-96 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productData.image.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setImage(item)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      image === item 
                        ? 'border-teal-500 ring-2 ring-teal-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={item} 
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Product Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {productData.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mt-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (productData.avg_rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {productData.avg_rating ? `${productData.avg_rating}/5` : 'No ratings yet'} 
                    ({productData.total_ratings || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">
                  {currency}{productData.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {currency}{(productData.price * 1.2).toFixed(0)}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  Save 20%
                </span>
              </div>

              {/* Description */}
              <div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {productData.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {JSON.parse(productData.features).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setIsAddingToCart(true);
                    addToCart(productData._id, 1);
                    setTimeout(() => setIsAddingToCart(false), 2000);
                  }}
                  className={`w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 shining-button shining-emerald ${
                    isAddingToCart ? 'scale-95 bg-green-600' : 'hover:scale-105'
                  }`}
                >
                  <ShoppingCart className={`w-6 h-6 transition-transform duration-300 ${
                    isAddingToCart ? 'animate-bounce' : ''
                  }`} />
                  <span>{isAddingToCart ? 'Added!' : 'Add to Cart'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 lg:px-8">
              <button
                onClick={() => setId(1)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  id === 1
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setId(3)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  id === 3
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            {id === 1 ? (
              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h3>
                <div className="text-gray-700 leading-relaxed space-y-6">
                  <p className="text-lg">{productData.description}</p>
                  
                  {/* Why Choose This Product Section */}
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-teal-100 rounded-lg mr-3">
                        <Check className="w-6 h-6 text-teal-600" />
                      </div>
                      <h4 className="text-xl font-bold text-teal-900">Why Choose This Product?</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-teal-100 rounded-full mt-1">
                          <Check className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 mb-1">Premium Quality</h5>
                          <p className="text-teal-800 text-sm">High-grade materials and superior construction for lasting durability</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-teal-100 rounded-full mt-1">
                          <Check className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 mb-1">Easy to Use</h5>
                          <p className="text-teal-800 text-sm">User-friendly interface with simple setup and intuitive controls</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-teal-100 rounded-full mt-1">
                          <Check className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 mb-1">Reliable Performance</h5>
                          <p className="text-teal-800 text-sm">Consistent and dependable operation for all your needs</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="p-1 bg-teal-100 rounded-full mt-1">
                          <Check className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-teal-900 mb-1">Full Support</h5>
                          <p className="text-teal-800 text-sm">Comprehensive warranty and dedicated customer service</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : id === 3 ? (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Product Specifications</h3>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Feature
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {JSON.parse(productData.features).map((item, index) => {
                        const [key, value] = item.split(":").map((str) => str.trim());
                        return (
                          <tr
                            key={index}
                            className={`hover:bg-gray-50 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                            }`}
                          >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {key}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 flex items-center">
                              <Check className="w-4 h-4 text-teal-500 mr-2 flex-shrink-0" />
                              {value}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    </div>
  );
}

export default Product
