'use client'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import FilterComponent from './components/FilterComponent'
import cardImage from '../../../assets/images/card.svg'
import { IoMdClose } from 'react-icons/io'
import TruckCard from './components/TruckCard'

const FilterPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    <div className='pb-20 max-w-[1300px] mx-auto '>
      <div className='flex flex-col lg:flex-row justify-between items-center mt-9 lg:mx-4'>
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

      <h1 className='text-[32px] font-bold mt-[50px] mb-[40px]'>Trucks for sale in California</h1>

      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block">
          <FilterComponent />
        </div>

        <div className="md:hidden pb-4">
          <button
            className="bg-[#DF0805] text-white px-4 py-2 rounded"
            onClick={() => setIsDrawerOpen(true)}
          >
            Filters
          </button>
        </div>

        {/* Drawer for mobile filters */}
        {isDrawerOpen && (
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 transition-transform transform md:hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                className="text-red-500 font-bold"
                onClick={() => setIsDrawerOpen(false)}
              >
                <IoMdClose />
              </button>
            </div>
            <FilterComponent />
          </div>
        )}

        {/* Truck cards container */}
        <div className=" flex justify-center items-center flex-wrap">
          {truckData.map((truck, index) => (
            <div className='' key={index}>
              <TruckCard
                images={truck?.images}
                title={truck?.title}
                price={truck?.price}
                location={truck?.location}
                miles={truck?.miles}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterPage