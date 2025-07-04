const { enhanceContentWithGroq } = require('../services/groqService');
const { getRelatedContent } = require('../services/qlooService');

// Submit a new TasteQuill entry
exports.submitEntry = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    // Here you would save the entry to a database
    // For now, we'll just return success with the submitted data
    
    res.status(201).json({
      success: true,
      message: 'Entry submitted successfully',
      data: {
        id: Date.now().toString(),
        title,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error in submitEntry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit entry',
      message: error.message
    });
  }
};

// Get all TasteQuill entries
exports.getEntries = async (req, res) => {
  try {
    // Here you would fetch entries from a database
    // For now, we'll return placeholder data
    
    res.status(200).json({
      success: true,
      data: [
        {
          id: '1',
          title: 'My Journey Through Italian Cuisine',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          category: 'food',
          tags: ['italian', 'pasta', 'cooking'],
          createdAt: new Date('2023-10-15')
        },
        {
          id: '2',
          title: 'Exploring Jazz in New Orleans',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          category: 'music',
          tags: ['jazz', 'new orleans', 'live music'],
          createdAt: new Date('2023-10-10')
        }
      ]
    });
  } catch (error) {
    console.error('Error in getEntries:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get entries',
      message: error.message
    });
  }
};

// Get suggestions for writing
exports.getSuggestions = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Get suggestions from Groq LLM
    const suggestions = await enhanceContentWithGroq(prompt);
    
    res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Error in getSuggestions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get suggestions',
      message: error.message
    });
  }
};
