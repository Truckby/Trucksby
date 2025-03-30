import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaTelegramPlane } from "react-icons/fa";
import logo from "../assets/images/footer_logo.svg";  

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-8 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-10 md:mb-0">
        <img src={logo} alt="Logo" height={133} width={180} />
      </div>
      <div className="container mx-auto px-10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-sm text-gray-300 mb-2">Newsletter</h2>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 pl-4 pr-12 w-64 bg-white text-gray-900 rounded-md focus:outline-none"
              />
              <button className="absolute right-2 bg-red-600 text-white p-2 rounded-full">
                <FaTelegramPlane size={18} />
              </button>
            </div>
          </div>

          <nav className="flex space-x-18 text-[#FFFFFF] text-sm">
            <a href="#" className="hover:text-white">
              Home
            </a>
            <a href="#" className="hover:text-white">
              Explore
            </a>
            <a href="#" className="hover:text-white">
              Profile
            </a>
            <a href="#" className="hover:text-white">
              Help
            </a>
          </nav>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 text-[#FFFFFF] mt-6 md:mt-0">
              <a href="#" className="hover:text-white">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <FaYoutube size={18} />
              </a>
            </div>
            <div className="text-center text-[#FFFFFF] text-xs mt-6">
              © Copyright 2024 - Coolpai
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
