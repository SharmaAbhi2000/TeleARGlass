import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,getCartAmount} = useContext(ShopContext);

  return (
    <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300'>
      <div className='mb-4'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='space-y-3'>
        <div className='flex justify-between items-center py-1 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-all duration-200'>
          <span className='text-gray-600 font-medium text-sm hover:text-gray-800 transition-colors duration-200'>Subtotal</span>
          <span className='text-gray-900 font-semibold hover:text-teal-600 transition-colors duration-200'>{currency} {getCartAmount()}.00</span>
        </div>
        
        <div className='border-t border-gray-200'></div>
        
        <div className='flex justify-between items-center py-2 bg-gray-50 -mx-4 px-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200'>
          <span className='text-base font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200'>Total</span>
          <span className='text-lg font-bold text-gray-900 hover:text-teal-600 transition-colors duration-200'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount()}.00</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
