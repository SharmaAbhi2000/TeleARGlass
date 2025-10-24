import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent')
const productSell=products.filter((e)=>e.subscribtion==false && e.bestseller==false);
  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {

    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = productSell.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {
    let fpCopy = [...filterProducts]; // Create a proper copy

    switch (sortType) {
      case 'low-high':
        fpCopy.sort((a, b) => a.price - b.price);
        break;

      case 'high-low':
        fpCopy.sort((a, b) => b.price - a.price);
        break;

      case 'name-asc':
        fpCopy.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'name-desc':
        fpCopy.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case 'rating':
        fpCopy.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
        break;

      case 'relevant':
      default:
        // For relevant, we'll keep the original order from applyFilter
        return; // Don't modify the array
    }

    setFilterProducts(fpCopy);
  }

  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    // Only sort if we have products and it's not the default relevant sort
    if (filterProducts.length > 0 && sortType !== 'relevant') {
      sortProduct();
    }
  },[sortType, filterProducts.length])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:min-w-64">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center justify-between cursor-pointer mb-4 lg:mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <img
                className={`h-4 w-4 transition-transform duration-200 lg:hidden ${
                  showFilter ? "rotate-90" : ""
                }`}
                src={assets.dropdown_icon}
                alt=""
              />
            </div>
            
            {/* Category Filter */}
            <div
              className={`${
                showFilter ? "" : "hidden"
              } lg:block`}
            >
              <h4 className="text-sm font-medium text-gray-700 mb-4">Categories</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    type="checkbox"
                    value={"Home Automation"}
                    onChange={toggleCategory}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    Home Automation
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    type="checkbox"
                    value={"Gaming"}
                    onChange={toggleCategory}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    Gaming
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    type="checkbox"
                    value={"Legacy"}
                    onChange={toggleCategory}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    Legacy
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Title text1={"ALL"} text2={"PRODUCTS"} />
              
              {/* Product Sort */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200 min-w-[180px]"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all duration-200 inline-block">
                <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  Showing <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">{filterProducts.length}</span> product{filterProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              {/* Current Sort Indicator */}
              {sortType !== 'relevant' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 inline-block">
                  <p className="text-sm text-blue-700">
                    Sorted by: <span className="font-medium">
                      {sortType === 'low-high' && 'Price: Low to High'}
                      {sortType === 'high-low' && 'Price: High to Low'}
                      {sortType === 'name-asc' && 'Name: A to Z'}
                      {sortType === 'name-desc' && 'Name: Z to A'}
                      {sortType === 'rating' && 'Highest Rated'}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
                avg_rating={item.avg_rating}
                total_ratings={item.total_ratings}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filterProducts.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms to find what you're looking for.</p>
              <button 
                onClick={() => {
                  setCategory([]);
                  setSubCategory([]);
                  setSortType('relevant');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Collection
