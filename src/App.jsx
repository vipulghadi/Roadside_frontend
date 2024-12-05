/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import AppRoutes from "./routes";
import NavbarClient from "./components/common/NavbarClient";

function App() {
  return (
    <div className=" k w-full  ">

      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <AuthProvider>
        <NavbarClient/>
          <AppRoutes /> 
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
