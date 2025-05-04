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
import { useSearchParams } from 'react-router-dom';


const FilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [listData, setListData] = useState([])
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 0, totalCount: 0, currentPage: 1 });




  const [filters, setFilters] = useState(() => {
    const params = Object.fromEntries([...searchParams]);
    return {
      listingType: params.listingType || '',
      truckCategory: params.truckCategory || '',
      country: params.country || '',
      searchText: params.searchText || '',
      transmissionManufacturer: params.transmissionManufacturer || '',
      minYear: params.minYear || '',
      maxYear: params.maxYear || '',
      minMileage: params.minMileage || '',
      maxMileage: params.maxMileage || '',
      engineManufacturer: params.engineManufacturer || '',
      minHorsepower: params.minHorsepower || '',
      maxHorsepower: params.maxHorsepower || '',
      minWheelbase: params.minWheelbase || '',
      maxWheelbase: params.maxWheelbase || '',
      suspension: params.suspension || '',
      rearAxles: params.rearAxles || '',
      minFrontAxleWeight: params.minFrontAxleWeight || '',
      maxFrontAxleWeight: params.maxFrontAxleWeight || '',
      minBackAxleWeight: params.minBackAxleWeight || '',
      maxBackAxleWeight: params.maxBackAxleWeight || '',
      transmissionType: params.transmissionType || '',
      noofSpeeds: params.noofSpeeds || '',
      condition: params.condition || '',
      vehicleManufacturer: params.vehicleManufacturer || '',
    };
  });


  const fetchTrucks = useCallback(async (pageIndex = 1) => {
    dispatch(ShowLoading());
    try {
      const combinedFilters = {
        ...filters,
        pageIndex,
      };
      const filteredParams = Object.fromEntries(
        Object.entries({
          ...filters,
          pageIndex,
        }).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
      );

      // Set only filtered search params
      setSearchParams(filteredParams, { replace: true });
      console.log(combinedFilters, 'combinedFilters')

      const response = await truckService.getAllTrucksWithFilter(combinedFilters);
      setListData(response?.trucks || []);
      setPagination({
        totalPages: response.totalPages || 0,
        totalCount: response.totalCount || 0,
        currentPage: pageIndex
      });
      setPage(pageIndex);
    } catch (error) {
      console.error("Error fetching trucks:", error);
    } finally {
      dispatch(HideLoading());
    }
  }, [filters, dispatch]);


  useEffect(() => {
    fetchTrucks(1);
  }, [fetchTrucks]);




  // Handle filter changes from the filter component
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  // Handle search form submission
  const handleSearchSubmit = useCallback(() => {
    fetchTrucks(1);
  }, [fetchTrucks]);

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

  const updateSearchParams = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    const filteredParams = Object.fromEntries(
      Object.entries(updated).filter(([_, val]) => val !== '' && val !== undefined)
    );
    setSearchParams(filteredParams, { replace: true });
    setFilters(updated);
  };

  return (
    <div className='pb-20 max-w-[1340px] mx-auto px-4 lg:px-0'>
      <SearchFilter filters={filters} setFilters={setFilters} />

      <h1 className=' text-2xl sm:text-[32px] font-bold mt-[50px] mb-[40px] lg:mx-4'>Trucks For Sale</h1>

      <div className="flex flex-col md:flex-row lg:mx-4">
        <div className="hidden md:block">
          <FilterComponent onFilterChange={handleFilterChange} filters={filters} setFilters={setFilters} />
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
            <FilterComponent onFilterChange={handleFilterChange} filters={filters} setFilters={setFilters} />
          </div>
        )}

        {/* Truck cards container */}
        <div className=" flex justify-center sm:justify-start items-center flex-wrap h-fit">
          {listData?.map((truck, index) => (
            <div className='' key={index}>
              <TruckCard
                images={truck?.images}
                title={truck?.vehicleName}
                price={truck?.vehiclePrice}
                location={truck?.country}
                miles={truck?.mileage}
                data={truck}
              />
            </div>
          ))}
        </div>


      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pagination.totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
        >
          Next
        </button>
      </div>

    </div>
  )
}

export default FilterPage