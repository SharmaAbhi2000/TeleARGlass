import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import {Check} from "lucide-react"

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
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-gradient-to-b from-teal-50 via-cyan-50 to-violet-50">
      {/*----------- Product Data-------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*---------- Product Images------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto rounded-md " src={image} alt="" />
          </div>
        </div>

        {/* -------- Product Info ---------- */}
        <div className="flex-1 text-black">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className=" flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-black md:w-4/5">
            {productData.description}
          </p>
          <div className="mb-6">
            <h3 className="font-semibold text-teal-500 mb-2">Key Features:</h3>
            <ul className="space-y-1">
              {JSON.parse(productData.features).map((item, index) => (
                <li key={index} className="flex items-start text-black">
                  <Check size={16} className="text-teal-500 mr-2 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => addToCart(productData._id, 1)}
            className="bg-blue-400 rounded text-black px-8 py-3 text-sm active:bg-gray-200"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-400 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ---------- Description & Review Section ------------- */}
      <div className="mt-20">
        <div className="flex cursor-pointer text-black gap-x-2">
          <b className="border-b px-5 py-3 text-sm" onClick={() => setId(1)}>
            Description
          </b>
          {/* <p className="border-b px-5 py-3 text-sm" onClick={() => setId(2)}>
            Reviews (122)
          </p> */}
          <p className="border-b  px-5 py-3 text-sm" onClick={() => setId(3)}>
            Features
          </p>
        </div>
        <div className="flex flex-col gap-4  px-6 py-6 text-sm text-black">
          {id == 1 ? (
            <p>{productData.description}</p>
          ) : id == 3 ? (
            <table className="min-w-full  rounded-md overflow-hidden mt-4">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 text-black text-sm font-semibold">
                    Feature
                  </th>
                  <th className="px-4 py-2 text-black text-sm font-semibold">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(productData.features).map((item, index) => {
                  const [key, value] = item.split(":").map((str) => str.trim());
                  return (
                    <tr
                      key={index}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-teal-50`}
                    >
                      <td className="px-4 py-2 text-sm text-gray-700 font-medium">
                        {key}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-800 flex items-center">
                        <Check size={16} className="text-teal-500 mr-2" />
                        {value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {/* {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-teal-500 text-black flex items-center justify-center font-bold mr-3">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {review.name}
                      </p>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.stars
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.review}
                  </p>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </div>

      {/* --------- display related products ---------- */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className=" opacity-0 bg-gradient-to-br from-teal-600 via-blue-700 to-emerald-600"></div>
  );
}

export default Product
