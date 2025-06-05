import React, { useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaRegHeart, FaSearch, FaUser } from 'react-icons/fa'
import { IoIosSpeedometer } from 'react-icons/io';
import { FaWhatsapp } from "react-icons/fa";
import { FaMessage } from 'react-icons/fa6';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';
import truckService from '../../../../services/truckService';
import toast from 'react-hot-toast';
import { PiAddressBookTabsFill } from "react-icons/pi";

const Info = ({ data }) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!email.trim() || !message.trim()) {
      toast.error("Both Email and Message are required!");
      return;
    }

    const payload = {
      email: email,
      message: message,
      sellerEmail: data?.email
    };

    dispatch(ShowLoading());
    try {
      const response = await truckService.sendMessage(payload);
      console.log("Response from server:", response);
      setEmail('');
      setMessage('');
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setEmail('');
    setMessage('');
  };

  console.log(data, 'data in info')

  return (
    <div>
      <div className='lg:pl-20'>
        <div className='flex justify-between'>
          <h2 style={{ fontFamily: 'Oswald' }} className=' text-2xl sm:text-[48px] font-bold'>{data?.vehicleName}</h2>

          {/* <button className="bg-white p-4 rounded-[10px] h-fit w-fit shadow">
            <FaRegHeart className="#1E1E1E" size={25} />
          </button> */}
        </div>

        <p className='text-lg'>{data?.description}</p>

        <div className="mt-6 pt-6 border-t">
          {/* Price Section */}
          <div className="mb-3 flex justify-between">
            <p className="text-lg font-medium">Price</p>
            {data.mileage ?
              <p className="flex items-center gap-2 text-sm">
                <span><IoIosSpeedometer /></span> {data?.mileage} Miles
              </p>
              :
              ''
            }
          </div>

          {/* Mileage & Location */}
          <div className="flex justify-between  text-sm mb-4">
            <p className="text-[#DF0805] text-lg sm:text-[32px] font-bold">
              ${data?.vehiclePrice?.toLocaleString()}
            </p>

            <p className="flex items-center gap-1 text-sm">
              <FaMapMarkerAlt />
              {data?.country} {data?.state && `, ${data?.state}`}
            </p>
          </div>

          {/* Seller Info */}
          <div className="bg-white p-5 mt-10 rounded-[10px]">
            <p className="font-semibold text-lg mb-2">Sellers Info</p>

            <div className="flex items-center gap-2 text-gray-700">
              <FaUser />
              <span>{data?.name}</span>
            </div>

            {data?.address && <div className="flex items-center gap-2 text-gray-700 mt-2">
              <PiAddressBookTabsFill />
              <span>{data?.address}</span>
            </div>}

            {data?.phone && <div className="flex items-center gap-2 text-gray-700 mt-2">
              <FaPhone />
              <span>{data?.phone}</span>
            </div>}

            <div className='flex flex-col sm:flex-row justify-between'>
              {/* <div className="flex items-center gap-2 text-gray-700 mt-2">
                <FaEnvelope />
                <span>{data?.email}</span>
              </div> */}

              <div></div>

              <button
                onClick={() => setShowPopup(true)}
                className="mt-3 gap-2 flex items-center cursor-pointer font-medium w-[141px] h-[36px] justify-center bg-[#DF0805]  text-white py-2 rounded-[10px] transition"
              >
                Contact Us
                <FaMessage />
              </button>
            </div>

          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000049] z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full border border-gray-300 p-2 mb-3 rounded"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full border border-gray-300 p-2 mb-4 rounded h-28"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-[#DF0805] text-white rounded hover:bg-[#BF0605] cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Info