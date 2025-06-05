import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";
import logo from "../../assets/images/footer_logo.svg";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import truckService from "../../services/truckService";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import toast from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    const payload = { email };

    dispatch(ShowLoading());
    try {
      const response = await truckService.newsLetter(payload);
      setEmail("");
      toast.success("Newsletter Subscribed successfully!");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Newsletter Subscription failed. Please try again.");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <footer className="bg-[#333333] text-white py-8 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-10 md:mb-0">
        <img src={logo} alt="Logo" height={133} width={180} />
      </div>

      <div className="container mx-auto px-10 mt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Newsletter section */}
          <div className="mb-6 lg:mb-0">
            <h2 className="text-sm text-gray-300 mb-2">Newsletter</h2>
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 pl-4 pr-12 w-64 bg-white text-gray-900 rounded-md focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSend}
                className="absolute right-2 cursor-pointer bg-red-600 text-white p-2 rounded-full"
              >
                <FaTelegramPlane size={18} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex mb-6 lg:mb-0 space-x-10 sm:space-x-12 justify-center items-center text-[#FFFFFF] text-sm">
            <Link to={"/"} className="hover:text-white">
              Home
            </Link>
            {user?.role === "seller" && (
              <Link to={"/seller/listing"} className="hover:text-white">
                Listing
              </Link>
            )}
            {user?.role === "seller" && (
              <Link to={"/seller/plans"} className="hover:text-white">
                Plans
              </Link>
            )}
            <Link to={"/privacy"} className="hover:text-white">
              Privacy
            </Link>
          </nav>

          {/* Socials */}
          <div className="mb-6 lg:mb-0 lg:w-[260px] flex flex-col items-center lg:items-end">
            <div className="flex space-x-4 text-[#FFFFFF] mt-6 md:mt-0">
              <Link target="_blank" to={"https://www.facebook.com/profile.php?id=61576747834064&mibextid=LQQJ4d"} className="hover:text-white">
                <FaFacebookF size={18} />
              </Link>

              <Link target="_blank" to={"https://www.instagram.com/truckbyapp?igsh=NTc4MTIwNjQ2YQ=="} className="hover:text-white">
                <FaInstagram size={18} />
              </Link>
            </div>
            <div className="text-center text-[#FFFFFF] text-xs mt-6">
              © Copyright {new Date().getFullYear()} - Trucksby
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
