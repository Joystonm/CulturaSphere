const express = require('express');
const router = express.Router();
const tasteQuillController = require('../controllers/tasteQuillController');

// Generate a story
router.post('/generate', tasteQuillController.generateStory);

module.exports = router;
