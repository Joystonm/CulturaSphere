const express = require('express');
const router = express.Router();
const { 
  submitEntry,
  getEntries,
  getSuggestions
} = require('../controllers/tasteQuillController');

// Routes
router.post('/submissions', submitEntry);
router.get('/submissions', getEntries);
router.post('/suggestions', getSuggestions);

module.exports = router;
