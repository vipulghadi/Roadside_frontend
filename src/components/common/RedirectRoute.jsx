/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/RedirectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthProvider";

const RedirectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  alert(isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectedRoute;
