import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role || null;
};

const MainLayout = () => {
    const role = getUserRole();
    const location = useLocation();

    return (
        <div className="bg-[#FBFBFB]">
            {/* Optional: show header/nav based on role */}
            {role === "user" && (
                <Header />
            )}
            {role === "seller" && (
                <Header />
            )}
            {!role && (
                <Header />
            )}
            <div className="min-h-[100vh]  px-4 lg:px-0 ">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
