import React, { use, useEffect, useState } from 'react';
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

    const fetchAllTrucks = async () => {
      dispatch(ShowLoading());
      try {
        const response = await truckService.getAllTrucks();
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

        <div className='flex justify-center items-center flex-wrap'>
          {truckData.map((truck, index) => (
            <div key={index}>
              <TruckCard data={truck} images={truck?.images} title={truck?.title} price={truck?.price} location={truck?.location} miles={truck?.miles} />

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default DetailPage