const express = require('express');
const router = express.Router();
const { 
  getTrends,
  getTrendDetails,
  askAiStrategist,
  exportTrendReport,
  predictNextTrend
} = require('../controllers/trendWeaverController');

// Routes
router.get('/trends', getTrends);
router.get('/trends/:trendId', getTrendDetails);
router.post('/ai-strategist', askAiStrategist);
router.get('/export', exportTrendReport);
router.post('/predict', predictNextTrend);

module.exports = router;
