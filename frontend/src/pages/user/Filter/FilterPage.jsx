'use client'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import FilterComponent from './components/FilterComponent'
import cardImage from '../../../assets/images/card.svg'
import { IoMdClose } from 'react-icons/io'
import TruckCard from './components/TruckCard'
import SearchFilter from '../../../components/SearchFilter'
import truckService from '../../../services/truckService'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
import { useDispatch } from 'react-redux'

const FilterPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [listData, setListData] = useState([])
  const dispatch = useDispatch();


  const fetchAllTrucks = async () => {
    dispatch(ShowLoading());
    try {
      const response = await truckService.getAllTrucksWithFilter();
      setListData(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }
  };
  console.log(listData, 'listData')

  useEffect(() => {
    fetchAllTrucks()
  }, [])

  return (
    <div className='pb-20 max-w-[1340px] mx-auto '>
      <SearchFilter />

      <h1 className=' text-2xl sm:text-[32px] font-bold mt-[50px] mb-[40px] lg:mx-4'>Trucks for sale in California</h1>

      <div className="flex flex-col md:flex-row lg:mx-4">
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
        <div className=" flex justify-start items-center flex-wrap h-fit">
          {listData.map((truck, index) => (
            <div className='' key={index}>
              <TruckCard
                images={truck?.images}
                title={truck?.vehicleName}
                price={truck?.vehiclePrice}
                location={truck?.country}
                miles={truck?.mileage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterPage