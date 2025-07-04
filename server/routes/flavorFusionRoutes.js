const express = require('express');
const router = express.Router();
const { 
  getRecommendations,
  savePreferences
} = require('../controllers/flavorFusionController');

// Routes
router.post('/recommendations', getRecommendations);
router.post('/preferences', savePreferences);

module.exports = router;
