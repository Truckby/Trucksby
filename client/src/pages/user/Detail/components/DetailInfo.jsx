import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img from "../../../../assets/images/card.svg";

// Section Component
const Section = ({ title, data }) => (
  <div className="mb-4">
    <div className="bg-gray-800 text-white text-2xl mt-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">
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
  <div className="flex justify-between text-[#1E1E1E] font-medium pt-6 pb-[22px] text-lg border-b">
    <span className="font-medium">{label}</span>
    <span>{value}</span>
  </div>
);

// DetailInfo Component
const DetailInfo = ({ data }) => {
  const images = [img, img, img];

  return (
    <div>
      {/* Carousel Section */}
      <Carousel showThumbs={false} infiniteLoop autoPlay>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`image - ${index + 1}`}
              className="w-auto h-[465px] object-cover rounded-[15px]"
            />
          </div>
        ))}
      </Carousel>

      {/* Thumbnail Images */}
      <div className="flex gap-3 mt-8">
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`image - ${index + 1}`}
              className="w-[164px] h-[143px] object-cover rounded-[15px]"
            />
          </div>
        ))}
      </div>

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
