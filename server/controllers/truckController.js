const truckService = require('../services/truckService');
const emailService = require('../services/emailService');
const imageCleanupService = require('../services/imageCleanupService');

const LISTING_BASE_URL = 'https://truckby.com/detail';
const subscriptionService = require('../services/subscriptionService');
const Product = require('../models/prooductModel');
const User = require("../models/userModel");
const Truck = require("../models/truckModel");

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
      truckSubCategory,
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
      vehicleManufacturer,
      Featured,
      typeofRearAxles,
      engineModel,
      model,
    } = req.query;

    const parsedPageIndex = parseInt(pageIndex) || 1;
    const parsedLimit = parseInt(limit) || 12;

    const result = await truckService.getAllTrucksWithFilter({
      pageIndex: parsedPageIndex,
      limit: parsedLimit,
      searchText,
      country,
      listingType,
      truckCategory,
      truckSubCategory,
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
      vehicleManufacturer,
      engineModel,
      model,
      ...(Featured != null && { Featured: Featured.toLowerCase() === 'true' }),
      typeofRearAxles,
    });

    res.status(200).json(result);
  } catch (error) {
    // console.log(error, 'error')
    next(error);
  }
};

const sendMessage = async (req, res) => {
  const { email, message, sellerEmail, vehicleName } = req.body;

  if (!email || !message || !sellerEmail) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const subject = 'New Lead From TruckBy.com';
    const emailHtml = `
    <h1 style="color: #DF0805;">New Lead from Truckby.com</h1>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Vehicle Name:</strong> ${vehicleName || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;
    const bcc = process.env.CLIENT_EMAIL;

    await emailService.sendEmail(`${sellerEmail}, ${bcc}`, subject, null, emailHtml, null, bcc);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
};

const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    await emailService.sendEmail(
      process.env.CLIENT_EMAIL,
      'New Newsletter Subscription',
      null,
      `<p>A new user has subscribed to the newsletter:</p>
       <p><strong>Email:</strong> ${email}</p>`
    );

    res.json({ success: true, message: 'Newsletter Subscription successful. Thank you!' });
  } catch (error) {
    console.error('Error sending subscription email:', error);
    res.status(error.code || 500).json({ success: false, message: error.message || 'Newsletter Subscription failed' });
  }
};


const fetchTruckById = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckById(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Equipment not found' });
    res.status(200).json(truck);
  } catch (error) {
    next(error);
  }
};

const addTruck = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const info = await subscriptionService.getUserSubscriptionInfo(userId);
    // console.log(info, 'info');

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
    res.status(201).json({ message: 'Equipment added successfully', truck: newTruck });

  } catch (error) {
    next(error);
  }
};


const updateTruck = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckById(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Equipment not found' });
    if (truck.userId.toString() !== req.user?.id) {
      return res.status(403).json({ error: 'You can only edit your own listings' });
    }

    // A listing can't be moved to another user
    const { userId, ...data } = req.body;

    // Both apps require at least one photo, so an empty list only comes from a form that
    // didn't load the listing: keep the current photos instead of erasing (and deleting) them
    if (Array.isArray(data.images) && data.images.length === 0) {
      delete data.images;
    }

    const updatedTruck = await truckService.updateTruck(req.params.id, data);
    if (!updatedTruck) return res.status(404).json({ error: 'Equipment not found' });

    // Delete the photos this edit removed. Best effort, the listing is already saved,
    // and the daily cleanup retries anything left behind.
    const removedImages = (truck.images || []).filter((url) => !updatedTruck.images.includes(url));
    imageCleanupService.deleteUnusedImages(removedImages)
      .catch((err) => console.log('DeleteRemovedTruckImagesError: ', err));

    res.status(200).json({ message: 'Equipment updated successfully', truck: updatedTruck });
  } catch (error) {
    next(error);
  }
};

const deleteTruck = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckById(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Equipment not found' });
    if (truck.userId.toString() !== req.user?.id) {
      return res.status(403).json({ error: 'You can only delete your own listings' });
    }

    await truckService.deleteTruck(req.params.id);

    // Photo cleanup is best effort: the listing is already deleted at this point
    try {
      await imageCleanupService.deleteUnusedImages(truck.images || []);
    } catch (err) {
      console.log('DeleteTruckImagesError: ', err);
    }

    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getUserInventory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const query = { userId };
    const skip = (page - 1) * limit;

    const trucks = await Truck.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Truck.countDocuments(query);

    const user = await User.findById(userId, {
      name: 1,
      phone: 1,
      city: 1,
      country: 1,
      state: 1,
      companyName: 1,
      image: 1
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    res.status(200).json({
      user,
      trucks,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error in getUserInventory:", err);
    res.status(500).json({ message: 'Server Error' });
  }
};



const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

// Emails a report about a listing to the Truckby team for manual review
const reportTruck = async (req, res, next) => {
  try {
    const truck = await truckService.getTruckById(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Equipment not found' });

    const seller = await User.findById(truck.userId, { name: 1, email: 1, companyName: 1 });
    const { reason, details, email } = req.body;
    const listingUrl = `${LISTING_BASE_URL}/${truck._id}`;

    const emailHtml = `
      <h1 style="color: #DF0805;">Listing Reported</h1>
      <p><strong>Listing:</strong> ${escapeHtml(truck.vehicleName) || 'N/A'}</p>
      <p><strong>Listing ID:</strong> ${truck._id}</p>
      <p><strong>Link:</strong> <a href="${listingUrl}">${listingUrl}</a></p>
      <p><strong>Seller:</strong> ${escapeHtml(seller?.name || seller?.companyName) || 'N/A'} (${escapeHtml(seller?.email) || 'N/A'})</p>
      <hr />
      <p><strong>Reason:</strong> ${escapeHtml(reason)}</p>
      <p><strong>Details:</strong> ${escapeHtml(details) || 'None'}</p>
      <p><strong>Reported by:</strong> ${escapeHtml(email) || 'Anonymous'}</p>
    `;

    await emailService.sendEmail(process.env.CLIENT_EMAIL, `Listing reported: ${reason}`, null, emailHtml);

    res.status(200).json({ message: "Thanks, we'll review this listing." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  reportTruck,
  subscribeToNewsletter,
  sendMessage,
  fetchAllTrucks,
  getAllTrucks,
  fetchTruckById,
  addTruck,
  updateTruck,
  deleteTruck,
  getUserInventory
};
