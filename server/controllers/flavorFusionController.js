const { getRecommendationsFromGroq } = require('../services/groqService');
const { getRelatedTastes } = require('../services/qlooService');
const { formatRecommendations } = require('../utils/tasteUtils');

// Get flavor recommendations based on user tastes
exports.getRecommendations = async (req, res) => {
  try {
    const { tastes } = req.body;
    
    // Get recommendations from Groq LLM
    const groqResponse = await getRecommendationsFromGroq(tastes);
    
    // Get related tastes from Qloo API
    const qlooResponse = await getRelatedTastes(tastes);
    
    // Format and combine recommendations
    const formattedResponse = {
      destinations: formatRecommendations(groqResponse.destinations, qlooResponse.destinations),
      restaurants: formatRecommendations(groqResponse.restaurants, qlooResponse.restaurants),
      playlists: formatRecommendations(groqResponse.playlists, qlooResponse.playlists),
      narrative: groqResponse.narrative
    };
    
    res.status(200).json({
      success: true,
      data: formattedResponse
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

// Save a destination to user profile
exports.saveDestination = async (req, res) => {
  try {
    const { userId, destination } = req.body;
    
    // Here you would save the destination to a database
    // For now, we'll just return success
    
    res.status(200).json({
      success: true,
      message: 'Destination saved successfully',
      data: {
        id: Date.now().toString(),
        ...destination,
        savedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error in saveDestination:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save destination',
      message: error.message
    });
  }
};

// Get saved destinations for a user
exports.getSavedDestinations = async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    
    // Here you would fetch saved destinations from a database
    // For now, we'll return placeholder data
    
    res.status(200).json({
      success: true,
      data: [
        {
          id: '1',
          title: 'Kyoto, Japan',
          description: 'Ancient temples meet modern design in this serene city.',
          image: '/path/to/kyoto.jpg',
          tags: ['Serene', 'Cultural', 'Architectural'],
          savedAt: new Date('2023-10-15')
        },
        {
          id: '2',
          title: 'Berlin, Germany',
          description: 'A hub for electronic music and avant-garde art.',
          image: '/path/to/berlin.jpg',
          tags: ['Edgy', 'Artistic', 'Nightlife'],
          savedAt: new Date('2023-10-10')
        }
      ]
    });
  } catch (error) {
    console.error('Error in getSavedDestinations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get saved destinations',
      message: error.message
    });
  }
};

// Create a travel story based on destination
exports.createTravelStory = async (req, res) => {
  try {
    const { destination, preferences } = req.body;
    
    // Generate a travel story using Groq LLM
    const story = await getRecommendationsFromGroq({
      type: 'travel-story',
      destination,
      preferences
    });
    
    res.status(200).json({
      success: true,
      data: {
        title: `Journey to ${destination.title}`,
        content: story.content,
        destination: destination,
        createdAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error in createTravelStory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create travel story',
      message: error.message
    });
  }
};
