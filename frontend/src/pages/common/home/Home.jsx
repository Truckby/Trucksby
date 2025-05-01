import React, { useEffect } from 'react';
// import trick from '../../../assets/images/truck_image.png'
import trick from '../../../assets/videos/truck.mov'
import { FaSearch } from 'react-icons/fa';
import TypeTruck from '../../../assets/images/type.svg'
import TruckCard from './components/TruckCard';
import cardImage from '../../../assets/images/card.svg'
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import truckService from '../../../services/truckService';
import { useNavigate } from 'react-router';

const Home = () => {
  const [listData, setListData] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [searchCountry, setSearchCountry] = React.useState('');
  const [listingType, setListingType] = React.useState('');
  const [truckCategory, settruckCategory] = React.useState('');
  const dispatch = useDispatch();
  const params = new URLSearchParams();

  if (searchText) params.append('searchText', searchText);
  if (searchCountry) params.append('country', searchCountry);
  if (listingType) params.append('listingType', listingType);
  if (truckCategory) params.append('truckCategory', truckCategory);



  const navigate = useNavigate();

  const fetchAllTrucks = async () => {
    dispatch(ShowLoading());
    try {
      const response = await truckService.getAllTrucksWithFilter({});
      setListData(response.trucks);
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

  const truckCategoryData = [
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
    <div className='max-w-[1300px] lg:px-4 mx-auto'>
      <div className="flex flex-col lg:flex-row items-center justify-between ">
        <div className="flex lg:hidden lg:w-full">
          <video
            src={trick}
            className="w-full object-cover h-[350px] sm:h-[585px]"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* <img src={trick} alt="Truck" className="w-full object-cover h-[585px] " /> */}
        </div>

        {/* Left Section */}
        <div className="lg:w-1/2 space-y-4 mt-8 lg:mt-0 pr-4 px-4 lg:mr-0">
          <h1 className=" text-2xl sm:text-4xl md:text-[64px] md:leading-[61px] font-bold text-black " style={{ fontFamily: 'Oswald' }}>Drive Your <br /> Business Forward</h1>
          <h4 className=" text-lg md:text-2xl text-gray-600">Sell Trucks with Confidence!</h4>

          {/* Search Input */}
          <div className="relative mt-4 w-full xl:w-[587px]">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text" placeholder="Search for Trucks" className="p-3 outline-none h-[60px] w-full xl:w-[587px] shadow rounded-[10px]" />
            <span
              onClick={() => {
                const newParams = new URLSearchParams();
                if (searchText) newParams.set('searchText', searchText);
                if (searchCountry) newParams.set('country', searchCountry);
                if (listingType) newParams.set('listingType', listingType);
                if (truckCategory) newParams.set('truckCategory', truckCategory);
                navigate(`/user/filter?${newParams.toString()}`);
              }}
              className='absolute top-1.5 right-5 cursor-pointer p-3'
            >
              <FaSearch fontSize={20} color='#8E8E8E' />
            </span>

          </div>

          {/* Search Filters */}
          <div className="flex w-full xl:w-[587px] flex-nowrap rounded-[10px] items-center mt-6 shadow">
            {/* <input type="text" placeholder="Truck Make or Model" className="p-3 outline-none h-[60px] w-[100px] md:min-w-[250px] md:w-auto  rounded-l-[10px]" /> */}
            <select
              className="p-3 w-full lg:w-[130px] border-r border-[#F6F6F6] h-[60px] outline-none border-l"
              value={listingType}
              onChange={(e) => setListingType(e.target.value)}
            >
              <option value={''}>Listing Type</option>
              <option value={'For Sale'}>For Sale</option>
              <option value={'For Lease'}>For Lease</option>
              <option value={'For Auction'}>For Auction</option>
            </select>




            <select
              className="p-3 w-full lg:w-[150px] outline-none h-[60px]"
              value={truckCategory}
              onChange={(e) => settruckCategory(e.target.value)}
            >
              <option value="">Truck Category</option>
              {truckCategoryData.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>


            <CountryDropdown
              defaultOptionLabel="All Countries"
              value={searchCountry}
              onChange={(val) => setSearchCountry(val)}
              className='p-3 outline-none h-[60px] w-[100px] md:min-w-[250px] md:w-auto  rounded-l-[10px]'
            />

            <button
              className="bg-[#DF0805] cursor-pointer text-white p-5 rounded-r-[10px] flex items-center justify-center"
              onClick={() => {
                const newParams = new URLSearchParams();
                if (searchText) newParams.set('searchText', searchText);
                if (searchCountry) newParams.set('country', searchCountry);
                if (listingType) newParams.set('listingType', listingType);
                if (truckCategory) newParams.set('truckCategory', truckCategory);
                navigate(`/user/filter?${newParams.toString()}`);
              }}
            >
              <FaSearch fontSize={20} />
            </button>


          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden lg:flex lg:w-1/2">
          {/* <img src={trick} alt="Truck" className="w-full object-cover h-[585px] " /> */}
          <video
            src={trick}
            className="w-full object-cover h-[585px]"
            autoPlay
            muted
            loop
            playsInline
          />

        </div>


      </div>

      <div className='pt-[60px] pb-[70px] px-4'>
        <h3 className=' text-2xl sm:text-[32px] font-bold'>Feature Categories</h3>

        <div className='flex justify-center sm:justify-start items-center flex-wrap'>
          {truckCategoryData.map((truck, index) => (
            <div
              onClick={() => {
                const newParams = new URLSearchParams();
                if (searchText) newParams.set('searchText', searchText);
                if (searchCountry) newParams.set('country', searchCountry);
                if (listingType) newParams.set('listingType', listingType);
                newParams.set('truckCategory', truck); // `truck` here is valid from map()
                navigate(`/user/filter?${newParams.toString()}`);
              }}

              key={index}
              className='w-[188px] m-2 h-[218px] mt-8 rounded-[20px] bg-white flex flex-col justify-center items-center hover:shadow-md  transition-shadow cursor-pointer'
            >
              <img src={TypeTruck} alt={truck} className='w-[145px] h-[100px] object-contain' />
              <span className="text-lg sm:text-xl font-semibold pt-9 text-center">
                {truck}
              </span>

            </div>
          ))}

        </div>
      </div>


      <div className='pt-[60px] pb-[70px] bg-white px-4 lg:px-0'>
        <h3 className=' text-2xl sm:text-[32px] font-bold mb-8  '>Browse by Type</h3>

        <div className='flex justify-center sm:justify-start items-center flex-wrap'>
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
    </div>
  );
};

export default Home;
