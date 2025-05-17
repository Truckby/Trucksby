const truckService = require('../services/truckService');
const nodemailer = require('nodemailer');
const subscriptionService = require('../services/subscriptionService');
const Product = require('../models/prooductModel');

const fetchAllTrucks = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const page = parseInt(req.query.page) || 1;      // default to page 1
    const limit = parseInt(req.query.limit) || 10;   // default to 10 items per page
    const skip = (page - 1) * limit;

    const { trucks, total } = await truckService.getAllTrucks(userId, skip, limit);

    res.status(200).json({
      data: trucks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};


const getAllTrucks = async (req, res, next) => {
  try {
    const {
      pageIndex,
      limit,
      searchText,
      country,
      listingType,
      truckCategory,
      manufacturer,
      minYear,
      maxYear,
      minMileage,
      maxMileage,
      engineManufacturer,
      minHorsepower,
      maxHorsepower,
      minWheelbase,
      maxWheelbase,
      suspension,
      rearAxles,
      minFrontAxleWeight,
      maxFrontAxleWeight,
      minBackAxleWeight,
      maxBackAxleWeight,
      transmissionType,
      noofSpeeds,
      condition,
      vehicleManufacturer
    } = req.query;

    console.log(req.query, 'query')

    const parsedPageIndex = parseInt(pageIndex) || 1;
    const parsedLimit = parseInt(limit) || 12;

    const result = await truckService.getAllTrucksWithFilter({
      pageIndex: parsedPageIndex,
      limit: parsedLimit,
      searchText,
      country,
      listingType,
      truckCategory,
      manufacturer,
      minYear,
      maxYear,
      minMileage,
      maxMileage,
      engineManufacturer,
      minHorsepower,
      maxHorsepower,
      minWheelbase,
      maxWheelbase,
      suspension,
      rearAxles,
      minFrontAxleWeight,
      maxFrontAxleWeight,
      minBackAxleWeight,
      maxBackAxleWeight,
      transmissionType,
      noofSpeeds,
      condition,
      vehicleManufacturer
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error, 'error')
    next(error);
  }
};

const sendMessage = async (req, res) => {
  const { email, message, sellerEmail } = req.body;

  if (!email || !message || !sellerEmail) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    // Setup transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: email,
      to: sellerEmail,
      subject: 'New Contact Message from Buyer',
      html: `
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};

const fetchTruckById = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckById(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.status(200).json(truck);
  } catch (error) {
    next(error);
  }
};

const addTruck = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const info = await subscriptionService.getUserSubscriptionInfo(userId);
    console.log(info, 'info');

    if (!info || !info.planName) {
      return res.status(400).json({ message: 'Subscription information not found' });
    }

    const { productId } = info;

    const productData = await Product.findOne({ productId });

    // Get current number of trucks for the user
    const userTrucks = await truckService.getUserTrucks(userId);
    const truckCount = userTrucks.length;

    // Restrict based on plan
    if (truckCount >= productData.listings) {
      return res.status(403).json({ message: `Basic Membership allows only up to ${productData.listings} trucks.` });
    }

    // Proceed to create new truck
    const data = {
      ...req.body,
      userId,
      ...(productData.features.includes('Featured Listings') && { Featured: true })
    };

    const newTruck = await truckService.createTruck(data);
    res.status(201).json({ message: 'Truck added successfully', truck: newTruck });

  } catch (error) {
    next(error);
  }
};


const updateTruck = async (req, res, next) => {
  try {
    const updatedTruck = await truckService.updateTruck(req.params.id, req.body);
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
  sendMessage,
  fetchAllTrucks,
  getAllTrucks,
  fetchTruckById,
  addTruck,
  updateTruck,
  deleteTruck,
};
