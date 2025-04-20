import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { BiSolidLock } from 'react-icons/bi';
import userService from '../../../../services/userService';
import toast from 'react-hot-toast';
import { uploadImg } from '../../../../services/image';

const SellerLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false)
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    userName: Yup.string().required('userName is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      userName: '',
      gender: '',
      country: '',
      city: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      let imageUrl = '';
      setLoading(true)
      // Handle image upload if an image is selected
      if (image) {
        try {
          const imgForm = new FormData();
          imgForm.append("images", image);
          const res = await uploadImg(imgForm);

          if (res?.success && res?.urls?.length > 0) {
            imageUrl = res.urls[0]; // Get the URL of the uploaded image
          } else {
            toast.error("Image upload failed");
            return;
          }
        } catch (error) {
          toast.error("Error uploading image");
          return;
        }
      }

      // Create the payload object with form values and imageUrl
      const payload = {
        name: values.fullName,
        userName: values.userName,
        gender: values.gender,
        country: values.country,
        city: values.city,
        email: values.email,
        password: values.password,
        image: imageUrl,
      };

      try {
        // Call the user registration service with payload
        await userService.registerUser(payload, 'seller');
        toast.success('User registered successfully!');
        resetForm(); // Reset the form after successful submission
        setImage(null); // Clear the image
        setPreviewUrl(null); // Clear the image preview
      } catch (error) {
        toast.error(error?.response?.data?.error || 'Registration failed');
        console.error('Registration error:', error);
      }
      setLoading(false)
    },

  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <BsFillPersonFill className="text-gray-500 text-4xl" />
          )}
        </div>
        <label className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 mt-2 rounded-md text-sm">
          Upload Image
          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4 w-full lg:px-[15%] mt-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-4 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-4 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            />
            {formik.touched.userName && formik.errors.userName && (
              <p className="text-red-500 text-sm">{formik.errors.userName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-4 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-4 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            />
            {formik.touched.country && formik.errors.country && (
              <p className="text-red-500 text-sm">{formik.errors.country}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="p-4 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-sm">{formik.errors.city}</p>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <IoIosMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-4 pl-12 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              />
            </div>

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="relative">
              <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-4 pl-12 pr-12 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="p-4 pl-12 pr-12 block w-full border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </button>
            </div>

            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full flex justify-center cursor-pointer py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DF0805] hover:bg-[#b60705] focus:outline-none"
        >
          {loading ? 'loading...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default SellerLoginForm;
