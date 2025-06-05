import DetailInfo from './components/DetailInfo';
import Info from './components/Info';
import { useLocation } from 'react-router';

const DetailPage = () => {

  const location = useLocation();
  const data = location?.state || {};

  const sampleData = {
    General: {
      'Equipment Category': data?.truckCategory,
      'Equipment SubCategory': data?.truckSubCategory,
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
      'Type of Axle': data?.typeofRearAxles,

    },
  };

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
          <DetailInfo data={sampleData} images={data.images} />
        </div>
      </div>
    </div>
  )
}

export default DetailPage