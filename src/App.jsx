/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import AppRoutes from "./Routes"; 

function App() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <AuthProvider>
          <AppRoutes /> 
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
