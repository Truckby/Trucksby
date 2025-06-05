import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import profile from '../../assets/images/profile.svg'
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown } from "react-icons/fa6";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import userService from "../../services/userService";
import { clearUser } from "../../redux/userSlice";
import { setLoggedOut } from "../../redux/logoutSlice";
import Cookies from 'js-cookie';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", to: "/", protected: false },
    { name: "Listing", to: "/seller/listing", protected: true },
    { name: "Plans", to: "/seller/plans", protected: true },
    { name: "Privacy", to: "/privacy", protected: false },
  ];

  const handleLogout = async () => {
    dispatch(ShowLoading());
    try {
      await userService.logoutUser({});
      Cookies.remove('truck-jwt-token');
      dispatch(setLoggedOut());
      dispatch(clearUser());
    } catch (error) {
      message.error(error.response.data);
    }
    dispatch(HideLoading());
  };

  return (
    <header className="bg-white px-4 shadow-sm">
      <div className="mx-auto md:px-0 max-w-7xl md:py-2 flex justify-between items-center">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={logo} alt="Logo" width={109} height={80} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            {navLinks.map((item, index) => (
              <div key={index}>
                {item.protected ?
                  user ?
                    < NavLink
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
                    :
                    ''
                  :
                  < NavLink
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
                }
              </div>
            ))}
          </nav>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user?.email &&
            <>
              <Link
                to="/login"
                className="px-6 py-2 text-black font-medium rounded-lg border-[1.4px] border-black transition duration-200 hover:bg-[#DF0805] hover:text-white hover:border-[#DF0805]"
              >
                Sign In
              </Link>
              <Link
                to="/signup?type=seller"
                className="px-4 py-2 bg-[#DF0805] text-white font-medium rounded-lg"
              >
                Sell Your Equipment
              </Link>
            </>
          }

          {user?.email && (
            <div
              ref={dropdownRef} // Attach ref to the dropdown container
              onClick={toggleProfileDropdown}
              className="h-[48px] cursor-pointer relative pr-4 flex shadow bg-white rounded-[10px] w-[200px] items-center"
            >
              <img
                src={user?.image || profile}
                alt="profile"
                className="w-[33px] h-[33px] rounded-full object-cover ml-2.5"
              />
              <span className="ml-2.5">
                {user?.userName
                  ? user.userName.split("@")[0].slice(0, 10)
                  : "Guest"}
              </span>

              <div className="ml-auto">
                <FaAngleDown />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-10 mt-2 w-[200px] bg-white border border-gray-200 transform delay-500 rounded-[10px] shadow-lg p-4 z-50">
                  <ul>
                    <li
                      onClick={() => navigate(`/${user.role}/profile`)}
                      className="py-1 text-sm cursor-pointer flex items-center hover:bg-red-200"
                    >
                      Profile
                    </li>
                    <li
                      onClick={handleLogout}
                      className="py-1 text-sm cursor-pointer flex items-center text-red-500 hover:bg-red-200"
                    >
                      Log out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
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
      {
        isMenuOpen && (
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
              {!user?.email && (
                <>
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 text-center text-black font-medium rounded-lg border border-black transition duration-200 hover:bg-[#DF0805] hover:text-white hover:border-[#DF0805]"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup?type=seller"
                    className="w-full px-4 py-2 text-center bg-[#DF0805] text-white font-medium rounded-lg"
                  >
                    Sell Your Truck
                  </Link>
                </>
              )}
            </div>

            {user?.email && <div onClick={toggleProfileDropdown} className="h-[48px] cursor-pointer relative pr-4 flex shadow bg-white rounded-[10px] w-[200px] items-center">
              <img src={user?.image || profile} alt="profile" className="w-[33px] h-[33px] rounded-full object-cover ml-2.5" />
              <span className="ml-2.5">
                {user?.userName ? user.userName.split('@')[0].slice(0, 10) : 'Guest'}
              </span>

              <div className="ml-auto">
                <FaAngleDown />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-10 mt-2 w-[200px] bg-white border border-gray-200 transform delay-500 rounded-[10px] shadow-lg p-4 z-50">
                  <ul>
                    <li onClick={() => navigate(`/${user.role}/profile`)} className="py-1 text-sm cursor-pointer flex items-center hover:bg-red-200">Profile</li>
                    <li onClick={handleLogout} className="py-1 text-sm cursor-pointer flex items-center text-red-500 hover:bg-red-200">
                      Log out
                    </li>
                  </ul>
                </div>
              )}
            </div>
            }
          </div>
        )
      }
    </header >
  );
}
