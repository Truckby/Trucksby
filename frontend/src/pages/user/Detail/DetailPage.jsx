import React from 'react'
import Info from './components/Info';
import DetailInfo from './components/DetailInfo';
import { FaSearch } from 'react-icons/fa';
import TruckCard from '../../common/home/components/TruckCard';

import cardImage from '../../../assets/images/card.svg'
import SearchFilter from '../../../components/SearchFilter';

const DetailPage = () => {

  const sampleData = {
    General: {
      Year: "2020",
      Manufacturer: "VOLVO",
      Model: "VNL64T860",
      Mileage: "692,297 mi",
      VIN: "4V4NC9EH0LN248969",
      Hours: "17,061.1",
      Condition: "Used",
    },
    "Vehicle Info": {
      Payload: "11,500 KG",
      GWR: "11,500 KG",
      Wheelbase: "3,700 mm",
      Steering: "3,700 mm",
      Color: "Blue",
      Suspension: "Pneumatic suspension",
      "Gross Vehicle Weight": "Heavy Weight",
    },
    Powertrain: {
      "Transmission Type": "I Shift",
      "No of Speeds": "12 spd",
    },
    Chassis: {
      "Number of Rear Axles": "Tandem",
      "Front Axle Weight": "1000 lbs",
      "Rear Axle Weight": "1000 lbs",
    },
  };


  const truckData = [
    {
      images: [
        cardImage,
        cardImage,
        cardImage,
      ],
      title: "2024 ISUZU",
      price: "50,000",
      location: "Pocatello, Idaho",
      miles: "120,000",
    },
    {
      images: [
        cardImage,
        cardImage,
        cardImage,
      ],
      title: "2022 Ford F-750",
      price: "45,500",
      location: "Dallas, Texas",
      miles: "98,000",
    },
    {
      images: [
        cardImage,
        cardImage,
        cardImage,
      ],
      title: "2023 Freightliner M2",
      price: "60,000",
      location: "Los Angeles",
      miles: "75,000",
    },
    {
      images: [
        cardImage,
        cardImage,
        cardImage,
      ],
      title: "2024 ISUZU",
      price: "50,000",
      location: "Pocatello, Idaho",
      miles: "120,000",
    },
  ];

  return (
    <div className='pb-10 max-w-[1300px] mx-auto'>
      <SearchFilter />

      <div className='grid lg:grid-cols-2 mt-20 lg:mx-4'>
        <div className='hidden lg:block'>
          <DetailInfo data={sampleData} />
        </div>

        <div className='mb-8 lg:mb-0'>
          <Info />
        </div>

        <div className='block lg:hidden'>
          <DetailInfo data={sampleData} />
        </div>
      </div>

      <div className='pt-[60px] pb-[70px] bg-white lg:mx-4'>
        <h3 className='text-2xl sm:text-[32px] font-bold mb-8'>More like this</h3>

        <div className='flex justify-center items-center flex-wrap'>
          {truckData.map((truck, index) => (
            <div key={index}>
              <TruckCard images={truck?.images} title={truck?.title} price={truck?.price} location={truck?.location} miles={truck?.miles} />

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default DetailPage