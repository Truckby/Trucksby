'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import FilterComponent from './components/FilterComponent'
import cardImage from '../../../assets/images/card.svg'
import { IoMdClose } from 'react-icons/io'
import TruckCard from './components/TruckCard'
import SearchFilter from '../../../components/SearchFilter'
import truckService from '../../../services/truckService'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'

const FilterPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [listData, setListData] = useState([])
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchText, country, listingType, truckType } = location.state || {};
    const [searchTextFilter, setSearchText] = React.useState(searchText || '');
  
  const [searchCountry, setSearchCountry] = React.useState(country || '');
  const [listingTypeFilter, setListingType] = React.useState(listingType || '');
  const [truckTypeFilter, setTruckType] = React.useState(truckType || '');
  const [pagination, setPagination] = useState({ totalPages: 0, totalCount: 0, currentPage: 1 });

    const [filters, setFilters] = useState({
      listingType: '',
      truckCategory: '',
      manufacturer: '',
      minYear: '',
      maxYear: '',
      minMileage: '',
      maxMileage: '',
      engineManufacturer: '',
      minHorsepower: '',
      maxHorsepower: '',
      minWheelbase: '',
      maxWheelbase: '',
      suspension: '',
      rearAxles: '',
      minFrontAxleWeight: '',
      maxFrontAxleWeight: '',
      minBackAxleWeight: '',
      maxBackAxleWeight: '',
      transmission: '',
      speeds: '',
      condition: '',
      country: ''
    });

    const fetchTrucks = useCallback(async (pageIndex = 1) => {
      dispatch(ShowLoading());
      try {
        const combinedFilters = {
          ...filters,
          searchText: searchTextFilter,
          country: searchCountry,
          listingType: listingTypeFilter,
          truckCategory: truckTypeFilter,
          pageIndex,
        };
    
        const response = await truckService.getAllTrucksWithFilter(combinedFilters);
        setListData(response.trucks || []);
        setPagination({
          totalPages: response.totalPages || 0,
          totalCount: response.totalCount || 0,
          currentPage: pageIndex
        });
      } catch (error) {
        console.error("Error fetching trucks:", error);
      } finally {
        dispatch(HideLoading());
      }
    }, [filters, searchTextFilter, searchCountry, listingTypeFilter, truckTypeFilter, dispatch]);
    
    // Initial data fetch
    useEffect(() => {
      fetchTrucks();
    }, [fetchTrucks]);
    
    // Handle filter changes from the filter component
    const handleFilterChange = useCallback((newFilters) => {
      setFilters(newFilters);
    }, []);
    
    // Handle search form submission
    const handleSearchSubmit = useCallback(() => {
      fetchTrucks(1);
    }, [fetchTrucks]);
    
    // Handle pagination
    const handlePageChange = useCallback((newPage) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        fetchTrucks(newPage);
      }
    }, [fetchTrucks, pagination.totalPages]);

  // Get location name for title
  const getLocationName = () => {
    if (searchCountry) {
      return searchCountry;
    }
    return "California"; // Default location or get from somewhere else
  };

  return (
    <div className='pb-20 max-w-[1340px] mx-auto '>
      <SearchFilter searchCountry={searchCountry} setSearchCountry={setSearchCountry} listingType={listingTypeFilter} setListingType={setListingType} truckType={truckTypeFilter} setTruckType={setTruckType} searchText={searchTextFilter} setSearchText={setSearchText} />

      <h1 className=' text-2xl sm:text-[32px] font-bold mt-[50px] mb-[40px] lg:mx-4'>Trucks for sale in California</h1>

      <div className="flex flex-col md:flex-row lg:mx-4">
        <div className="hidden md:block">
          <FilterComponent  onFilterChange={handleFilterChange} filters={filters} setFilters={setFilters} />
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
            <FilterComponent  onFilterChange={handleFilterChange} filters={filters} setFilters={setFilters} />
          </div>
        )}

        {/* Truck cards container */}
        <div className=" flex justify-start items-center flex-wrap h-fit">
          {listData?.map((truck, index) => (
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