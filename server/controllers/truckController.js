const truckService = require('../services/truckService');
const emailService = require('../services/emailService');
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
    console.log(error, 'error')
    next(error);
  }
};

const sendMessage = async (req, res) => {
  const { email, message, sellerEmail, vehicleName } = req.body;

  if (!email || !message || !sellerEmail) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    const subject = 'New Contact Message from Buyer';
    const emailHtml = `
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
    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.CLIENT_EMAIL, // your email to receive the notification
      subject: 'New Newsletter Subscription',
      html: `
        <p>A new user has subscribed to the newsletter:</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Newsletter Subscription successful. Thank you!' });
  } catch (error) {
    console.error('Error sending subscription email:', error);
    res.status(500).json({ success: false, message: 'Newsletter Subscription failed' });
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
    res.status(201).json({ message: 'Equipment added successfully', truck: newTruck });

  } catch (error) {
    next(error);
  }
};


const updateTruck = async (req, res, next) => {
  try {
    const updatedTruck = await truckService.updateTruck(req.params.id, req.body);
    if (!updatedTruck) return res.status(404).json({ message: 'Equipment not found' });
    res.status(200).json({ message: 'Equipment updated successfully', truck: updatedTruck });
  } catch (error) {
    next(error);
  }
};

const deleteTruck = async (req, res, next) => {
  try {
    const deletedTruck = await truckService.deleteTruck(req.params.id);
    if (!deletedTruck) return res.status(500).json({ message: 'Equipment not found' });
    res.status(200).json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  subscribeToNewsletter,
  sendMessage,
  fetchAllTrucks,
  getAllTrucks,
  fetchTruckById,
  addTruck,
  updateTruck,
  deleteTruck,
};
