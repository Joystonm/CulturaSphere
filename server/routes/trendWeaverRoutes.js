const express = require('express');
const router = express.Router();
const trendWeaverController = require('../controllers/trendWeaverController');

// Get all trends
router.get('/trends', trendWeaverController.getAllTrends);

// Get trends by category
router.get('/trends/:category', trendWeaverController.getTrendsByCategory);

// Get cultural insights
router.get('/insights', trendWeaverController.getInsights);

// Get personalized trend recommendations
router.post('/recommendations', trendWeaverController.getTrendRecommendations);

module.exports = router;
