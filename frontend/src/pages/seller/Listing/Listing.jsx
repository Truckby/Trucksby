import React from 'react'
import TruckCard from './components/TruckCard'
import { Link } from 'react-router'

const Listing = () => {
  return (
    <div className='max-w-[993px] mx-auto md:pt-10 '>

      <div className='flex justify-between items-center'>
        <h3 className='text-[24px] sm:text-[32px] font-bold my-10'>My Listings</h3>

        <Link
          to="/seller/add-truck"
          className="px-4 py-2 h-fit bg-[#DF0805] text-white font-medium rounded-lg"
        >
          Add Truck
        </Link>

      </div>
      <TruckCard />
    </div>
  )
}

export default Listing