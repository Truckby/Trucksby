const express = require('express');
const UserRoutes = require('./userRoutes');
const imageRoutes = require('./s3Images');

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/image', imageRoutes);
router.use('/truck', imageRoutes);


module.exports = router;