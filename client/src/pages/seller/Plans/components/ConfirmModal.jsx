import React from "react";
import "./ConfirmationModal.css"; // You can reuse the same styles
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../../../redux/userSlice";

const SuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="modal-content py-10 px-6 bg-white rounded-lg shadow-lg text-center">
        <div className="modal-header">
          <svg width="64px" className="mx-auto" height="64px" viewBox="-3.2 -3.2 38.40 38.40" xmlns="http://www.w3.org/2000/svg" fill="#10B981" stroke="#253864">
            <g><path d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm5.7279221 11-7.0710679 7.0710678-4.2426406-4.2426407-1.4142136 1.4142136 5.6568542 5.6568542 8.4852814-8.4852813z" fill="#202327" fillRule="evenodd"></path></g>
          </svg>
        </div>
        <h2 className="modal-title text-3xl pb-4">Your Payment has been confirmed!</h2>
        <button onClick={() => navigate('/seller/listing')} className="modal-button" >Get started</button>
      </div>
    </div>
  );
};

export default SuccessPage;
