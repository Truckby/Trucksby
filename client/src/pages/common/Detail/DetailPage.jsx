import { formatNumberWithCommas } from '../../../utils/extra';
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
      'Make': data?.vehicleManufacturer,
      Model: data?.model,
      'Unit Number': data?.unitNumber,
      Mileage: formatNumberWithCommas(data?.mileage),
      VIN: data?.vin,
      Condition: data?.condition,
      Hours: formatNumberWithCommas(data?.hours),
    },
    "Contact Information": {
      name: data?.name,
      phone: data?.phone,
      address: data?.address,
      'Company Name': data?.companyName,
    },
    "Vehicle Info": {
      Wheelbase: data?.wheelbase,
      Steering: data?.steering,
      Color: data?.color,
      Suspension: data?.suspension,
      'Engine Model': data?.engineModel,
      "Engine Manufacturer": data?.engineManufacturer,
      "Engine Model": data?.engineModel,
      "Engine Horsepower": formatNumberWithCommas(data?.hoursPower),
    },
    Powertrain: {
      "Transmission Manufacturer": data?.transmissionManufacturer,
      "Transmission Type": data?.transmissionType,
      'no of Speeds': data?.noofSpeeds,
    },
    Chassis: {
      "Front Axle Weight": formatNumberWithCommas(data?.frontAxleWeight),
      "Rear Axle Weight": formatNumberWithCommas(data?.backAxleWeight),
      'Gross Vehicle Weight': formatNumberWithCommas(data?.grossVehicleWeight),
      'Axle': data?.typeofRearAxles,
    },
  };

  console.log(sampleData, 'sampleData');

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