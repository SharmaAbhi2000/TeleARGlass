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
    <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <Link to="/">
        {" "}
        <span className="flex flex-row justify-center items-center space-x-5 ">
          <img src={assets.logo} className="w-36 rounded-lg " alt="" />
          <div className="inline-flex gap-1 items-center">
            <p className="text-xl text-gray-400 font-light">
             <span className="text-gray-800 font-bold">TeleARGlass</span>
            </p>
          </div>
        </span>{" "}
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
         <NavLink to="/" className="flex flex-col items-center gap-1">
           <p>Home</p>
           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
         </NavLink>
        <NavLink
          to="/teleProducts"
          className="flex flex-col items-center gap-1"
        >
          <p>TeleProducts</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/teleServices"
          className="flex flex-col items-center gap-1"
        >
          <p>TeleServices</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/recuriment" className="flex flex-col items-center gap-1">
          <p>TeleRecuriment</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>TeleModify</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer hover:opacity-70 transition-opacity duration-200"
            src={assets.profile_icon}
            alt="User Profile"
          />
          {/* Dropdown Menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-40 py-3 px-4 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-200">
                <p className="cursor-pointer hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black hover:bg-gray-50 px-2 py-1 rounded transition-colors duration-200"
                >
                  My Orders
                </p>
                <hr className="border-gray-200" />
                <p onClick={logout} className="cursor-pointer hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors duration-200">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img 
            src={assets.cart_icon} 
            className={`w-5 min-w-5 transition-all duration-300 ${
              cartAnimation ? 'animate-bounce scale-110' : ''
            }`} 
            alt="" 
          />
          <p className={`absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] transition-all duration-300 ${
            cartAnimation ? 'scale-125 bg-green-600 animate-pulse' : ''
          }`}>
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer border-b"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          
          {/* Navigation Links */}
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-50 transition-colors duration-200"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-50 transition-colors duration-200"
            to="/teleProducts"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-50 transition-colors duration-200"
            to="/teleServices"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border-b hover:bg-gray-50 transition-colors duration-200"
            to="/contact"
          >
            CONTACT
          </NavLink>

          {/* User Menu Items (only show if logged in) */}
          {token && (
            <>
              <div className="border-t border-b my-2"></div>
              <div
                onClick={() => {
                  setVisible(false);
                  navigate("/orders");
                }}
                className="py-3 pl-6 border-b hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                MY ORDERS
              </div>
              <div
                onClick={() => {
                  setVisible(false);
                  logout();
                }}
                className="py-3 pl-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-red-600"
              >
                LOGOUT
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar
