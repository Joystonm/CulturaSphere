const express = require('express');
const router = express.Router();
const tasteQuillController = require('../controllers/tasteQuillController');

// Generate a story
router.post('/generate', tasteQuillController.generateStory);

// Save a story
router.post('/save', tasteQuillController.saveStory);

// Get user's saved stories
router.get('/stories', tasteQuillController.getUserStories);

// Get story by ID
router.get('/stories/:id', tasteQuillController.getStoryById);

// Delete a story
router.delete('/stories/:id', tasteQuillController.deleteStory);

module.exports = router;
