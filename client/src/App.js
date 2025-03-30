// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/common/login/Login";
import SignUp from "./pages/common/signup/SignUp";
import FilterPage from "./pages/user/Filter/FilterPage";
import DetailPage from "./pages/user/Detail/DetailPage";
import Listing from "./pages/seller/Listing/Listing";
import AddTruckPage from "./pages/seller/AddTruck/AddTruckPage";
import Profile from "./pages/common/profile/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/common/home/Home";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* User Routes */}
        <Route path="/user/filter" element={<PrivateRoute role="user"><FilterPage /></PrivateRoute>} />
        <Route path="/user/detail" element={<PrivateRoute role="user"><DetailPage /></PrivateRoute>} />

        {/* Client Routes */}
        <Route path="/seller/listing" element={<PrivateRoute role="seller"><Listing /></PrivateRoute>} />
        <Route path="/seller/add-truck" element={<PrivateRoute role="seller"><AddTruckPage /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
