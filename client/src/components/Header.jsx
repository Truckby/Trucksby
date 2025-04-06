import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Privacy", to: "/PrivacyPage" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <header className="bg-white px-4 shadow-sm">
      <div className="mx-auto md:px-0 max-w-7xl py-3 flex justify-between items-center">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={logo} alt="Logo" width={109} height={80} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative pb-2 ml-10 transition-colors ${isActive
                    ? "text-[#DF0805] border-b-2 border-[#DF0805]"
                    : "text-gray-700 hover:text-[#DF0805]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-6 py-2 text-black font-medium rounded-lg border-[1.4px] border-black transition duration-200 hover:bg-[#DF0805] hover:text-white hover:border-[#DF0805]"
          >
            Sign In
          </Link>
          <Link
            to="/sell"
            className="px-4 py-2 bg-[#DF0805] text-white font-medium rounded-lg"
          >
            Sell Your Truck
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 transition-all duration-500 delay-100 ease-in-out">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 border-b transition-colors w-fit ${isActive
                    ? "text-[#DF0805] border-[#DF0805]"
                    : "text-gray-700 hover:text-[#DF0805] border-transparent"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex flex-col space-y-2">
            <Link
              to="/login"
              className="w-full px-4 py-2 text-center text-black font-medium rounded-lg border border-black transition duration-200 hover:bg-[#DF0805] hover:text-white hover:border-[#DF0805]"
            >
              Sign In
            </Link>
            <Link
              to="/sell"
              className="w-full px-4 py-2 text-center bg-[#DF0805] text-white font-medium rounded-lg"
            >
              Sell Your Truck
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
