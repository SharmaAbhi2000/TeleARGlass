import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { User, MapPin, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                case 'razorpay':

                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order)
                    }

                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Title text1={'COMPLETE YOUR'} text2={'ORDER'} />
                    <p className="text-gray-600 mt-2">Review your information and place your order securely</p>
                </div>

                <form onSubmit={onSubmitHandler} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Delivery Information */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Delivery Information Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-teal-100 rounded-lg mr-3">
                                    <MapPin className="w-6 h-6 text-teal-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Delivery Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">First Name *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='firstName' 
                                        value={formData.firstName} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="text" 
                                        placeholder='Enter your first name' 
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='lastName' 
                                        value={formData.lastName} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="text" 
                                        placeholder='Enter your last name' 
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='email' 
                                        value={formData.email} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="email" 
                                        placeholder='Enter your email address' 
                                    />
                                </div>

                                {/* Street Address */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Street Address *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='street' 
                                        value={formData.street} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="text" 
                                        placeholder='Enter your street address' 
                                    />
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">City *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='city' 
                                        value={formData.city} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="text" 
                                        placeholder='Enter your city' 
                                    />
                                </div>

                                {/* State */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    <input 
                                        onChange={onChangeHandler} 
                                        name='state' 
                                        value={formData.state} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="text" 
                                        placeholder='Enter your state' 
                                    />
                                </div>

                                {/* Zipcode */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Zipcode *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='zipcode' 
                                        value={formData.zipcode} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="number" 
                                        placeholder='Enter zipcode' 
                                    />
                                </div>

                                {/* Country */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Country *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='country' 
                                        value={formData.country} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="text" 
                                        placeholder='Enter your country' 
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2 md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                                    <input 
                                        required 
                                        onChange={onChangeHandler} 
                                        name='phone' 
                                        value={formData.phone} 
                                        className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors' 
                                        type="tel" 
                                        placeholder='Enter your phone number' 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                            <div className="flex items-center mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                    <CreditCard className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Stripe Payment */}
                                <div 
                                    onClick={() => setMethod('stripe')} 
                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                        method === 'stripe' 
                                            ? 'border-teal-500 bg-teal-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                        method === 'stripe' 
                                            ? 'border-teal-500 bg-teal-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {method === 'stripe' && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <img className='h-6 mr-4' src={assets.stripe_logo} alt="Stripe" />
                                    <div>
                                        <p className="font-medium text-gray-900">Stripe</p>
                                        <p className="text-sm text-gray-500">Pay with credit/debit card</p>
                                    </div>
                                </div>

                                {/* Razorpay Payment */}
                                <div 
                                    onClick={() => setMethod('razorpay')} 
                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                        method === 'razorpay' 
                                            ? 'border-teal-500 bg-teal-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                        method === 'razorpay' 
                                            ? 'border-teal-500 bg-teal-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {method === 'razorpay' && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <img className='h-6 mr-4' src={assets.razorpay_logo} alt="Razorpay" />
                                    <div>
                                        <p className="font-medium text-gray-900">Razorpay</p>
                                        <p className="text-sm text-gray-500">Secure online payment</p>
                                    </div>
                                </div>

                                {/* Cash on Delivery */}
                                <div 
                                    onClick={() => setMethod('cod')} 
                                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                        method === 'cod' 
                                            ? 'border-teal-500 bg-teal-50' 
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                                        method === 'cod' 
                                            ? 'border-teal-500 bg-teal-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {method === 'cod' && <CheckCircle className="w-3 h-3 text-white" />}
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg mr-4">
                                        <Truck className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Cash on Delivery</p>
                                        <p className="text-sm text-gray-500">Pay when your order arrives</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            {/* Order Summary Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                                <CartTotal />
                            </div>

                            {/* Security Badge */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                                <div className="flex items-center">
                                    <Shield className="w-5 h-5 text-green-600 mr-2" />
                                    <p className="text-sm font-medium text-green-800">Secure Checkout</p>
                                </div>
                                <p className="text-xs text-green-700 mt-1">Your payment information is encrypted and secure</p>
                            </div>

                            {/* Place Order Button */}
                            <button 
                                type='submit' 
                                className='w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 shining-button shining-emerald'
                            >
                                <CheckCircle className="w-6 h-6" />
                                <span>Place Order</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PlaceOrder
