const { getTrendsFromGroq } = require('../services/groqService');
const { getRelatedTrends } = require('../services/qlooService');
const { formatTrends } = require('../utils/tasteUtils');

// Get cultural trends based on filters
exports.getTrends = async (req, res) => {
  try {
    const { category, region } = req.query;
    
    // Get trends from Groq LLM
    const groqTrends = await getTrendsFromGroq({
      category,
      region
    });
    
    // Get related trends from Qloo API
    const relatedTrends = await getRelatedTrends({
      category,
      region
    });
    
    // Format and combine trends
    const formattedTrends = formatTrends(
      groqTrends, 
      relatedTrends
    );
    
    res.status(200).json({
      success: true,
      data: formattedTrends
    });
  } catch (error) {
    console.error('Error in getTrends:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get trends',
      message: error.message
    });
  }
};

// Get trend details
exports.getTrendDetails = async (req, res) => {
  try {
    const { trendId } = req.params;
    
    // Here you would fetch detailed information about a specific trend
    // For now, we'll return a placeholder
    
    res.status(200).json({
      success: true,
      data: {
        id: trendId,
        title: 'Sample Trend',
        description: 'This is a detailed description of the trend.',
        origin: 'Global',
        popularity: 85,
        relatedTrends: ['Trend 1', 'Trend 2'],
        mediaLinks: ['https://example.com/image1.jpg']
      }
    });
  } catch (error) {
    console.error('Error in getTrendDetails:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get trend details',
      message: error.message
    });
  }
};
