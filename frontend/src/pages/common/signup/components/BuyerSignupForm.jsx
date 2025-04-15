import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";
import { BiSolidLock } from "react-icons/bi";

const BuyerLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Save the actual file
      setPreviewUrl(URL.createObjectURL(file)); // Safe preview
    }
  };



  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Buyer login submitted:', formData);
  };

  return (
    <div className='w-full'>
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
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
      <form onSubmit={handleSubmit} className="space-y-4 w-full lg:px-[15%] mt-5">
        <div className="relative">
          <IoIosMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            id="buyer-email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 pl-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            required
          />
        </div>

        <div className="relative">
          <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            id="buyer-password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-4 pl-12 pr-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
          </button>
        </div>

        <div className="relative">
          <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="buyer-confirm-password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-4 pl-12 pr-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            required
          />
          <button
            type="button"
            onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showConfirmPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DF0805] focus:outline-none transition-colors"
        >
          Signup
        </button>
      </form>
    </div>

  );
};

export default BuyerLoginForm;
