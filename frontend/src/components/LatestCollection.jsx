import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className="py-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <div className="text-center mb-8">
        <Title text1={"Featured "} text2={"TeleProducts"} />
        <p className="w-3/4 m-auto text-sm text-gray-600 mt-3">
          Discover our selection of premium TeleARGlass products, carefully
          curated for quality and performance
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map(
          (item, index) =>
            item.bestseller == false &&item.subscribtion == false   &&(
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                avg_rating={item.avg_rating}
                total_ratings={item.total_ratings}
              />
            )
        )}
      </div>
    </div>
  );
}

export default LatestCollection
