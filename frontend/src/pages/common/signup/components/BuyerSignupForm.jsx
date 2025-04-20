import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";
import { BiSolidLock } from "react-icons/bi";
import toast from 'react-hot-toast';
import userService from '../../../../services/userService';
import { uploadImg } from '../../../../services/image';

const BuyerLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      let imageUrl = null;

      if (image) {
        try {
          const imgForm = new FormData();
          imgForm.append("images", image);
          const res = await uploadImg(imgForm);

          if (res?.success && res?.urls?.length > 0) {
            imageUrl = res.urls[0];
          } else {
            toast.error("Image upload failed");
            return;
          }
        } catch (error) {
          toast.error("Error uploading image");
          return;
        }
      }

      const payload = {
        email: values.email,
        password: values.password,
        image: imageUrl
      };

      try {
        await userService.registerUser(payload, 'user');
        toast.success('User registered successfully!');
        formik.resetForm();
        setImage(null);
        setPreviewUrl(null);

      } catch (error) {
        toast.error(error?.response?.data?.error || 'Registration failed');
        console.error('Registration error:', error);
      }
    }

  });

  return (
    <div className='w-full'>
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
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

      <form onSubmit={formik.handleSubmit} className="space-y-4 w-full lg:px-[15%] mt-5">
        {/* Email Field */}
        <div className="relative">
          <IoIosMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-4 pl-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-4 pl-12 pr-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative">
          <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-4 pl-12 pr-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
          />
          <button
            type="button"
            onClick={() => setConfirmShowPassword(!showConfirmPassword)}
            className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
          >
            {showConfirmPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
          </button>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex cursor-pointer justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DF0805] focus:outline-none transition-colors"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default BuyerLoginForm;
