const Truck = require("../models/truckModel");

const getAllTrucks = async (userId) => {
  return await Truck.find();
};

const getTruckById = async (id) => {
  return await Truck.findById(id);
};

const createTruck = async (data) => {
  const truck = new Truck(data);
  return await truck.save();
};

const updateTruck = async (id, data) => {
  return await Truck.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

const deleteTruck = async (id) => {
  return await Truck.findByIdAndDelete(id);
};

module.exports = {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
};
