import React, { useContext, useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible] = useState(false);
    const [cartAnimation, setCartAnimation] = useState(false);

    const {setShowSearch , getCartCount , navigate, token, setToken, setCartItems, cartItems} = useContext(ShopContext);

    // Trigger cart animation when cart items change
    useEffect(() => {
        if (getCartCount() > 0) {
            setCartAnimation(true);
            setTimeout(() => setCartAnimation(false), 1000);
        }
    }, [cartItems]);

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between py-4 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Link to="/" className="flex items-center space-x-4 group">
          <img 
            src={assets.logo} 
            className="h-16 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300" 
            alt="TeleARGlass Logo" 
          />
          <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            TeleARGlass
          </span>
        </Link>

        <ul className="hidden lg:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/teleProducts" 
            className={({ isActive }) => 
              `relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            TeleProducts
          </NavLink>
          <NavLink 
            to="/teleServices" 
            className={({ isActive }) => 
              `relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            TeleServices
          </NavLink>
          <NavLink 
            to="/recuriment" 
            className={({ isActive }) => 
              `relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            TeleRecruitment
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            TeleFeedback
          </NavLink>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setShowSearch(true);
              navigate("/teleProducts");
            }}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            aria-label="Search"
          >
            <img src={assets.search_icon} className="w-5 h-5" alt="Search" />
          </button>

          <div className="relative group">
            <button
              onClick={() => (token ? null : navigate("/login"))}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              aria-label="User Profile"
            >
              <img src={assets.profile_icon} className="w-5 h-5" alt="User Profile" />
            </button>
            
            {token && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <button 
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    My Orders
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button 
                    onClick={logout} 
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link 
            to="/cart" 
            className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            aria-label="Shopping Cart"
          >
            <img 
              src={assets.cart_icon} 
              className={`w-5 h-5 transition-all duration-300 ${
                cartAnimation ? 'animate-bounce scale-110' : ''
              }`} 
              alt="Shopping Cart" 
            />
            <span className={`absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center transition-all duration-300 ${
              cartAnimation ? 'scale-125 bg-green-600 animate-pulse' : ''
            }`}>
              {getCartCount()}
            </span>
          </Link>

          <button
            onClick={() => setVisible(true)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 lg:hidden"
            aria-label="Menu"
          >
            <img src={assets.menu_icon} className="w-5 h-5" alt="Menu" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setVisible(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img src={assets.logo} className="w-10 h-10 rounded-lg" alt="Logo" />
              <span className="text-xl font-bold text-gray-900">TeleARGlass</span>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <img src={assets.dropdown_icon} className="w-5 h-5 rotate-180" alt="Close" />
            </button>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <nav className="space-y-2">
              <NavLink
                onClick={() => setVisible(false)}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                to="/"
              >
                <span className="font-medium">Home</span>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                to="/teleProducts"
              >
                <span className="font-medium">TeleProducts</span>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                to="/teleServices"
              >
                <span className="font-medium">TeleServices</span>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                to="/recuriment"
              >
                <span className="font-medium">Recruitment</span>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                to="/contact"
              >
                <span className="font-medium">Contact</span>
              </NavLink>
            </nav>

            {/* User Menu Items */}
            {token && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      setVisible(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="font-medium">My Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setVisible(false);
                      navigate("/orders");
                    }}
                    className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span className="font-medium">My Orders</span>
                  </button>
                  <button
                    onClick={() => {
                      setVisible(false);
                      logout();
                    }}
                    className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
