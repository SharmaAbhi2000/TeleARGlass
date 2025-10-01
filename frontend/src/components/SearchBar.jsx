import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location])
    
  return showSearch && visible ? (
    <div className='bg-white border-b border-gray-200 shadow-sm'>
      <div className='max-w-4xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-center gap-3'>
          <div className='flex-1 max-w-md relative'>
            <div className='flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent transition-all duration-200'>
              <input 
                value={search} 
                onChange={(e)=>setSearch(e.target.value)} 
                className='flex-1 outline-none bg-transparent text-sm placeholder-gray-500' 
                type="text" 
                placeholder='Search TeleProducts...'
              />
              <img className='w-4 h-4 text-gray-400' src={assets.search_icon} alt="" />
            </div>
          </div>
          <button 
            onClick={()=>setShowSearch(false)} 
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
          >
            <img className='w-4 h-4' src={assets.cross_icon} alt="Close search" />
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default SearchBar
