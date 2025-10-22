import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
console.log(products);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='min-h-screen bg-gray-50 pt-14'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        
        {/* Header Section */}
        <div className='mb-6'>
          <div className='inline-flex gap-2 items-center mb-2'>
            <p className='text-3xl sm:text-4xl text-gray-400 font-light'>
              YOUR <span className='text-gray-800 font-bold'>TeleCART</span>
            </p>
          </div>
          <p className='text-gray-600 text-sm'>Review your items and proceed to checkout</p>
        </div>

        {/* Cart Items Section */}
        <div className='bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300'>
          {cartData.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 text-5xl mb-3'>🛒</div>
              <h3 className='text-lg font-semibold text-gray-800 mb-1'>Your cart is empty</h3>
              <p className='text-gray-600 text-sm'>Add some items to get started</p>
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} className={`p-4 hover:bg-gray-50 transition-all duration-200 ${index !== cartData.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                    
                    {/* Product Image */}
                    <div className='flex-shrink-0'>
                      <img 
                        className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105' 
                        src={productData.image[0]} 
                        alt={productData.name} 
                      />
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <h3 className='text-base font-semibold text-gray-900 mb-1 hover:text-gray-700 transition-colors duration-200'>{productData.name}</h3>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
                        <span className='text-lg font-bold text-gray-900 hover:text-teal-600 transition-colors duration-200'>{currency}{productData.price}</span>
                        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border shadow-sm hover:shadow-md hover:bg-gray-200 transition-all duration-200'>
                          Size: {item.size}
                        </span>
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className='flex items-center gap-3'>
                      {/* Quantity Selector */}
                      <div className='flex items-center border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200'>
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
                          className='px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 hover:scale-110'
                        >
                          −
                        </button>
                        <input 
                          onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                          className='w-12 text-center border-0 focus:ring-0 focus:outline-none font-medium text-sm' 
                          type="number" 
                          min={1} 
                          defaultValue={item.quantity} 
                        />
                        <button 
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className='px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 hover:scale-110'
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className='p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-110'
                        title="Remove item"
                      >
                        <img className='w-4 h-4' src={assets.bin_icon} alt="Remove" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Cart Summary Section */}
        {cartData.length > 0 && (
          <div className='mt-6 flex flex-col lg:flex-row gap-6'>
            {/* Cart Totals */}
            <div className='lg:flex-1'>
              <CartTotal />
            </div>
            
            {/* Checkout Button */}
            <div className='lg:w-80'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
                <button 
                  onClick={() => navigate('/place-order')} 
                  className='w-full bg-gradient-to-r from-gray-900 to-black text-white font-semibold py-3 px-6 rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                >
                  PROCEED TO CHECKOUT
                </button>
                <p className='text-xs text-gray-500 text-center mt-2'>
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
