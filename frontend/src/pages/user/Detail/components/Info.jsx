import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaRegHeart, FaSearch, FaUser } from 'react-icons/fa'
import { IoIosSpeedometer } from 'react-icons/io';
import { FaWhatsapp } from "react-icons/fa";

const Info = ({ data }) => {
  return (
    <div>
      <div className='lg:pl-20'>
        <div className='flex justify-between'>
          <h2 style={{ fontFamily: 'Oswald' }} className=' text-2xl sm:text-[48px] font-bold'>{data?.vehicleName}</h2>

          <button className="bg-white p-4 rounded-[10px] h-fit w-fit shadow">
            <FaRegHeart className="#1E1E1E" size={25} />
          </button>
        </div>

        <p className='text-lg'>{data?.description}</p>

        <div className="mt-6 pt-6 border-t">
          {/* Price Section */}
          <div className="mb-3 flex justify-between">
            <p className="text-lg font-medium">Price</p>

            {data?.mileage && <p className="flex items-center gap-2 text-sm">
              <span><IoIosSpeedometer /></span> {data?.mileage} Miles
            </p>}
          </div>

          {/* Mileage & Location */}
          <div className="flex justify-between  text-sm mb-4">
            <p className="text-[#DF0805] text-lg sm:text-[32px] font-bold">{data?.vehiclePrice} $</p>

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

            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <FaPhoneAlt />
              <span>{data?.phone}</span>
            </div>

            <div className='flex flex-col sm:flex-row justify-between'>
              <div className="flex items-center gap-2 text-gray-700 mt-2">
                <FaEnvelope />
                <span>{data?.email}</span>
              </div>

              <button className="mt-3 gap-2 flex items-center font-medium w-[141px] h-[36px] justify-center bg-[#69E383] text-white py-2 rounded-[10px]  transition">
                START CHAT

                <FaWhatsapp />

              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Info