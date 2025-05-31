import React, { useEffect, useState } from "react";
import './style.css';
import { useDispatch, useSelector } from "react-redux";
import userService from "../../../services/userService";
import toast from "react-hot-toast";
import { fetchUserInfo } from "../../../redux/userSlice";
import { uploadImg } from "../../../services/image";
import subscriptionService from "../../../services/subscriptionService";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import './style.css';

const SellerProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.image || null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    userName: user?.userName || "",
    email: user?.email || "",
    gender: user?.gender || "",
    country: user?.country || "",
    city: user?.city || "",
    image: user?.image || "",
  });

  const [info, setInfo] = useState({
    status: false,
    planName: '',
    productId: '',
    subscriptionId: '',
    amount: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalFormData = { ...formData };

    // Handle image upload if there's a new image
    if (image) {
      dispatch(ShowLoading());
      try {
        const imgForm = new FormData();
        imgForm.append("images", image);
        const res = await uploadImg(imgForm);

        if (res?.success && res?.urls?.length > 0) {
          // Add the image URL to the form data
          finalFormData = {
            ...finalFormData,
            image: res.urls[0]
          };
        } else {
          toast.error("Image upload failed");
          return;
        }
      } catch (error) {
        toast.error("Error uploading image");
        return;
      }
      dispatch(HideLoading());
    }

    try {
      // Using updateUserInfo instead of updateUserProfile
      dispatch(ShowLoading());

      const response = await userService.updateUserInfo(finalFormData);

      if (!response) {
        setError({ form: "Update failed" });
        return;
      }

      toast.success('Profile updated successfully');
      dispatch(fetchUserInfo());
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Registration failed');
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    const getSubscriptionInfo = async () => {
      dispatch(ShowLoading());
      try {
        const response = await subscriptionService.getUserSubscriptionInfo();
        if (response.info) {
          setInfo(response.info);
        }
      } catch (error) {
        message.error(error.response.data.error);
      } finally {
        dispatch(HideLoading());
      }
    };

    getSubscriptionInfo();
  }, []);

  return (
    <div className='py-[65px]'>
      <div className="max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow">
        <h2 className="text-2xl sm:text-[32px] font-bold leading-[61px] pb-[45px]">My Profile</h2>

        <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
          <div className="flex flex-col sm:flex-row items-center space-x-[36px] mb-6">
            <div
              className="w-[108px] h-[108px] rounded-full overflow-hidden border cursor-pointer"
              onClick={() => document.getElementById('hiddenImageInput').click()}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
                  No Image
                </div>
              )}
            </div>
            <input
              id="hiddenImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div>
            {info.status && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-sm border border-green-300 max-w-xs w-full text-center sm:text-left mt-4 sm:mt-0">
                <p className="text-sm font-semibold">Active Plan:</p>
                <p className="text-base font-bold">{info.planName}</p>
              </div>
            )}
          </div>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Full Name */}
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input"
                onChange={handleChange}
                value={formData.name}
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
                placeholder="Enter your country"
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
                placeholder="Enter your city"
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
                name="userName"
                placeholder="Enter your userName"
                className="input"
                onChange={handleChange}
                value={formData.userName}
              />
            </div>

            {/* Email */}
            {/* <div>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input"
                onChange={handleChange}
                value={formData.email}
              />
            </div> */}
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