import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Orders = () => {

  const { backendUrl, token , currency, navigate} = useContext(ShopContext);

  const [orderData, setorderData] = useState([])
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestForm, setRequestForm] = useState({ orderId: '', itemIndex: -1, type: 'repair', description: '' })
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [ratingForm, setRatingForm] = useState({ orderId: '', rating: 0, review: '' })

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        // Store full orders instead of flattened items
        setorderData(response.data.orders.reverse())
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  // Open modal for item-level request
  const openItemRequestModal = (orderId, itemIndex, type) => {
    setRequestForm({ orderId, itemIndex, type, description: '' })
    setShowRequestModal(true)
  }

  const submitItemRequest = async () => {
    try {
      const payload = { ...requestForm }
      const { data } = await axios.post(backendUrl + '/api/order/item-request', payload, { headers: { token } })
      if (data.success) {
        toast.success('Request submitted')
        setShowRequestModal(false)
        setRequestForm({ orderId: '', itemIndex: -1, type: 'repair', description: '' })
        await loadOrderData()
      } else {
        toast.error(data.message || 'Failed to submit request')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to submit request')
    }
  }

  // Helper function to check if order is within 9 months for Tele Modify
  const isWithinTimeLimit = (order) => {
    const orderDate = order.date; // Use order date instead of delivery date
    const currentTime = Date.now();
    const nineMonthsInMs = 9 * 30 * 24 * 60 * 60 * 1000; // Approximate 9 months
    return currentTime - orderDate <= nineMonthsInMs;
  };


  // Function to open rating modal
  const openRatingModal = (orderId) => {
    setRatingForm({ orderId, rating: 0, review: '' })
    setShowRatingModal(true)
  }

  // Function to submit rating
  const submitRating = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/order/rating', ratingForm, { headers: { token } })
      if (data.success) {
        toast.success('Rating submitted successfully!')
        setShowRatingModal(false)
        setRatingForm({ orderId: '', rating: 0, review: '' })
        await loadOrderData()
      } else {
        toast.error(data.message || 'Failed to submit rating')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to submit rating')
    }
  }

  // Function to request Tele Modify
  const requestRepair = async (orderId) => {
    const issue = prompt('Please describe the modification you need:');
    if (!issue) return;

    try {
      const response = await axios.post(backendUrl + '/api/order/repair-request', {
        orderId,
        issue
      }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        loadOrderData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to request Tele Modify');
    }
  };

  // Function to pay remaining amount for pre-booking
  const payRemainingAmount = async (orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/pay-remaining', {
        orderId
      }, { headers: { token } });

      if (response.data.success) {
        const { order } = response.data;
        
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Remaining Payment - TeleARGlass',
          description: 'Complete your pre-booking payment',
          order_id: order.id,
          receipt: order.receipt,
          handler: async (response) => {
            try {
              const { data } = await axios.post(backendUrl + '/api/order/verify-remaining', {
                razorpay_order_id: response.razorpay_order_id
              }, { headers: { token } });

              if (data.success) {
                toast.success('Remaining payment completed!');
                loadOrderData(); // Refresh orders
              } else {
                toast.error(data.message || 'Payment verification failed');
              }
            } catch (error) {
              console.log(error);
              toast.error('Payment verification failed');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(response.data.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to process payment');
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="min-h-screen bg-gray-50 pt-14">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        {/* Header Section */}
        <div className='mb-6'>
          <div className='inline-flex gap-2 items-center mb-2'>
            <p className='text-3xl sm:text-4xl text-gray-400 font-light'>
              MY <span className='text-gray-800 font-bold'>ORDERS</span>
            </p>
          </div>
          <p className='text-gray-600 text-sm'>View and manage your order history</p>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          {orderData.length === 0 ? (
            <div className='bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300'>
              <div className='text-center py-12'>
                <div className='text-gray-400 text-5xl mb-3'>📦</div>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>No orders yet</h3>
                <p className='text-gray-600 text-sm'>You haven't placed any orders. Start shopping to see your order history here.</p>
                <button 
                  onClick={() => navigate('/teleProducts')}
                  className='mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md'
                >
                  Browse Products
                </button>
              </div>
            </div>
          ) : (
            orderData.map((order, orderIndex) => (
          <div
            key={orderIndex}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
          >
            {/* Order Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Order #{order._id.slice(-8)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.date).toDateString()} at {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-500' : 
                    order.status === 'Shipped' ? 'bg-blue-500' : 
                    order.status === 'Cancelled' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">{order.status}</span>
                </div>
              </div>
            </div>

            {/* Pre-booking Info */}
            {order.prebooking && order.prebooking.isPrebooking && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-blue-800">Pre-booking Order</p>
                    <div className="flex gap-4 text-xs text-blue-600 mt-1">
                      <span>First Payment: ₹{order.prebooking.firstPaymentAmount || 0}</span>
                      <span>Remaining: ₹{order.prebooking.remainingAmount || 0}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    <div className={`px-2 py-1 rounded-full ${
                      order.prebooking.firstPaymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      First: {order.prebooking.firstPaymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="p-4 space-y-4">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-4 text-sm">
                  <Link 
                    to={`/product/${item._id}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
                  >
                    <img 
                      className="w-16 sm:w-20 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" 
                      src={item.image && item.image[0] ? item.image[0] : '/placeholder-image.png'} 
                      alt={item.name} 
                    />
                  </Link>
                  <div className="flex-1">
                    <Link 
                      to={`/product/${item._id}`}
                      className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-gray-700">
                      <p className="text-gray-600">
                        {currency}{item.priceNow > 0 ? item.priceNow : (item.price || 0)}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      {item.size && <p>Size: {item.size}</p>}
                    </div>
                    {item.is_prebooking && (
                      <p className="text-xs text-blue-600 mt-1">Pre-booking item</p>
                    )}

                    {/* Item-level actions - Tele Modify only for orders within 9 months */}
                    {!order.repairRequest?.isRequested && 
                     isWithinTimeLimit(order) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <button
                          onClick={() => openItemRequestModal(order._id, itemIndex, 'repair')}
                          className="bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-purple-100"
                        >
                          TeleModify
                        </button>
                      </div>
                    )}

                    {/* Show View Product button even when Tele Modify is not available */}
                    {(!isWithinTimeLimit(order) || order.repairRequest?.isRequested) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Link
                          to={`/product/${item._id}`}
                          className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 text-xs font-medium rounded-md hover:bg-blue-100 transition-colors duration-200"
                        >
                          View Product
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Request Status */}
            {(order.cancelRequest?.isRequested || order.replaceRequest?.isRequested || order.repairRequest?.isRequested) && (
              <div className="bg-blue-50 px-4 py-3 border-t border-gray-200">
                <div className="text-sm">
                  {order.cancelRequest?.isRequested && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-700 font-medium">Cancel Request:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        order.cancelRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                        order.cancelRequest.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'Cancelled' ? 'Cancelled' : order.cancelRequest.status}
                      </span>
                    </div>
                  )}
                  {order.replaceRequest?.isRequested && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-700 font-medium">Replace Request:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.replaceRequest.status === 'approved' || order.replaceRequest.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.replaceRequest.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.replaceRequest.status}
                      </span>
                    </div>
                  )}
                  {order.repairRequest?.isRequested && (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-700 font-medium">Repair Request:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.repairRequest.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.repairRequest.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        order.repairRequest.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.repairRequest.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Order Footer */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm text-gray-600">
                    Total Amount: <span className="font-medium">{currency}{order.amount || 0}</span>
                  </p>
                  <p className="text-xs text-gray-500">Payment: {order.paymentMethod}</p>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  {/* Show Pay Remaining button for pre-booking orders */}
                  {order.prebooking && 
                   order.prebooking.isPrebooking && 
                   order.prebooking.firstPaymentStatus === 'paid' && 
                   order.prebooking.remainingPaymentStatus !== 'paid' && 
                   order.prebooking.remainingAmount > 0 && (
                    <button
                      onClick={() => payRemainingAmount(order._id)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Pay Remaining (₹{order.prebooking.remainingAmount})
                    </button>
                  )}

                  {/* Rating Button */}
                  {!order.rating?.isRated && (
                    <button
                      onClick={() => openRatingModal(order._id)}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-medium rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Rate Order
                    </button>
                  )}

                  {/* Show rating if already rated */}
                  {order.rating?.isRated && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-lg ${
                              star <= order.rating.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {order.rating.rating}/5
                      </span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
            ))
          )}
        </div>
      </div>

    {/* Item Request Modal */}
    {showRequestModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" onClick={() => setShowRequestModal(false)}></div>
        <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Tele Modify Request</h3>
          <p className="text-xs text-gray-500 mb-4">Tell us about the modification you need for this item.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe the modification needed</label>
              <textarea
                rows={4}
                value={requestForm.description}
                onChange={(e) => setRequestForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Please describe the modification you need"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowRequestModal(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={submitItemRequest}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Rating Modal */}
    {showRatingModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" onClick={() => setShowRatingModal(false)}></div>
        <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Rate Your Order</h3>
          <p className="text-xs text-gray-500 mb-4">How was your experience with this order?</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingForm(prev => ({ ...prev, rating: star }))}
                    className={`text-2xl transition-colors ${
                      star <= ratingForm.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {ratingForm.rating === 0 ? 'Select a rating' : 
                 ratingForm.rating === 1 ? 'Poor' :
                 ratingForm.rating === 2 ? 'Fair' :
                 ratingForm.rating === 3 ? 'Good' :
                 ratingForm.rating === 4 ? 'Very Good' : 'Excellent'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review (Optional)</label>
              <textarea
                rows={3}
                value={ratingForm.review}
                onChange={(e) => setRatingForm(prev => ({ ...prev, review: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Share your experience..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowRatingModal(false)}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={submitRating}
              disabled={ratingForm.rating === 0}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default Orders
