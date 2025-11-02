import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCopy } from 'react-icons/io';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../../redux/loaderSlice';
import truckService from '../../../services/truckService';
import { formatPhoneNumber } from '../../../utils/extra';
import InventoryTruckCard from './components/InventoryTruckCard';
import InventoryFallback from './components/InventoryFallback';
import ReactGA from "react-ga4";

const Inventory = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();

    const [sellerInfo, setSellerInfo] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const isValidUserId = /^[0-9a-fA-F]{24}$/.test(userId);

    useEffect(() => {
        const VITE_ENV = import.meta.env.VITE_ENV;
        if (VITE_ENV === "production") {
            ReactGA.send({ hitType: "pageview", page: "/inventory", title: "Inventory Page" });
        }
    }, []);

    useEffect(() => {
        if (userId && isValidUserId) {
            fetchInventory();
        }
    }, [userId, page]);



    const fetchInventory = async (currentPage = 1) => {
        try {
            dispatch(ShowLoading());
            const { user, trucks, totalPages } = await truckService.getUserInventory(userId, currentPage);
            setSellerInfo({
                id: user._id,
                name: user.companyName || user.name,
                address: `${user.city}, ${user.country === 'United States' ? user.state + "," : ''} ${user.country}`,
                phone: user?.phone,
                companyName: user?.companyName,
                contactName: user.name,
                image: user?.image,
            });
            setTrucks(trucks);
            setTotalPages(totalPages);
        } catch (error) {
            toast.error('Failed to load inventory');
            console.error('Inventory Fetch Error:', error);
        } finally {
            dispatch(HideLoading());
        }
    };


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            fetchInventory(newPage);
        }
    };


    const handleCopyLink = () => {
        const shareableLink = `${window.location.origin}/inventory/${sellerInfo.id}`;
        navigator.clipboard.writeText(shareableLink);
        toast.success('Shareable link copied to clipboard!');
    };


    if (!isValidUserId) {
        return <InventoryFallback />;
    }


    if (!sellerInfo) {
        return <div className="text-center py-10 text-gray-500">Loading seller information...</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-10">
            {/* Seller Info Card */}
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-start space-x-4">
                    <img src={sellerInfo?.image} alt="Seller Logo" className="w-20 h-20 object-contain rounded-md border border-gray-300" />
                    <div className="space-y-1 text-sm">
                        <h2 className="text-xl font-semibold">
                            {sellerInfo?.companyName?.toUpperCase()}
                        </h2>
                        <p>
                            <strong>Location:</strong>{" "}
                            {sellerInfo.address ? (
                                <span>{sellerInfo.address}</span>
                            ) : (
                                <span className="text-red-600">N/A</span>
                            )}
                        </p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            {sellerInfo.phone ? (
                                <span>{formatPhoneNumber(sellerInfo.phone)}</span>
                            ) : (
                                <span className="text-red-600">N/A</span>
                            )}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleCopyLink}
                    className="self-start md:self-auto bg-red-600 text-white px-5 py-2 rounded hover:bg-blue-700 flex items-center cursor-pointer"
                >
                    <IoMdCopy className="mr-2" />
                    Share Link
                </button>
            </div>

            {/* Truck Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trucks.map((truck, idx) => (
                    <InventoryTruckCard key={idx} data={truck} handleDeleteClick={() => { }} />
                ))}
            </div>

            <div className="flex justify-center gap-2 pt-6">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">{page} / {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Inventory;
