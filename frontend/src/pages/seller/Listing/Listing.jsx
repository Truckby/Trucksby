import React, { useEffect, useState } from 'react'
import TruckCard from './components/TruckCard'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux';
import truckService from '../../../services/truckService';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import ExpirePlan from './components/expirePlan';
import DeleteConfirmationModal from '../../../components/Delete/DeleteConfirmationModal';

const Listing = () => {
  const dispatch = useDispatch();
  const [listData, setListData] = useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTruckId, setDeleteTruckId] = useState(null)

  const fetchAllTrucks = async () => {
    dispatch(ShowLoading());
    try {
      const response = await truckService.getAllTrucks();
      setListData(response);
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
      onLoad()
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      dispatch(HideLoading());
      setDeleteOpen(false);
    }
  };

  return (
    <div className='max-w-[993px] mx-auto md:pt-10 '>

      <div className='flex justify-between items-center'>
        <h3 className='text-[24px] sm:text-[32px] font-bold my-10'>My Listings</h3>

        <Link
          to="/seller/add-truck"
          className="px-4 py-2 h-fit bg-[#DF0805] text-white font-medium rounded-lg"
        >
          Add Truck
        </Link>

      </div>

      {listData.map((data, index) => (
        <div key={index} className='mt-4'>
          <TruckCard data={data} handleDeleteClick={handleDeleteClick} />
        </div>
      ))}

      <div>
        <ExpirePlan />
      </div>

      <DeleteConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => handleConfirmDelete()}
      />
    </div>
  )
}

export default Listing