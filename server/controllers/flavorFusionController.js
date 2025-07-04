const { getRecommendationsFromGroq } = require('../services/groqService');
const { getRelatedTastes } = require('../services/qlooService');
const { formatRecommendations } = require('../utils/tasteUtils');

// Get flavor recommendations based on user preferences
exports.getRecommendations = async (req, res) => {
  try {
    const { cuisine, dietary, flavors } = req.body;
    
    // Get recommendations from Groq LLM
    const groqRecommendations = await getRecommendationsFromGroq({
      cuisine,
      dietary,
      flavors
    });
    
    // Get related tastes from Qloo API
    const relatedTastes = await getRelatedTastes({
      cuisine,
      dietary,
      flavors
    });
    
    // Format and combine recommendations
    const formattedRecommendations = formatRecommendations(
      groqRecommendations, 
      relatedTastes
    );
    
    res.status(200).json({
      success: true,
      data: formattedRecommendations
    });
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get recommendations',
      message: error.message
    });
  }
};

// Save user preferences
exports.savePreferences = async (req, res) => {
  try {
    const { userId, preferences } = req.body;
    
    // Here you would save the preferences to a database
    // For now, we'll just return success
    
    res.status(200).json({
      success: true,
      message: 'Preferences saved successfully'
    });
  } catch (error) {
    console.error('Error in savePreferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save preferences',
      message: error.message
    });
  }
};
