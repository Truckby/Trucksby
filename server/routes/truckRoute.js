const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

router.get('/', truckController.fetchAllTrucks);

router.get('/:id', truckController.fetchTruckById);

router.post('/', truckController.addTruck);

router.put('/:id', truckController.updateTruck);

router.delete('/:id', truckController.deleteTruck);

module.exports = router;
