const truckService = require('../services/truckService');

const fetchAllTrucks = async (req, res, next) => {
  try {
    console.log(req.user,'req.user')
    const trucks = await truckService.getAllTrucks(req.user);
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
    const newTruck = await truckService.createTruck(req.body);
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
    const deletedTruck = await truckService.deleteTruck(req.params.truckId);
    if (!deletedTruck) return res.status(404).json({ message: 'Truck not found' });
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
