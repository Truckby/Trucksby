import React, { use, useCallback, useEffect, useState } from 'react';
import TruckCard from '../../common/home/components/TruckCard';
import DetailInfo from './components/DetailInfo';
import Info from './components/Info';
import cardImage from '../../../assets/images/card.svg';
import { useLocation } from 'react-router';
import truckService from '../../../services/truckService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { useDispatch } from 'react-redux';

const DetailPage = () => {

  const location = useLocation();
  const data = location?.state || {};
  console.log(data, 'data');
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ totalPages: 0, totalCount: 0, currentPage: 1 });

  const sampleData = {
    General: {
      'Truck Category': data?.truckCategory,
      'Truck SubCategory': data?.truckSubCategory,
      'Listing Type': data?.listingType,
      'Country': data?.country,
      Year: data?.modelYear,
      'Vehicle Manufacturer': data?.vehicleManufacturer,
      Model: data?.engineModel,
      Mileage: data?.mileage,
      VIN: data?.vin,
      Condition: data?.condition,
    },
    "Personal Info": {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      address: data?.address,
      'Company Name': data?.companyName,
    },
    "Vehicle Info": {
      Wheelbase: data?.wheelbase,
      Steering: data?.steering,
      Color: data?.color,
      Suspension: data?.suspension,
      "Engine Manufacturer": data?.engineManufacturer,
      "Engine Model": data?.engineModel,
      "Engine Horsepower": data?.hoursPower,
    },
    Powertrain: {
      "Transmission Manufacturer": data?.transmissionManufacturer,
      "Transmission Type": data?.transmissionType,
      'no of Speeds': data?.noofSpeeds,
    },
    Chassis: {
      "Front Axle Weight": data?.frontAxleWeight,
      "Back Axle Weight": data?.backAxleWeight,
      'Gross Vehicle Weight': data?.grossVehicleWeight,
      'Type of Rear Axles': data?.typeofRearAxles,

    },
  };

  const fetchAllTrucks = async (pageIndex = 1) => {
    dispatch(ShowLoading());
    try {
      const response = await truckService.getAllTrucksWithFilter({ pageIndex, limit: 8 });
      setListData(response?.trucks);
      setPagination({
        totalPages: response.totalPages || 0,
        totalCount: response.totalCount || 0,
        currentPage: pageIndex
      });
      setPage(pageIndex);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }
  };
  console.log(listData, 'listData22')

  useEffect(() => {
    fetchAllTrucks()
  }, [])

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchAllTrucks(newPage);
    }
  }, [fetchAllTrucks, pagination.totalPages]);

  return (
    <div className='pb-10 max-w-[1300px] mx-auto px-4 lg:px-0'>

      <div className='grid lg:grid-cols-2 mt-20 lg:mx-4'>
        <div className='hidden lg:block'>
          <DetailInfo data={sampleData} images={data.images} />
        </div>

        <div className='mb-8 lg:mb-0'>
          <Info data={data} />
        </div>

        <div className='block lg:hidden'>
          <DetailInfo data={sampleData} />
        </div>
      </div>

      <div className='pt-[60px] pb-[70px] bg-white lg:mx-4'>
        <h3 className='text-2xl sm:text-[32px] font-bold mb-8'>More like this</h3>

        <div className='flex justify-center sm:justify-start items-center flex-wrap'>
          {listData.map((truck, index) => (
            <div key={index}>
              <TruckCard data={truck} images={truck?.images} title={truck?.vehicleName} price={truck?.vehiclePrice} location={truck?.country} miles={truck?.mileage} />

            </div>
          ))}

        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  )
}

export default DetailPage