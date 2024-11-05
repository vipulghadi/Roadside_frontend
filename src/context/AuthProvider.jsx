/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  saveAccessToken,
  getAccessToken,
  saveUserInfo,
  getUserInfo,
  clearStorage
} from "../utils/localStorageData.jsx";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); 
  const [currentUser, setCurrentUser] = useState(getUserInfo()); 
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAccessToken());

  // Function to handle user login
  const login = (userData, token) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    saveAccessToken(token);
    saveUserInfo(userData);
  };


  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    clearStorage();
  };

  // On component mount, check if a user is already authenticated based on local storage
  useEffect(() => {
    const token = getAccessToken();
    const user = getUserInfo();
    
    if (token && user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    } else {
      logout();
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
