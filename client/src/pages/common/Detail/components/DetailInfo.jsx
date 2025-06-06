import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Info Row Component
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-[#1E1E1E] font-medium pt-3 sm:pt-6 pb-3 sm:pb-[22px] sm:text-lg border-b">
    <span className="font-medium capitalize">{label}</span>
    <span>{value}</span>
  </div>
);

// Section Component
const Section = ({ title, data }) => {
  // Filter out fields with 0, null, undefined, or empty string
  const filteredData = Object.entries(data || {}).filter(
    ([, value]) => value !== undefined && value !== null && value !== "" && value !== 0 && value !== "0"
  );

  if (filteredData.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="bg-[#DF0805] text-white text-lg sm:text-2xl mt-5 sm:mt-10 h-[40px] sm:h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">
        {title}
      </div>
      <div>
        {filteredData.map(([label, value], index) => (
          <InfoRow key={index} label={label} value={value} />
        ))}
      </div>
    </div>
  );
};

// DetailInfo Component
const DetailInfo = ({ data, images = [] }) => {
  // Filter out entire sections with no valid values
  const filteredSections = Object.entries(data || {}).reduce((acc, [sectionTitle, sectionData]) => {
    const validFields = Object.entries(sectionData || {}).filter(
      ([, value]) => value !== undefined && value !== null && value !== "" && value !== 0 && value !== "0"
    );
    if (validFields.length > 0) {
      acc[sectionTitle] = Object.fromEntries(validFields);
    }
    return acc;
  }, {});

  return (
    <div>
      {/* Carousel Section */}
      {images?.length > 0 && (
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
      )}

      {/* Vehicle Details Section */}
      <div>
        {Object.keys(filteredSections).length > 0 ? (
          Object.entries(filteredSections).map(([section, sectionData], index) => (
            <Section key={index} title={section} data={sectionData} />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">No vehicle details available.</div>
        )}
      </div>
    </div>
  );
};

export default DetailInfo;
