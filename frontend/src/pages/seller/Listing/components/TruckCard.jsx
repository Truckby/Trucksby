import { FaMapMarkerAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import image from '../../../../assets/images/card.svg'
import { IoSpeedometer } from "react-icons/io5";


export default function TruckCard({ data }) {
  return (
    <div className="flex md:flex-row flex-col bg-white shadow rounded-lg overflow-hidden">
      <img
        src={image}
        alt="Truck"
        className=" w-full md:w-[255px] object-cover"
      />

      <div className="p-3 sm:p-[26px] flex flex-col w-full">
        <div className="flex md:flex-row flex-col md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">{data?.modelYear} {data?.vehicleName}</h2>


          <div className="flex mt-4 md:mt-0 items-center text-[12px]">
            <IoSpeedometer className="mr-1" />
            <span>200 Views</span>

            <IoSpeedometer className="mr-1 ml-3" />
            <span>150 Searched Views</span>
          </div>
        </div>

        <p className="text-[#DF0805] text-lg font-semibold mt-4">50,000 $</p>

        <div className="flex items-center  text-sm mt-4">
          <FaMapMarkerAlt className="mr-1" />
          <span>{data?.location}</span>
          <span className="ml-[30px] mr-1"><IoSpeedometer /> </span>
          <span>{data?.mileage} Miles</span>
        </div>


        <div className="flex mt-4">
          <button className="bg-black text-white w-[162px] h-[39px] flex justify-center items-center rounded-md mr-3">Edit</button>
          <button className="border w-[162px] h-[39px] rounded-md border-black">Delete</button>
        </div>
      </div>
    </div>
  );
}
