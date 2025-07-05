const express = require('express');
const router = express.Router();
const flavorFusionController = require('../controllers/flavorFusionController');

// Get all cuisines
router.get('/cuisines', flavorFusionController.getAllCuisines);

// Get cuisine by ID
router.get('/cuisines/:id', flavorFusionController.getCuisineById);

// Get all destinations
router.get('/destinations', flavorFusionController.getAllDestinations);

// Get destination by ID
router.get('/destinations/:id', flavorFusionController.getDestinationById);

// Get recommendations based on user preferences
router.post('/recommendations', flavorFusionController.getRecommendations);

module.exports = router;
