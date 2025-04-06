import React from 'react'
import TruckCard from './components/TruckCard'

const Listing = () => {
  return (
    <div className='max-w-[993px] mx-auto md:pt-10 '>

      <h3 className='text-[24px] sm:text-[32px] font-bold my-10'>My Listings</h3>


      <TruckCard />
    </div>
  )
}

export default Listing