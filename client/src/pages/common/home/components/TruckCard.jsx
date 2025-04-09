import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { useNavigate } from "react-router";


const TruckCard = ({ images, title, price, location, miles }) => {
  const navigate = useNavigate()
  return (
    <div className="mr-[75px] rounded-[10px] shadow mx-auto w-[240px] m-2 mb-8 bg-white cursor-pointer">
      {/* Carousel Section */}
      <div className="relative">
        <Carousel showThumbs={false} infiniteLoop autoPlay>
          {images.map((img, index) => (
            <div key={index} onClick={()=>navigate(`/user/detail`)} >
              <img
                src={img}
                alt={`${title} - ${index + 1}`}
                className="w-[255px] h-[170px] object-cover rounded-t-[10px]"
              />
            </div>
          ))}
        </Carousel>
        <button  className="absolute top-2 right-2 bg-white p-2 rounded-[6px] z-50 cursor-pointer shadow">
          <FaRegHeart className="text-gray-600" size={18} />
        </button>
      </div>

      {/* Details Section */}
      <div className="p-[15px] pt-[10px]" onClick={()=>navigate(`/user/detail`)} >
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-[#DF0805] mt-[6px]">{price} $</p>
        <div className="flex items-center justify-between text-black text-[12px] mt-[18px]">
          <p className="flex items-center"><FaLocationDot className="mr-1" />{location}</p>
          <p className="flex items-center"><IoIosSpeedometer className="mr-1" />{miles} Miles</p>
        </div>
      </div>
    </div>
  );
};

export default TruckCard;
