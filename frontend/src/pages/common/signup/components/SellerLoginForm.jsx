import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";
import { BiSolidLock } from "react-icons/bi";

const SellerLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    gender: '',
    country: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Save the actual file
      setPreviewUrl(URL.createObjectURL(file)); // Safe preview
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('username', formData.username);
    data.append('gender', formData.gender);
    data.append('country', formData.country);
    data.append('city', formData.city);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);

    if (image) {
      data.append('image', image); // append original File object
    }

    // ✅ For now, just to check:
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    // 🔁 later you can send it to backend:
    // fetch('/api/signup', {
    //   method: 'POST',
    //   body: data
    // });
  };


  return (
    <div className='w-full'>
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
        {previewUrl ? (
  <img
    src={previewUrl}
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
        <div className='grid grid-cols-2 gap-4'>
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName || ''}
              onChange={handleChange}
              className="p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              className="p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              required
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>

          <div className="relative">
            <select
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              className="p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              className="p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              required
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>

          <div className="relative">
            <input
              type="text"
              placeholder="City"
              name="city"
              value={formData.city || ''}
              onChange={handleChange}
              className="p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              required
            />
          </div>

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
        </div>
        <div className='grid grid-cols-2 gap-4'>

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

export default SellerLoginForm;
