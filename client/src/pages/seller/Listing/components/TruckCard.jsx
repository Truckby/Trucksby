import { FaMapMarkerAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import image from '../../../../assets/images/card.svg'
import { IoSpeedometer } from "react-icons/io5";
import { useNavigate } from "react-router";


export default function TruckCard({ data, handleDeleteClick }) {
  const navigate = useNavigate();

  return (
    <div className="flex md:flex-row flex-col bg-white shadow rounded-lg overflow-hidden">
      <img
        src={data?.images[0] || image}
        alt="Equipment"
        className=" w-full md:w-[255px] md:h-[230px] object-cover"
      />

      <div className="p-3 sm:p-[26px] flex flex-col w-full">
        <div className="flex md:flex-row flex-col md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">{data?.vehicleName}</h2>


          {/* <div className="flex mt-4 md:mt-0 items-center text-[12px]">
            <IoSpeedometer className="mr-1" />
            <span>200 Views</span>

            <IoSpeedometer className="mr-1 ml-3" />
            <span>150 Searched Views</span>
          </div> */}
        </div>

        <p className="text-[#DF0805] text-lg font-semibold mt-4">{data?.vehiclePrice} $</p>

        <div className="flex items-center  text-sm mt-4">
          {data?.country && <FaMapMarkerAlt className="mr-1" />}
          {data?.country && <span>{data?.country}</span>}
          {data?.mileage && (
            <>
              <span className="ml-[30px] mr-1">
                <IoSpeedometer />{" "}
              </span>
              <span>{data?.mileage} Miles</span>
            </>
          )}
        </div>


        <div className="flex mt-4">
          <button
            onClick={() => navigate('/seller/edit-truck', { state: data })}
            className="bg-[#DF0805] text-white w-[162px] h-[39px] cursor-pointer flex justify-center items-center rounded-md mr-3 hover:bg-[#BF0602] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            aria-label="Edit truck details"
          >
            Edit
          </button>
          <button onClick={() => handleDeleteClick(data._id)} className="border cursor-pointer w-[162px] h-[39px] rounded-md border-black">Delete</button>
        </div>
      </div>
    </div>
  );
}
