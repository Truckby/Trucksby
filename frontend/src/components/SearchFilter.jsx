import React from 'react'
import { CountryDropdown } from 'react-country-region-selector';
import { FaSearch } from 'react-icons/fa'

const SearchFilter = ({ searchCountry, setSearchCountry, listingType, setListingType, truckType, setTruckType ,searchText,setSearchText}) => {


    const truckCategory = [
        'Trucks',
        'Trailers',
        'Construction Equipment',
        'Logging Equipment',
        'Farm Equipment',
        'Aggregate and Mining Equipment',
        'Lifting Equipment',
        'Industrial Equipment',
        'RVs'
    ];

    return (
        <div>
            <div className='flex flex-col lg:flex-row justify-between items-center mt-9 lg:mx-4 gap-4'>
                <div className="flex sm:w-[587px]  rounded-[10px] items-center shadow">
                    {/* <input type="text" placeholder="Truck Make or Model" className="p-3 outline-none h-[60px] w-full sm:min-w-[250px] md:w-auto  rounded-l-[10px]" /> */}

                    <CountryDropdown
                        value={searchCountry}
                        onChange={(val) => setSearchCountry(val)}
                        className='p-3 outline-none h-[60px] w-full sm:min-w-[250px] md:w-auto  rounded-l-[10px]'
                    />
                    <select
                        value={listingType}
                        onChange={(e) => setListingType(e.target.value)}
                        className="p-3 w-full border-r h-[60px] outline-none border-l ">
                        <option value={''}>Select Type</option>
                        <option value={'For Sale'}>For Sale</option>
                        <option value={'For Lease'}>For Lease</option>
                        <option value={'For Auction'}>For Auction</option>
                    </select>

                    <select
                        value={truckType}
                        onChange={(e) => setTruckType(e.target.value)}
                        className="p-3 w-full outline-none h-[60px]  ">
                        <option value="">Select Truck Type</option>
                        {truckCategory.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>

                    <button className="bg-[#DF0805] text-white p-5 rounded-r-[10px] flex items-center justify-center">
                        <FaSearch fontSize={20} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="relative w-full mt-4 lg:mt-0 sm:w-[587px]">
                    <input value={searchText}
              onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search for Trucks" className="p-3 outline-none h-[60px] w-full lg:w-[587px] shadow rounded-[10px]" />
                    <span className='absolute top-5 right-5'>
                        <FaSearch fontSize={20} color='#8E8E8E' />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SearchFilter