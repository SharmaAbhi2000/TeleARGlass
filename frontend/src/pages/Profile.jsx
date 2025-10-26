import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { User, Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(ShopContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });

  // Fetch user profile data
  const fetchUserProfile = async () => {
    if (!token) return;
    
    try {
      const response = await axios.post(backendUrl + '/api/user/profile', {}, {
        headers: { token }
      });
      
      if (response.data.success) {
        setProfileData({
          name: response.data.user.name,
          email: response.data.user.email
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch profile data');
    }
  };


  // Fetch profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, [token]);

  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex gap-2 items-center mb-2">
            <p className="text-3xl sm:text-4xl text-gray-400 font-light">
              MY <span className="text-gray-800 font-bold">PROFILE</span>
            </p>
          </div>
          <p className="text-gray-600 text-sm">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profileData.name}</span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{profileData.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;