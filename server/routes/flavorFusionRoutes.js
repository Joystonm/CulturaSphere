const express = require('express');
const router = express.Router();
const { 
  getRecommendations,
  saveDestination,
  getSavedDestinations,
  createTravelStory
} = require('../controllers/flavorFusionController');

// Routes
router.post('/recommendations', getRecommendations);
router.post('/save-destination', saveDestination);
router.get('/saved-destinations', getSavedDestinations);
router.post('/travel-story', createTravelStory);

module.exports = router;
