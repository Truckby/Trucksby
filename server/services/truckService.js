const Subscription = require("../models/subscriptionModel");
const Truck = require("../models/truckModel");

const getAllTrucks = async (userId, skip, limit) => {
  const [trucks, total] = await Promise.all([
    Truck.find({ userId }).skip(skip).limit(limit),
    Truck.countDocuments({ userId }),
  ]);

  return { trucks, total };
};

const getUserTrucks = async (userId) => {
  const [trucks, total] = await Promise.all([
    Truck.find({ userId }),
    Truck.countDocuments({ userId }),
  ]);

  return { trucks, total };
};


const getAllTrucksWithFilter = async (filters = {}) => {
  let query = {};

  // Apply search query (name)
  if (filters.searchText) {
    query.$or = [
      { vehicleName: { $regex: filters.searchText, $options: "i" } },
      { name: { $regex: filters.searchText, $options: "i" } }
    ];
  }

  // Apply country filter
  if (filters.country) {
    query.country = { $regex: filters.country, $options: "i" };
  }

  // Apply listing type filter
  if (filters.listingType) {
    query.listingType = filters.listingType;
  }

  // Apply truck category filter
  if (filters.truckCategory) {
    query.truckCategory = filters.truckCategory;
  }

  // Apply manufacturer filter
  if (filters.vehicleManufacturer) {
    query.vehicleManufacturer = filters.vehicleManufacturer;
  }

  // Apply year range filter
  if (filters.minYear || filters.maxYear) {
    query.modelYear = {};
    if (filters.minYear) query.modelYear.$gte = parseInt(filters.minYear);
    if (filters.maxYear) query.modelYear.$lte = parseInt(filters.maxYear);
  }

  // Apply mileage range filter
  if (filters.minMileage || filters.maxMileage) {
    query.mileage = {};
    if (filters.minMileage) query.mileage.$gte = parseInt(filters.minMileage);
    if (filters.maxMileage) query.mileage.$lte = parseInt(filters.maxMileage);
  }

  // Apply engine manufacturer filter
  if (filters.engineManufacturer) {
    query.engineManufacturer = { $regex: filters.engineManufacturer, $options: "i" };
  }

  // Apply horsepower range filter
  if (filters.minHorsepower || filters.maxHorsepower) {
    query.hoursPower = {};
    if (filters.minHorsepower) query.hoursPower.$gte = parseInt(filters.minHorsepower);
    if (filters.maxHorsepower) query.hoursPower.$lte = parseInt(filters.maxHorsepower);
  }

  // Apply wheelbase range filter
  if (filters.minWheelbase || filters.maxWheelbase) {
    query.wheelbase = {};
    if (filters.minWheelbase) query.wheelbase.$gte = parseInt(filters.minWheelbase);
    if (filters.maxWheelbase) query.wheelbase.$lte = parseInt(filters.maxWheelbase);
  }

  // Apply suspension filter
  if (filters.suspension) {
    query.suspension = { $regex: filters.suspension, $options: "i" };
  }


  // Apply number of rear axles filter
  if (filters.rearAxles) {
    query.rearAxles = { $regex: filters.rearAxles, $options: "i" };
  }


  // Apply front axle weight range filter
  if (filters.minFrontAxleWeight || filters.maxFrontAxleWeight) {
    query.frontAxleWeight = {};
    if (filters.minFrontAxleWeight) query.frontAxleWeight.$gte = parseInt(filters.minFrontAxleWeight);
    if (filters.maxFrontAxleWeight) query.frontAxleWeight.$lte = parseInt(filters.maxFrontAxleWeight);
  }

  // Apply back axle weight range filter
  if (filters.minBackAxleWeight || filters.maxBackAxleWeight) {
    query.backAxleWeight = {};
    if (filters.minBackAxleWeight) query.backAxleWeight.$gte = parseInt(filters.minBackAxleWeight);
    if (filters.maxBackAxleWeight) query.backAxleWeight.$lte = parseInt(filters.maxBackAxleWeight);
  }

  // Apply transmission filter
  if (filters.transmissionType) {
    query.transmissionType = filters.transmissionType;
  }

  // Apply number of noofSpeeds filter
  if (filters.noofSpeeds) {
    query.noofSpeeds = { $regex: filters.noofSpeeds, $options: "i" };
  }


  // Apply condition filter
  if (filters.condition) {
    query.condition = filters.condition;
  }


  // Apply pagination
  const pageIndex = filters.pageIndex || 1;
  const limit = filters.limit || 12;
  const skip = (pageIndex - 1) * limit;
  let trucks = await Truck.find(query).sort({ createdAt: -1 });

  // Step 2: Filter out trucks with expired or no active subscriptions
  const currentDate = new Date();

  const filteredTrucks = [];

  for (const truck of trucks) {
    const subscriptionDoc = await Subscription.findOne({ user: truck.userId });

    // If no subscription found, skip this truck
    if (!subscriptionDoc || !subscriptionDoc.subscriptions || subscriptionDoc.subscriptions.length === 0) continue;

    const latestSub = subscriptionDoc.subscriptions[subscriptionDoc.subscriptions.length - 1];

    if (latestSub.status === "active" && new Date(latestSub.endDate) > currentDate) {
      filteredTrucks.push(truck);
    }
  }

  const totalCount = filteredTrucks.length;
  const totalPages = Math.ceil(totalCount / limit);

  // Step 3: Apply pagination manually after filtering
  const paginatedTrucks = filteredTrucks.slice(skip, skip + limit);
  return {
    trucks: paginatedTrucks,
    totalPages,
    totalCount,
  };
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
  getAllTrucksWithFilter,
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
  deleteTruck,
  getUserTrucks,
};
