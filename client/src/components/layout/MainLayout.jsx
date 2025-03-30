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
        <div>
            {/* Optional: show header/nav based on role */}
            {role === "user" && (
                <Header />
            )}
            {role === "seller" && (
                <Header />
            )}
            {!role && location.pathname !== "/login" && location.pathname !== "/signup" && (
                <Header />
            )}

            {/* Main content area */}
            <main className="p-6">
                <Outlet />
            </main>

            

            <Footer/>
        </div>
    );
};

export default MainLayout;
