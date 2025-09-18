import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSpeedometer } from "react-icons/io";
import { useNavigate } from "react-router";
import { formatNumberWithCommas } from "../../../../utils/extra";


const TruckCard = ({ images, title, price, location, miles, data }) => {
  const navigate = useNavigate()
  return (
    <div className="sm:mr-[75px] mr-4 rounded-[10px] shadow mx-auto w-[240px] m-2 mb-8 bg-white cursor-pointer">
      <div className="relative h-[170px] overflow-hidden rounded-t-[10px]">
        <Carousel showThumbs={false} infiniteLoop showStatus={false}>
          {images.map((img, index) => (
            <div key={index} onClick={() => navigate(`/detail/${data._id}`, { state: data })}>
              <img
                src={img}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="p-[15px] pt-[10px]" onClick={() => navigate(`/detail/${data._id}`, { state: data })}>
        <h3
          className="text-base font-medium overflow-hidden text-ellipsis whitespace-nowrap"
          title={title}
        >
          {title?.toUpperCase()}
        </h3>

        <p className="text-[#DF0805] mt-[6px]">
          {price === 0 ? "Contact for Price" : `$${formatNumberWithCommas(price)}`}
        </p>

        <div className="flex items-center justify-between text-black text-[12px] mt-[18px]">
          <p className="flex items-center max-w-[110px] overflow-hidden text-ellipsis whitespace-nowrap">
            <FaLocationDot className="mr-1 shrink-0" />{location}
          </p>
          {miles !== 0 && (
            <p className="flex items-center">
              <IoIosSpeedometer className="mr-1" />
              {formatNumberWithCommas(miles)} Miles
            </p>
          )}
        </div>
      </div>
    </div>


  );
};

export default TruckCard;
