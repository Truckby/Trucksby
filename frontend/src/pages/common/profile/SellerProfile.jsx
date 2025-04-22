import React, { useState } from "react";
import './style.css'
import { useSelector } from "react-redux";

const SellerProfile = () => {
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    fullName: user?.name,
    username: user?.userName,
    email: user?.email,
    gender: user?.gender,
    country: user?.country,
    city: user?.city,
    profileImage: user?.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className='py-[65px]'>
      <div className="max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow">
        <h2 className="text-2xl sm:text-[32px] font-bold leading-[61px] pb-[45px]">My Profile</h2>

        <div className="flex flex-col sm:flex-row items-center space-x-[36px] mb-6">
          <div className="w-[108px] h-[108px] rounded-full overflow-hidden border">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                No Image
              </div>
            )}
          </div>
          <input type="file" onChange={handleImageChange} className="mt-4 sm:mt-0" />
        </div>

        <form onSubmit={handleSubmit} >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Full Name */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="input"
                onChange={handleChange}
                value={formData.fullName}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label">Gender</label>
              <select
                name="gender"
                className="input"
                onChange={handleChange}
                value={formData.gender}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="label">Country</label>

              <input
                type="text"
                name="country"
                placeholder="Enter your full name"
                className="input"
                onChange={handleChange}
                value={formData.country}
              />
            </div>

            {/* City */}
            <div>
              <label className="label">City</label>
            
              <input
                type="text"
                name="city"
                placeholder="Enter your username"
                className="input"
                onChange={handleChange}
                value={formData.city}
              />
            </div>

            {/* Username */}
            <div>
              <label className="label">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input"
                onChange={handleChange}
                value={formData.username}
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

          </div>
          {/* Save Button */}
          <div className="col-span-2 flex justify-end">
            <button type="submit" className="bg-[#DF0805] text-white rounded-[10px] cursor-pointer mt-4 h-[48px] md:h-[54px] w-[180px] md:w-[214px] flex justify-center items-center ml-auto">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerProfile;
