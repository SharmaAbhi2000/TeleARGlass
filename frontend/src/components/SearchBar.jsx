import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        // Show search bar when showSearch is true OR when on collection page
        if (showSearch || location.pathname.includes('collection') || location.pathname.includes('teleProducts')) {
            setVisible(true);
        }
        else {
            setVisible(false)
        }
    },[location, showSearch])

    // Auto-focus search input when search bar becomes visible
    useEffect(() => {
        if (showSearch) {
            const searchInput = document.querySelector('input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }, [showSearch]);

    // Keyboard shortcut support (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setShowSearch(true);
            }
            if (e.key === 'Escape' && showSearch) {
                setShowSearch(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [showSearch, setShowSearch]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            // Navigate to collection page if not already there
            if (!location.pathname.includes('collection') && !location.pathname.includes('teleProducts')) {
                navigate('/teleProducts');
            }
        }
    }
    
  return showSearch ? (
    <div className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40'>
      <div className='max-w-6xl mx-auto px-4 py-4'>
        <form onSubmit={handleSearchSubmit} className='flex items-center justify-center gap-3'>
          <div className='flex-1 max-w-md relative'>
            <div className='flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200'>
              <input 
                value={search} 
                onChange={(e)=>setSearch(e.target.value)} 
                className='flex-1 outline-none bg-transparent text-sm placeholder-gray-500' 
                type="text" 
                placeholder='Search TeleProducts...'
                autoComplete="off"
                autoFocus
              />
              <img className='w-4 h-4 text-gray-400' src={assets.search_icon} alt="" />
            </div>
          </div>
          <button 
            type="button"
            onClick={()=>setShowSearch(false)} 
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
            aria-label="Close search"
          >
            <img className='w-4 h-4' src={assets.cross_icon} alt="Close search" />
          </button>
        </form>
        
        {/* Search suggestions or quick actions */}
        {search && (
          <div className='mt-3 text-center'>
            <p className='text-xs text-gray-500'>
              Press Enter to search or click to go to products
            </p>
          </div>
        )}
      </div>
    </div>
  ) : null
}

export default SearchBar
