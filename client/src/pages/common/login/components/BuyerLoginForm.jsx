import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";
import { BiSolidLock } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import userService from '../../../../services/userService';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BuyerLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(ShowLoading());
    try {
      const response = await userService.loginUser(values);
      if (response.token) {
        Cookies.set('truck-jwt-token', response.token, {
          secure: true,
          sameSite: 'Lax'
        });
        const from = location.state?.from?.pathname;
        navigate(from || '/');
        toast.success('Successfully Logged In');
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "An error occurred during login");
    } finally {
      dispatch(HideLoading());
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4 w-full lg:px-[15%] mt-5">
          <div className="relative">
            <div className="relative">
              <IoIosMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="p-4 pl-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1 ml-2" />
          </div>

          <div className="relative">
            <div className="relative">
              <BiSolidLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="p-4 pl-12 pr-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#DF0805] focus:border-[#DF0805]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              >
                {showPassword ? <BsEyeSlashFill size={20} /> : <BsEyeFill size={20} />}
              </button>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1 ml-2" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DF0805] focus:outline-none transition-colors"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BuyerLoginForm;
