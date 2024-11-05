
import { Route, Routes } from "react-router-dom";
import RedirectedRoute from "./components/common/RedirectRoute";
import NavbarClient from "./components/common/NavbarClient";

// Lazy load components for each route
import UserLogin from "./pages/client/UserLogin";
import Home from "./pages/client/Home";
import VendorPage from "./pages/client/VendorPage";
import SearchPage from "./pages/client/SearchPage";
import VendorRegister from "./pages/client/VendorRegister";
import VendorLayout from "./pages/vendor/VendorLayout";



function AppRoutes() {
  return (
    <Routes>
        <Route
          path="/auth/user-login/"
          element={
            <RedirectedRoute>
              <UserLogin />
            </RedirectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/vendor/" element={<VendorLayout />} />
        <Route path="/vendor-profile/" element={<VendorPage />} />
        <Route path="/search/" element={<SearchPage />} />
        <Route path="/register-vendor/" element={<VendorRegister />} />
        

    </Routes>
  );
}

export default AppRoutes;
