import React from 'react'
import { FaSearch } from 'react-icons/fa'
import FilterComponent from './components/FilterComponent'
import cardImage from '../../../assets/images/card.svg'
import TruckCard from '../../common/home/components/TruckCard'

const FilterPage = () => {
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
    <div className='pb-20'>
      <div className='flex justify-between items-center mt-9'>
        <div className="flex w-[587px] flex-wrap md:flex-nowrap rounded-[10px] items-center shadow">
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
        <div className="relative lg:w-[587px]">
          <input type="text" placeholder="Search for Trucks" className="p-3 outline-none h-[60px] lg:w-[587px] shadow rounded-[10px]" />
          <span className='absolute top-5 right-5'>
            <FaSearch fontSize={20} color='#8E8E8E' />
          </span>
        </div>
      </div>

      <h1 className='text-[32px] font-bold mt-[50px] mb-[40px]'>Trucks for sale in California</h1>

      <div className='flex'>
        <div>
          <FilterComponent />
        </div>

        <div className='flex justify-between flex-wrap '>
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

export default FilterPage