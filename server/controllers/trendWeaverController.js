const { getTrendsFromGroq, getAiStrategistResponse } = require('../services/groqService');
const { getRelatedTrends } = require('../services/qlooService');
const { formatTrends } = require('../utils/tasteUtils');

// Get cultural trends based on filters
exports.getTrends = async (req, res) => {
  try {
    const { industry = 'all' } = req.query;
    
    // Get trends from Groq LLM
    const groqResponse = await getTrendsFromGroq({ industry });
    
    // Get related trends from Qloo API
    const qlooResponse = await getRelatedTrends({ industry });
    
    // Format and combine trends
    const formattedResponse = {
      trends: formatTrends(groqResponse.trends, qlooResponse.trends),
      crossDomainLinks: groqResponse.crossDomainLinks || [],
      brandIdeas: groqResponse.brandIdeas || []
    };
    
    res.status(200).json({
      success: true,
      data: formattedResponse
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
    
    // Get detailed information about a specific trend
    const trendDetails = await getTrendsFromGroq({ 
      type: 'detail',
      trendId 
    });
    
    res.status(200).json({
      success: true,
      data: trendDetails
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

// Ask AI Strategist
exports.askAiStrategist = async (req, res) => {
  try {
    const { question } = req.body;
    
    // Get response from AI Strategist (Groq LLM)
    const response = await getAiStrategistResponse(question);
    
    res.status(200).json({
      success: true,
      data: {
        question,
        answer: response,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error('Error in askAiStrategist:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response',
      message: error.message
    });
  }
};

// Export trend report
exports.exportTrendReport = async (req, res) => {
  try {
    const { industry, format = 'pdf' } = req.query;
    
    // Generate trend report
    // This would typically generate a PDF or CSV file
    
    // For now, we'll just return a success message
    res.status(200).json({
      success: true,
      message: `Trend report for ${industry} would be exported as ${format} here`
    });
  } catch (error) {
    console.error('Error in exportTrendReport:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export trend report',
      message: error.message
    });
  }
};

// Predict next trends
exports.predictNextTrend = async (req, res) => {
  try {
    const { industry } = req.body;
    
    // Predict next trends using Groq LLM
    const predictions = await getTrendsFromGroq({
      type: 'prediction',
      industry
    });
    
    res.status(200).json({
      success: true,
      data: predictions
    });
  } catch (error) {
    console.error('Error in predictNextTrend:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to predict next trend',
      message: error.message
    });
  }
};
