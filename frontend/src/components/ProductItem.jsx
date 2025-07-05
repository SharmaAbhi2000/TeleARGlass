import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from "react-router-dom";

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);
    const navigate = useNavigate();
    return (
 
      <div className="group cursor-pointer bg-gray-100 border-2 border-gray-900/20 rounded-lg p-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" onClick={()=>navigate(`/product/${id}`)} >
        {/* Image Container with consistent sizing */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-50/60 relative">
          <img
            className="w-full h-full border-2 border-gray-900/10 object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            src={image[0]}
            alt={name}
            loading="lazy"
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>

        {/* Product Info */}
        <div className="pt-4 space-y-2">
          <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {name}
          </p>
          <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {currency}
            {price}
          </p>
        </div>
      </div>
  );
}

export default ProductItem
