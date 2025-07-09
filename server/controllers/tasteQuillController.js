const groqService = require('../services/groqService');

// Generate a story
exports.generateStory = async (req, res) => {
  try {
    const { prompt, genre, style, length } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a prompt'
      });
    }
    
    // Use the Groq service to generate a real-time story
    const story = await groqService.generateStory({ prompt, genre, style, length });
    
    res.status(200).json({
      success: true,
      data: story
    });
  } catch (error) {
    console.error('Error in generateStory controller:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
