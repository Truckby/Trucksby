import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img from "../../../../assets/images/card.svg";

// Section Component
const Section = ({ title, data }) => (
  <div className="mb-4">
    <div className="bg-[#DF0805] text-white text-lg sm:text-2xl mt-5 sm:mt-10 h-[40px] sm:h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">
      {title}
    </div>
    <div className="">
      {Object.entries(data || {}).map(([label, value], index) => (
        <InfoRow key={index} label={label} value={value} />
      ))}
    </div>
  </div>
);

// Info Row Component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-[#1E1E1E] font-medium pt-3 sm:pt-6 pb-3 sm:pb-[22px] sm:text-lg border-b">
    <span className="font-medium capitalize">{label}</span>
    <span>{value === 0 ? '' : value}</span>
  </div>
);

// DetailInfo Component
const DetailInfo = ({ data, images = [] }) => {

  return (
    <div>
      {/* Carousel Section */}
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`image - ${index + 1}`}
              className="w-auto h-[300px] sm:h-[465px] object-cover rounded-[15px]"
            />
          </div>
        ))}
      </Carousel>

      {/* Thumbnail Images */}
      {/* <div className="flex flex-wrap gap-3 mt-8">
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`image - ${index + 1}`}
              className=" w-[120px] h-[100px] sm:w-[164px] sm:h-[143px] object-cover rounded-[15px]"
            />
          </div>
        ))}
      </div> */}

      {/* Vehicle Details Section */}
      <div className="">
        {data
          ? Object.keys(data).map((section, index) => (
            <Section key={index} title={section} data={data[section]} />
          ))
          : "No Data Available"}
      </div>
    </div>
  );
};

export default DetailInfo;
