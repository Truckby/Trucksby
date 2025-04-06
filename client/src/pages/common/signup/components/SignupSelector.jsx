import React, { useState } from "react";
import BuyerSignupForm from "./BuyerSignupForm";
import SellerSignupForm from "./SellerSignupForm";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "../../../../assets/images/login_logo.svg"; // update the path as needed
import { Link } from "react-router";

export default function SignupSelector() {
  const [activeForm, setActiveForm] = useState("buyer");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full mx-auto my-10 sm:p-6 flex flex-col items-center justify-center">
      <img
        src={logo}
        alt="Logo"
        width={177}
        height={127}
        className="mb-5"
      />

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveForm("buyer")}
          className={`w-full sm:w-auto px-4 py-3 sm:p-5 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer text-sm sm:text-base ${
            activeForm === "buyer"
              ? " border-2 border-[#DF0805] text-[#DF0805]"
              : "shadow-sm text-gray-700"
          }`}
        >
          <BsFillPersonFill className="text-lg sm:text-xl" />
          <h2>Signup As Buyer</h2>
        </button>
        <button
          onClick={() => setActiveForm("seller")}
          className={`w-full sm:w-auto px-4 py-3 sm:p-5 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer text-sm sm:text-base ${
            activeForm === "seller"
              ? " border-2 border-[#DF0805] text-[#DF0805]"
              : "shadow-sm text-gray-700"
          }`}
        >
          <BsFillPersonFill className="text-lg sm:text-xl" />
          <h2>Signup As Seller</h2>
        </button>
      </div>

      {/* Profile Image Upload */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <BsFillPersonFill className="text-gray-500 text-4xl" />
          )}
        </div>
        <label className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 mt-2 rounded-md text-sm">
          Upload Image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {activeForm === "buyer" ? <BuyerSignupForm /> : <SellerSignupForm />}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#DF0805] transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
