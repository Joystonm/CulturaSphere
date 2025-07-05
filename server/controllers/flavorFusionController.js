// Sample data (in a real app, this would come from a database)
const cuisines = [
  {
    id: 1,
    name: 'Japanese',
    description: 'Delicate flavors, fresh ingredients, and artistic presentation.',
    image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Asian',
    tags: ['Umami', 'Fresh', 'Seafood']
  },
  {
    id: 2,
    name: 'Italian',
    description: 'Rich flavors, fresh herbs, and simple yet delicious combinations.',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'European',
    tags: ['Pasta', 'Tomato', 'Herbs']
  },
  {
    id: 3,
    name: 'Ethiopian',
    description: 'Bold spices, communal dining, and unique fermented flavors.',
    image: 'https://images.unsplash.com/photo-1567364667030-4d63bac61d31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'African',
    tags: ['Spicy', 'Stew', 'Injera']
  }
];

const destinations = [
  {
    id: 1,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Japanese cuisine capital',
    description: 'Experience authentic sushi, ramen, and more in the world\'s most populous city.'
  },
  {
    id: 2,
    name: 'Naples, Italy',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Birthplace of pizza',
    description: 'Visit the origin of pizza and enjoy authentic Neapolitan cuisine.'
  },
  {
    id: 3,
    name: 'Addis Ababa, Ethiopia',
    image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    cuisine: 'Authentic Ethiopian dining',
    description: 'Experience traditional injera with various stews and the famous Ethiopian coffee ceremony.'
  }
];

// Get all cuisines
exports.getAllCuisines = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: cuisines.length,
      data: cuisines
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get cuisine by ID
exports.getCuisineById = (req, res) => {
  try {
    const cuisine = cuisines.find(c => c.id === parseInt(req.params.id));
    
    if (!cuisine) {
      return res.status(404).json({
        success: false,
        error: 'Cuisine not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: cuisine
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get all destinations
exports.getAllDestinations = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get destination by ID
exports.getDestinationById = (req, res) => {
  try {
    const destination = destinations.find(d => d.id === parseInt(req.params.id));
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        error: 'Destination not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get recommendations based on user preferences
exports.getRecommendations = (req, res) => {
  try {
    const { preferences } = req.body;
    
    if (!preferences || !Array.isArray(preferences)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide preferences array'
      });
    }
    
    // In a real app, this would use a recommendation algorithm
    // For now, just return random items
    const recommendedCuisines = cuisines.sort(() => 0.5 - Math.random()).slice(0, 2);
    const recommendedDestinations = destinations.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    res.status(200).json({
      success: true,
      data: {
        cuisines: recommendedCuisines,
        destinations: recommendedDestinations
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
