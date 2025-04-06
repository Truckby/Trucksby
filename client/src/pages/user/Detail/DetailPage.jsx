import React from 'react'
import Info from './components/Info';
import DetailInfo from './components/DetailInfo';
import { FaSearch } from 'react-icons/fa';
import TruckCard from '../../common/home/components/TruckCard';

import cardImage from '../../../assets/images/card.svg'

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
      <div className='flex flex-col lg:flex-row justify-between items-center mt-9'>
        <div className="flex md:w-[587px]  rounded-[10px] items-center shadow">
          <input type="text" placeholder="Truck Make or Model" className="p-3 outline-none h-[60px] w-[100px] md:min-w-[250px] md:w-auto  rounded-l-[10px]" />
          <select className="p-3 w-full border-r h-[60px] outline-none border-l ">
            <option>All Cities</option>
          </select>
          <select className="p-3 w-full outline-none h-[60px]  ">
            <option>Price Range</option>
          </select>
          <button className="bg-[#DF0805] text-white p-5 rounded-r-[10px] flex items-center justify-center">
            <FaSearch fontSize={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full mt-4 lg:mt-0 md:w-[587px]">
          <input type="text" placeholder="Search for Trucks" className="p-3 outline-none h-[60px] w-full lg:w-[587px] shadow rounded-[10px]" />
          <span className='absolute top-5 right-5'>
            <FaSearch fontSize={20} color='#8E8E8E' />
          </span>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 mt-20'>
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

      <div className='pt-[60px] pb-[70px]'>
        <h3 className='text-[32px] font-bold'>More like this</h3>

        <div className='flex justify-between flex-wrap w-full'>
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