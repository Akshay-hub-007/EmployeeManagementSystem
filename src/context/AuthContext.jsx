import axios from 'axios';
import BACKEND_URL from "../config/backend";

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

const logout = async () => {
  try {
    // Step 1: Checkout attendance (if required before logout)

    await axios.put(
      `${BACKEND_URL}/attendance/${user?.id}/checkout`,
      {},
      { withCredentials: true }
    );

    // Step 2: Call logout to clear JWT cookie
  const res = await axios.post(`${BACKEND_URL}/api/logout`, {}, { withCredentials: true });

    // Step 3: Clear local state
    setUser(null);
    localStorage.removeItem('user');
    window.location.reload()
    console.log('Logout successful:', res.data);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};



  // API call to update user profile
  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put(
          `${BACKEND_URL}/updateDetails/${user?.id}`,
          updatedData,
          { withCredentials: true }
        );
      console.log(res.data)

      setUser(res.data)
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return { success: true, data: res.data };
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error };
    }
  };

  const value = {
    user,
    login,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};