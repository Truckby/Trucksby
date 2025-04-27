const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware.authenticateRequest, truckController.fetchAllTrucks);

router.get('/get-all', authMiddleware.authenticateRequest, truckController.getAllTrucks);

router.get('/:id', authMiddleware.authenticateRequest, truckController.fetchTruckById);

router.post('/', authMiddleware.authenticateRequest, truckController.addTruck);

router.put('/:id', authMiddleware.authenticateRequest, truckController.updateTruck);

router.delete('/:id', authMiddleware.authenticateRequest, truckController.deleteTruck);

module.exports = router;
