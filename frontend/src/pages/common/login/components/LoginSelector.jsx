import React, { useState } from "react";
import BuyerLoginForm from "./BuyerLoginForm";
import SellerLoginForm from "./SellerLoginForm";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "../../../../assets/images/login_logo.svg"; // ✅ Update this path to your actual image location
import { Link } from "react-router";

const LoginSelector = () => {
  const [activeForm, setActiveForm] = useState("buyer");

  return (
    <div className="w-full mx-auto my-10 sm:p-6 flex flex-col items-center justify-center">
      <img src={logo} alt="Logo" width={177} height={127} className="mb-5" />

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveForm("buyer")}
          className={`w-full sm:w-auto px-4 py-3 sm:p-5 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer text-sm sm:text-base ${activeForm === "buyer"
              ? " border-2 border-[#DF0805] text-[#DF0805]"
              : "shadow-sm text-gray-700"
            }`}
        >
          <BsFillPersonFill className="text-lg sm:text-xl" />
          <h2>Login As Buyer</h2>
        </button>
        <button
          onClick={() => setActiveForm("seller")}
          className={`w-full sm:w-auto px-4 py-3 sm:p-5 rounded-xl transition-colors flex items-center justify-center gap-3 cursor-pointer text-sm sm:text-base ${activeForm === "seller"
              ? " border-2 border-[#DF0805] text-[#DF0805]"
              : "shadow-sm text-gray-700"
            }`}
        >
          <BsFillPersonFill className="text-lg sm:text-xl" />
          <h2>Login As Seller</h2>
        </button>
      </div>

      {activeForm === "buyer" ? <BuyerLoginForm /> : <BuyerLoginForm />}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Do not have an account?{" "}
          <Link to="/signup" className="text-[#DF0805] transition-colors">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSelector;
