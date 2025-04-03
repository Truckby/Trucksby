import React from 'react';
import trick from '../../../assets/images/truck_image.png'
import { FaSearch } from 'react-icons/fa';
import TypeTruck from '../../../assets/images/type.svg'
import TruckCard from './components/TruckCard';
import cardImage from '../../../assets/images/card.svg'

const Home = () => {
  const truckTypes = [
    'Box Trucks',
    'Flatbed Trucks',
    'Refrigerated Trucks',
    'Tanker Trucks',
    'Dump Trucks',
    'Car Haulers',
    'Livestock Trucks',
    'Dry Vans',
    'Lowboy Trailers',
    'Container Chassis',
    'Auto Transporters',
    'Cement Mixers'
  ];

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
    <div className=''>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-[64px] leading-[61px] font-bold text-black " style={{ fontFamily: 'Oswald' }}>Drive Your <br /> Business Forward</h1>
          <h4 className="text-2xl text-gray-600">Sell Trucks with Confidence!</h4>

          {/* Search Filters */}
          <div className="flex w-[587px] flex-wrap md:flex-nowrap rounded-[10px] items-center mt-6 shadow">
            <input type="text" placeholder="Truck Make or Model" className="p-3 outline-none h-[60px]  min-w-[250px] md:w-auto  rounded-l-[10px]" />
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
          <div className="relative mt-4 lg:w-[587px]">
            <input type="text" placeholder="Search for Trucks" className="p-3 outline-none h-[60px] lg:w-[587px] shadow rounded-[10px]" />
            <span className='absolute top-5 right-5'>
              <FaSearch fontSize={20} color='#8E8E8E' />
            </span>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="md:w-1/2">
          <img src={trick} alt="Truck" className="w-full object-cover h-[585px] " />
        </div>


      </div>

      <div className='pt-[60px] pb-[70px]'>
        <h3 className='text-[32px] font-bold'>Browse by Type</h3>

        <div className='flex justify-between flex-wrap'>
          {truckTypes.map((truck, index) => (
            <div
              key={index}
              className='w-[188px] h-[218px] mt-8 rounded-[20px] bg-white flex flex-col justify-center items-center hover:shadow-md  transition-shadow cursor-pointer'
            >
              <img src={TypeTruck} alt={truck} className='w-[145px] h-[100px] object-contain' />
              <span className='text-xl font-semibold pt-9'>{truck}</span>
            </div>
          ))}

        </div>
      </div>


      <div className='pt-[60px] pb-[70px]'>
        <h3 className='text-[32px] font-bold'>Browse by Type</h3>

        <div className='flex justify-between flex-wrap'>
          {truckData.map((truck, index) => (
            <div key={index}>
              <TruckCard images={truck?.images} title={truck?.title} price={truck?.price} location={truck?.location} miles={truck?.miles} />

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Home;
