import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSpeedometer } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import fallback from "../../../../assets/images/card.svg";
import { useNavigate } from "react-router";
import { formatNumberWithCommas } from "../../../../utils/extra";

export default function InventoryTruckCard({ data }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-lg border shadow-sm flex flex-col overflow-hidden">
            <div className="h-[200px]">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    swipeable
                    emulateTouch
                    className="h-full"
                >
                    {(data?.images?.length ? data.images : [fallback]).map(
                        (src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Truck image ${idx + 1}`}
                                className="w-full h-[200px] object-cover"
                                /* allow clicking the image to open details, like the button */
                                onClick={() => navigate(`/detail/${data._id}`, { state: data })}
                            />
                        )
                    )}
                </Carousel>
            </div>

            {/* Truck Details */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h2 className="text-base font-semibold mb-1 truncate">
                    {data?.vehicleName?.toUpperCase()}
                </h2>

                <p className="text-[#DF0805] font-semibold text-sm">
                    {data?.vehiclePrice === 0
                        ? "Contact for Price"
                        : `$${formatNumberWithCommas(data.vehiclePrice)}`}
                </p>

                <div className="text-sm text-gray-700 mt-2 space-y-1">
                    {data?.country && (
                        <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-base" />
                            <span>{data.country}</span>
                        </div>
                    )}
                    {data?.mileage !== null && (
                        <p className="flex items-center gap-3">
                            <IoSpeedometer />{" "}
                            {data?.mileage == 0 ?
                                <span>N/A</span>
                                :
                                <span>{formatNumberWithCommas(data.mileage)} Miles</span>
                            }
                        </p>
                    )}
                </div>

                <button
                    onClick={() => navigate(`/detail/${data._id}`, { state: data })}
                    className="mt-4 bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800 transition cursor-pointer"
                >
                    View
                </button>
            </div>
        </div>
    );
}
