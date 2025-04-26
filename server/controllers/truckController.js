const truckService = require('../services/truckService');

const fetchAllTrucks = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const trucks = await truckService.getAllTrucks(userId);
    res.status(200).json(trucks);
  } catch (error) {
    next(error);
  }
};

const fetchTruckById = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckById(req.params.truckId);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.status(200).json(truck);
  } catch (error) {
    next(error);
  }
};

const addTruck = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const data = {
      ...req.body,
      userId
    }; 
    const newTruck = await truckService.createTruck(data);
    res.status(201).json({ message: 'Truck added successfully', truck: newTruck });
  } catch (error) {
    next(error);
  }
};

const updateTruck = async (req, res, next) => {
  try {
    const updatedTruck = await truckService.updateTruck(req.params.truckId, req.body);
    if (!updatedTruck) return res.status(404).json({ message: 'Truck not found' });
    res.status(200).json({ message: 'Truck updated successfully', truck: updatedTruck });
  } catch (error) {
    next(error);
  }
};

const deleteTruck = async (req, res, next) => {
  try {
    const deletedTruck = await truckService.deleteTruck(req.params.id);
    if (!deletedTruck) return res.status(500).json({ message: 'Truck not found' });
    res.status(200).json({ message: 'Truck deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchAllTrucks,
  fetchTruckById,
  addTruck,
  updateTruck,
  deleteTruck,
};
