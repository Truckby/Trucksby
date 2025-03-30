// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/common/login/Login";
import SignUp from "./pages/common/signup/SignUp";
import FilterPage from "./pages/user/Filter/FilterPage";
import DetailPage from "./pages/user/Detail/DetailPage";
import Listing from "./pages/seller/Listing/Listing";
import AddTruckPage from "./pages/seller/AddTruck/AddTruckPage";
import Profile from "./pages/common/profile/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/common/home/Home";
import MainLayout from "./components/layout/MainLayout";
import PrivacyPage from "./pages/common/privacy/PrivacyPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with MainLayout */}
        <Route element={<MainLayout />}>
          {/* Public Routes (without layout) */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          
          {/* Common Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/PrivacyPage" element={<PrivacyPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/filter"
            element={
              <PrivateRoute role="user">
                <FilterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/detail"
            element={
              <PrivateRoute role="user">
                <DetailPage />
              </PrivateRoute>
            }
          />

          {/* Seller Routes */}
          <Route
            path="/seller/listing"
            element={
              <PrivateRoute role="seller">
                <Listing />
              </PrivateRoute>
            }
          />
          <Route
            path="/seller/add-truck"
            element={
              <PrivateRoute role="seller">
                <AddTruckPage />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
