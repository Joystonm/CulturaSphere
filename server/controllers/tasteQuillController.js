// Sample data (in a real app, this would come from a database)
const savedStories = [
  {
    id: 1,
    title: 'The Midnight Orchestra',
    content: 'In a city where music was forbidden, a young violinist discovered an underground concert hall...',
    genre: 'Fantasy',
    date: 'June 15, 2023',
    userId: '123'
  },
  {
    id: 2,
    title: 'Echoes of Tomorrow',
    content: 'The time traveler arrived with a warning: the future was not what they had hoped to create...',
    genre: 'Science Fiction',
    date: 'May 22, 2023',
    userId: '123'
  },
  {
    id: 3,
    title: 'The Forgotten Lighthouse',
    content: 'For fifty years, the lighthouse keeper had maintained his post, even though no ships ever passed...',
    genre: 'Mystery',
    date: 'July 3, 2023',
    userId: '123'
  }
];

// Generate a story
exports.generateStory = (req, res) => {
  try {
    const { prompt, genre, style, length } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a prompt'
      });
    }
    
    // In a real app, this would call an LLM API like Groq
    // For now, return a sample story
    const story = {
      title: "The Quantum Gardener",
      content: `In the year 2157, when the last natural garden on Earth had long been replaced by holographic simulations, Maya Chen discovered an ancient seed vault beneath the ruins of what was once called "Central Park."

The quantum computers that governed most of human life had no record of this place. It was a blind spot in their omniscient databases, a rare anomaly in an age where every molecule was tracked and catalogued.

Maya's fingers trembled as she held a small paper envelope. Inside were seeds—actual, physical seeds—from a plant called "Sunflower." The illustration on the packet showed a tall stalk with a large yellow bloom that resembled the artificial sun that now provided light to the megastructures of New Manhattan.

"What will you do with those?" asked her companion, a standard-issue companion bot named Arlo. "They're incompatible with current environmental parameters."

Maya smiled, tucking the envelope into her pocket. "I'm going to change the parameters."`,
      author: "AI & User",
      date: new Date().toLocaleDateString()
    };
    
    res.status(200).json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Save a story
exports.saveStory = (req, res) => {
  try {
    const { title, content, genre } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title and content'
      });
    }
    
    // In a real app, this would save to a database
    const newStory = {
      id: savedStories.length + 1,
      title,
      content,
      genre: genre || 'Unspecified',
      date: new Date().toLocaleDateString(),
      userId: '123' // In a real app, this would come from authentication
    };
    
    // Add to our mock database
    savedStories.push(newStory);
    
    res.status(201).json({
      success: true,
      data: newStory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get user's saved stories
exports.getUserStories = (req, res) => {
  try {
    // In a real app, this would filter by authenticated user
    const userStories = savedStories.filter(story => story.userId === '123');
    
    res.status(200).json({
      success: true,
      count: userStories.length,
      data: userStories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get story by ID
exports.getStoryById = (req, res) => {
  try {
    const story = savedStories.find(s => s.id === parseInt(req.params.id));
    
    if (!story) {
      return res.status(404).json({
        success: false,
        error: 'Story not found'
      });
    }
    
    // In a real app, check if the story belongs to the authenticated user
    
    res.status(200).json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Delete a story
exports.deleteStory = (req, res) => {
  try {
    const storyIndex = savedStories.findIndex(s => s.id === parseInt(req.params.id));
    
    if (storyIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Story not found'
      });
    }
    
    // In a real app, check if the story belongs to the authenticated user
    
    // Remove from our mock database
    savedStories.splice(storyIndex, 1);
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
