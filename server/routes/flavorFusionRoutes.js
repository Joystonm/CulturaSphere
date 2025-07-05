const express = require('express');
const router = express.Router();
const multer = require('multer');
const flavorFusionController = require('../controllers/flavorFusionController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

// Cultural Itinerary Composer
router.post('/itinerary', flavorFusionController.generateItinerary);

// Taste-Aligned Travel Personas
router.post('/travel-persona', flavorFusionController.generateTravelPersona);

// Taste-to-Geo Visualizer
router.post('/taste-to-geo', flavorFusionController.generateTasteToGeo);

// Dynamic Dining Moodboard
router.post('/dining-moodboard', flavorFusionController.generateDiningMoodboard);

// Live Taste Trip Simulator
router.post('/taste-trip-simulator/start', flavorFusionController.startTasteTripSimulation);
router.post('/taste-trip-simulator/message', flavorFusionController.processTasteTripMessage);

// Local Vibes Decoder
router.post('/local-vibes', flavorFusionController.generateLocalVibes);

// Mood Blending Engine
router.post('/mood-blend', flavorFusionController.generateMoodBlend);

// Travel PDF Generator
router.post('/travel-pdf', flavorFusionController.generateTravelPDF);

// Post-Trip Story Mode
router.post('/post-trip-story', upload.array('photos', 10), flavorFusionController.generatePostTripStory);

module.exports = router;
