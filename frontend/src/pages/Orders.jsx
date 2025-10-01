import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token , currency} = useContext(ShopContext);

  const [orderData,setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="border-t pt-16 px-2">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md rounded-lg p-4 -mx-2"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium hover:text-gray-900 transition-colors duration-200">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p className="hover:text-teal-600 transition-colors duration-200">
                    {currency}
                    {item.price}
                  </p>
                  <p className="hover:text-gray-900 transition-colors duration-200">Quantity: {item.quantity}</p>
                  <p className="hover:text-gray-900 transition-colors duration-200">Size: {item.size}</p>
                </div>
                <p className="mt-1 hover:text-gray-900 transition-colors duration-200">
                  Date:{" "}
                  <span className=" text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1 hover:text-gray-900 transition-colors duration-200">
                  Payment:{" "}
                  <span className=" text-gray-400 hover:text-gray-600 transition-colors duration-200">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500 shadow-sm hover:shadow-md transition-all duration-200"></p>
                <p className="text-sm md:text-base hover:text-gray-900 transition-colors duration-200">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 hover:scale-105 shining-button shining-gray"
              >
                {item.status=="Delivered"?"Return":"Track Order"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders
