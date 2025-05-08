import React, { useEffect, useState } from 'react'
import TruckCard from './components/TruckCard'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux';
import truckService from '../../../services/truckService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import ExpirePlan from './components/expirePlan';
import DeleteConfirmationModal from '../../../components/Delete/DeleteConfirmationModal';
import subscriptionService from '../../../services/subscriptionService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Listing = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTruckId, setDeleteTruckId] = useState(null)
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const [info, setInfo] = useState({
    status: false,
    planName: '',
    productId: '',
    subscriptionId: '',
    amount: null
  })


  const fetchAllTrucks = async (currentPage = 1) => {
    dispatch(ShowLoading());
    try {
      const response = await truckService.getAllTrucksByUser(currentPage, limit);
      setListData(response.data);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      dispatch(HideLoading());
    }
  };
  console.log(listData, 'listData')

  useEffect(() => {
    fetchAllTrucks(page)
  }, [page])

  const handleDeleteClick = (id) => {
    setDeleteTruckId(id)
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTruckId) return;
    console.log(deleteTruckId)
    dispatch(ShowLoading());
    try {
      await truckService.deleteTruck(deleteTruckId);
      setListData((listData) => listData.filter(list => list._id !== deleteTruckId));
      toast.success("Service deleted successfully");
      await fetchAllTrucks(page);
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      dispatch(HideLoading());
      setDeleteOpen(false);
    }
  };

  useEffect(() => {
    const getSubscriptionInfo = async () => {
      dispatch(ShowLoading());
      try {
        const response = await subscriptionService.getUserSubscriptionInfo();
        if (response.info) {
          setInfo(response.info);
        }


      } catch (error) {
        message.error(error.response.data.error);
      } finally {
        dispatch(HideLoading());
      }
    };

    getSubscriptionInfo();
  }, []);

  const isLimitExceeded = () => {
    if (info.planName === 'Basic Membership' && listData.length >= 3) {
      toast.error("You can only add up to 3 trucks on Basic Membership");
      return true;
    }
    if (info.planName === 'Premium Membership' && listData.length >= 5) {
      toast.error("You can only add up to 5 trucks on Premium Membership");
      return true;
    }
    return false;
  };


  return (
    <div className='max-w-[993px] mx-auto md:pt-10 px-4'>

      <div className='flex justify-between items-center'>
        <h3 className='text-[24px] sm:text-[32px] font-bold my-10'>My Listings</h3>

        {info.status ? (
          <button
            onClick={() => {
              if (!isLimitExceeded()) navigate("/seller/add-truck");
            }}
            className="px-4 py-2 h-fit bg-[#DF0805] text-white font-medium rounded-lg"
          >
            Add Truck
          </button>
        ) : (
          <Link
            to="/plans"
            className="px-4 py-2 h-fit bg-[#DF0805] text-white font-medium rounded-lg"
          >
            Add Truck
          </Link>
        )}


      </div>

      {listData?.map((data, index) => (
        <div key={index} className='mt-4'>
          <TruckCard data={data} handleDeleteClick={handleDeleteClick} />
        </div>
      ))}

      {listData?.length > 0 &&
        <div className="flex justify-center items-center gap-4 my-6 mb-10">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
          >
            Next
          </button>
        </div>
      }

     {info.subscriptionId !== '' && !info.status && <ExpirePlan />}


      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => handleConfirmDelete()}
      />
    </div>
  )
}

export default Listing