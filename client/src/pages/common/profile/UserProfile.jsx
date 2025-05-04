import React, { useState } from "react";
import './style.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo } from "../../../redux/userSlice";
import userService from "../../../services/userService";
import { uploadImg } from "../../../services/image";
import toast from "react-hot-toast";

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: user?.userName || "",
    email: user?.email || "",
    profileImage: user?.image || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedData = {
      userName: formData.username,
      email: formData.email,
      image: formData.profileImage,
    };

    if (imageFile) {
      try {
        const imgForm = new FormData();
        imgForm.append("images", imageFile);

        const res = await uploadImg(imgForm);

        if (res?.success && res?.urls?.length > 0) {
          updatedData.image = res.urls[0];
        } else {
          toast.error("Image upload failed");
          return;
        }
      } catch (error) {
        toast.error("Error uploading image");
        return;
      }
    }

    try {
      const response = await userService.updateUserInfo(updatedData);

      if (!response) {
        toast.error("Update failed");
        return;
      }

      toast.success("Profile updated successfully");
      dispatch(fetchUserInfo());
    } catch (error) {
      toast.error(error?.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className='py-[65px]'>
      <div className="max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow">
        <h2 className="text-2xl sm:text-[32px] font-bold leading-[61px] pb-[45px]">My Profile</h2>

        <div className="flex flex-col sm:flex-row items-center space-x-[36px] mb-6">
          <div className="w-[108px] h-[108px] rounded-full overflow-hidden border">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                No Image
              </div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4 sm:mt-0" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
            <button type="submit" className="bg-[#DF0805] text-white rounded-[10px] cursor-pointer mt-4 h-[48px] md:h-[54px] w-[180px] md:w-[214px] flex justify-center items-center ml-auto">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
