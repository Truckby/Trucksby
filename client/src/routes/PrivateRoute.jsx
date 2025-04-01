import React from "react";
import { Navigate } from "react-router-dom";

// Example: get role from localStorage or context
const getUserRole = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
  const user = 'user';
  // return user?.role; // e.g., 'user' or 'seller'
  return 'user'; // e.g., 'user' or 'seller'
};

const isAuthenticated = () => {
  // return !!localStorage.getItem("user");
  return true;
};

const PrivateRoute = ({ children, role }) => {
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
