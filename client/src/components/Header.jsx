import React from "react";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  // Retrieve the current pathname from the browser.
  // (This works only in a client-side environment.)
  const pathname = window.location.pathname;

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 md:px-0 max-w-7xl py-3 flex justify-between items-center">
        <div className="flex items-center gap-18">
          <a href="/">
            <img src={logo} alt="Logo" width={109} height={80} />
          </a>

          <nav className="hidden md:flex">
            {[
              { name: "Home", to: "/" },
              { name: "Privacy", to: "/PrivacyPage" },
              { name: "Contact", to: "/contact" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative pb-2 mb-0 ml-[86px] transition-colors ${isActive
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

        <div className="flex space-x-4">
          <a
            href="/login"
            className="px-10 py-2 text-black font-medium rounded-lg border-[1.4px] border-black transition-colors duration-200 hover:bg-[#DF0805] hover:text-white hover:border-[#DF0805]"
          >
            Sign In
          </a>
          <a
            href="/sell"
            className="px-4 py-2 bg-[#DF0805] text-white font-medium rounded-lg"
          >
            Sell Your Truck
          </a>
        </div>
      </div>
    </header>
  );
}
