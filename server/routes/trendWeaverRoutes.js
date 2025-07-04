const express = require('express');
const router = express.Router();
const { 
  getTrends,
  getTrendDetails
} = require('../controllers/trendWeaverController');

// Routes
router.get('/trends', getTrends);
router.get('/trends/:trendId', getTrendDetails);

module.exports = router;
