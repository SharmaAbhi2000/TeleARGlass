import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency, getCartAmount, cartItems, products} = useContext(ShopContext);

    // Calculate detailed breakdown using same logic as context
    const getCartBreakdown = () => {
        let itemBreakdown = [];
        let totalAmount = 0;
        
        for (const items in cartItems) {
            const itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                const quantity = Number(cartItems[items][item]) || 0;
                if (quantity > 0 && itemInfo) {
                    // Use same price logic as getCartAmount in context
                    const priceCandidate = itemInfo.is_prebooking 
                        ? itemInfo.pre_book_price 
                        : (itemInfo.actual_price ?? itemInfo.price ?? itemInfo.discountPrice);
                    const unitPrice = Number(priceCandidate) || 0;
                    const itemTotal = unitPrice * quantity;
                    totalAmount += itemTotal;
                    
                    itemBreakdown.push({
                        name: itemInfo.name,
                        size: item,
                        quantity: quantity,
                        unitPrice: unitPrice,
                        total: itemTotal
                    });
                }
            }
        }
        
        return { itemBreakdown, totalAmount };
    };

    const { itemBreakdown, totalAmount } = getCartBreakdown();
    // Use getCartAmount as fallback to ensure consistency
    const contextTotal = getCartAmount();
    const hasMultipleItems = itemBreakdown.length > 1;

  return (
    <div className='bg-white rounded-lg shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300'>
      <div className='mb-4'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='space-y-3'>
        {/* Item Breakdown - Show when multiple items */}
        {hasMultipleItems && (
          <div className='space-y-2 mb-4'>
            <h4 className='text-sm font-semibold text-gray-700 border-b border-gray-200 pb-1'>Item Breakdown:</h4>
            {itemBreakdown.map((item, index) => (
              <div key={index} className='flex justify-between items-center py-1 px-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-all duration-200'>
                <div className='flex-1 min-w-0'>
                  <p className='text-xs font-medium text-gray-800 truncate'>{item.name}</p>
                  <p className='text-xs text-gray-500'>Size: {item.size} × {item.quantity}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-semibold text-gray-900'>{currency}{item.total.toFixed(2)}</p>
                  <p className='text-xs text-gray-500'>{currency}{item.unitPrice} each</p>
                </div>
              </div>
            ))}
            <div className='border-t border-gray-300 pt-2'></div>
          </div>
        )}

        <div className='flex justify-between items-center py-1 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-all duration-200'>
          <span className='text-gray-600 font-medium text-sm hover:text-gray-800 transition-colors duration-200'>Subtotal</span>
          <span className='text-gray-900 font-semibold hover:text-teal-600 transition-colors duration-200'>{currency} {contextTotal.toFixed(2)}</span>
        </div>
        
        <div className='border-t border-gray-200'></div>
        
        <div className='flex justify-between items-center py-2 bg-gray-50 -mx-4 px-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200'>
          <span className='text-base font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200'>Total</span>
          <span className='text-lg font-bold text-gray-900 hover:text-teal-600 transition-colors duration-200'>{currency} {contextTotal.toFixed(2)}</span>
        </div>
        
        {/* Summary for multiple items */}
        {hasMultipleItems && (
          <div className='text-xs text-gray-500 text-center pt-2 border-t border-gray-100'>
            {itemBreakdown.length} items • {itemBreakdown.reduce((sum, item) => sum + item.quantity, 0)} total quantity
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTotal
