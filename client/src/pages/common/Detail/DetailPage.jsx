import { Carousel } from 'react-responsive-carousel';
import { formatNumberWithCommas, formatPhoneNumber } from '../../../utils/extra';
import DetailInfo from './components/DetailInfo';
import Info from './components/Info';
import { useLocation, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../../redux/loaderSlice';
import truckService from '../../../services/truckService';
import ReactGA from "react-ga4";

const DetailPage = () => {

  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(location?.state || {});
  const dispatch = useDispatch();

  useEffect(() => {
    const VITE_ENV = import.meta.env.VITE_ENV;
    if (VITE_ENV === "production") {
      ReactGA.send({ hitType: "pageview", page: "/detail", title: "Detail Page" });
    }
  }, []);

  useEffect(() => {
    if (!location?.state && id) {
      const fetchData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await truckService.getTruckById(id);
          setData(response);
        } catch (err) {
          console.error("Error fetching truck:", err);
        } finally {
          dispatch(HideLoading());
        }
      };
      fetchData();
    }
  }, [id, location?.state]);


  const sampleData = {
    General: {
      'Equipment Category': data?.truckCategory,
      'Equipment Subcategory': data?.truckSubCategory,
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
      phone: formatPhoneNumber(data?.phone),
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
    Description: {
      "Description": data?.description
    }
  };

  return (
    <div className='pb-10 max-w-[1300px] mx-auto px-4 pt-10 lg:pt-20 lg:px-0'>

      <div className='block lg:hidden'>
        {data?.images?.length > 0 && (
          <Carousel showThumbs={false} infiniteLoop autoPlay>
            {data?.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`image - ${index + 1}`}
                  className="w-auto h-[300px] sm:h-[465px] object-cover rounded-[15px]"
                />
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className='grid lg:grid-cols-2 lg:mx-4'>
        <div className='hidden lg:block'>
          <DetailInfo data={sampleData} images={data?.images} />
        </div>

        <div className='mb-8 lg:mb-0'>
          <Info data={data} />
        </div>

        <div className='block lg:hidden'>
          <DetailInfo data={sampleData} images={data?.images} />
        </div>
      </div>
    </div>
  )
}

export default DetailPage