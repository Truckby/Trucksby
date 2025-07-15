import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import image from "../../../../assets/images/card.svg";
import { useNavigate } from "react-router";
import { formatNumberWithCommas } from "../../../../utils/extra";

export default function InventoryTruckCard({ data, handleDeleteClick }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg border shadow-sm flex flex-col overflow-hidden transition-transform hover:scale-[1.01] cursor-pointer">
            {/* Truck Image */}
            <img
                src={data?.images[0] || image}
                alt="Truck"
                className="w-full h-[200px] object-cover"
            />

            {/* Truck Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                {/* Title */}
                <h2 className="text-base font-semibold mb-1 truncate">
                    {data?.vehicleName?.toUpperCase()}
                </h2>

                {/* Price */}
                <p className="text-[#DF0805] font-semibold text-sm">
                    {data?.vehiclePrice === 0
                        ? "CALL FOR PRICE"
                        : `$${formatNumberWithCommas(data?.vehiclePrice)}`}
                </p>

                {/* Location & Mileage */}
                <div className="text-sm text-gray-700 mt-2 space-y-1">
                    {data?.country && (
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-base" />
                            <span>{data.country}</span>
                        </div>
                    )}
                    {data?.mileage && (
                        <div className="flex items-center">
                            <IoSpeedometer className="mr-2 text-base" />
                            <span>{formatNumberWithCommas(data.mileage)} Miles</span>
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex flex-col gap-2">
                    <button
                        onClick={() => navigate("/detail", { state: data })}
                        className="bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition"
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}
