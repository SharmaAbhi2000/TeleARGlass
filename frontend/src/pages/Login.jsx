import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex gap-2 items-center mb-2">
            <p className="text-3xl sm:text-4xl text-gray-400 font-light">
              {currentState === 'Login' ? 'WELCOME' : 'CREATE'} <span className="text-gray-800 font-bold">{currentState === 'Login' ? 'BACK' : 'ACCOUNT'}</span>
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            {currentState === 'Login' 
              ? 'Sign in to your account to continue' 
              : 'Join us and start your journey'
            }
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            {/* Name Field (only for Sign Up) */}
            {currentState === 'Sign Up' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPasword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password (only for Login) */}
            {currentState === 'Login' && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 shining-button shining-emerald"
            >
              {currentState === 'Login' ? (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>

            {/* Toggle between Login and Sign Up */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {currentState === 'Login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                  className="ml-2 text-teal-600 hover:text-teal-500 font-medium"
                >
                  {currentState === 'Login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
