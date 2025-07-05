const express = require('express');
const router = express.Router();
const { 
  generateStory,
  saveStory,
  getSavedStories,
  generateCharacterSheet,
  exportStory
} = require('../controllers/tasteQuillController');

// Routes
router.post('/generate', generateStory);
router.post('/save', saveStory);
router.get('/stories', getSavedStories);
router.post('/character-sheet/:storyId', generateCharacterSheet);
router.get('/export/:storyId', exportStory);

module.exports = router;
