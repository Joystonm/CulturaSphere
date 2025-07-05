// Sample data (in a real app, this would come from a database)
const trends = [
  {
    id: 1,
    title: 'Neo-Soul Revival',
    description: 'A resurgence of soul music with modern production techniques and classic vocal stylings.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Music',
    date: '2023-06-15'
  },
  {
    id: 2,
    title: 'Digital Surrealism',
    description: 'AI-generated artwork that blends surrealist concepts with digital manipulation.',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Art',
    date: '2023-05-22'
  },
  {
    id: 3,
    title: 'Sustainable Luxury',
    description: 'High-end fashion brands embracing eco-friendly materials and ethical production.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Fashion',
    date: '2023-07-03'
  },
  {
    id: 4,
    title: 'Micro-Budget Cinema',
    description: 'Independent filmmakers creating compelling narratives with minimal resources.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Film',
    date: '2023-04-18'
  },
  {
    id: 5,
    title: 'Climate Fiction',
    description: 'Literary works exploring the impact of climate change on society and individuals.',
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Literature',
    date: '2023-06-29'
  }
];

const insights = [
  {
    id: 1,
    title: 'The Intersection of Technology and Traditional Art Forms',
    date: 'July 10, 2023',
    content: 'As digital tools become more accessible, we\'re seeing a fascinating blend of traditional artistic techniques with cutting-edge technology. This fusion is creating new aesthetic languages and challenging our perception of what constitutes "authentic" art.'
  },
  {
    id: 2,
    title: 'Global Influences in Local Music Scenes',
    date: 'June 28, 2023',
    content: 'The internet has accelerated the cross-pollination of musical styles across geographical boundaries. Local music scenes are increasingly incorporating elements from distant cultures, resulting in rich, hybrid genres that reflect our interconnected world.'
  }
];

// Get all trends
exports.getAllTrends = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: trends.length,
      data: trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get trends by category
exports.getTrendsByCategory = (req, res) => {
  try {
    const category = req.params.category;
    const filteredTrends = trends.filter(trend => 
      trend.category.toLowerCase() === category.toLowerCase()
    );
    
    res.status(200).json({
      success: true,
      count: filteredTrends.length,
      data: filteredTrends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get cultural insights
exports.getInsights = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: insights.length,
      data: insights
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get personalized trend recommendations
exports.getTrendRecommendations = (req, res) => {
  try {
    const { preferences } = req.body;
    
    if (!preferences || !Array.isArray(preferences)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide preferences array'
      });
    }
    
    // In a real app, this would use a recommendation algorithm
    // For now, just return random trends
    const recommendedTrends = trends.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    res.status(200).json({
      success: true,
      data: recommendedTrends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
