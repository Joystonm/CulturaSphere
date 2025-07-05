const { generateStoryWithGroq, generateCharacterSheetWithGroq } = require('../services/groqService');
const { getRelatedContent } = require('../services/qlooService');

// Generate a story based on taste seeds and mode
exports.generateStory = async (req, res) => {
  try {
    const { seeds, mode, seriesMode } = req.body;
    
    // Generate story using Groq LLM
    const storyResponse = await generateStoryWithGroq({
      seeds,
      mode,
      seriesMode
    });
    
    res.status(200).json({
      success: true,
      data: {
        title: storyResponse.title,
        content: storyResponse.content,
        coverImage: storyResponse.coverImage || `/images/covers/${mode}-default.jpg`,
        author: "CulturaSphere AI",
        createdAt: new Date(),
        seeds,
        mode
      }
    });
  } catch (error) {
    console.error('Error in generateStory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate story',
      message: error.message
    });
  }
};

// Save a generated story
exports.saveStory = async (req, res) => {
  try {
    const { userId, story } = req.body;
    
    // Here you would save the story to a database
    // For now, we'll just return success with the story data
    
    res.status(201).json({
      success: true,
      message: 'Story saved successfully',
      data: {
        id: Date.now().toString(),
        ...story,
        savedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error in saveStory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save story',
      message: error.message
    });
  }
};

// Get saved stories for a user
exports.getSavedStories = async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id;
    
    // Here you would fetch saved stories from a database
    // For now, we'll return placeholder data
    
    res.status(200).json({
      success: true,
      data: [
        {
          id: '1',
          title: 'The Crystal Weaver\'s Journey',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          coverImage: '/path/to/fantasy-cover.jpg',
          author: 'CulturaSphere AI',
          createdAt: new Date('2023-10-15'),
          seeds: ['Tolkien', 'Studio Ghibli', 'Greek Mythology'],
          mode: 'fantasy'
        },
        {
          id: '2',
          title: 'Echoes of the Forgotten Sky',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
          coverImage: '/path/to/dystopian-cover.jpg',
          author: 'CulturaSphere AI',
          createdAt: new Date('2023-10-10'),
          seeds: ['Cyberpunk', 'Film Noir', 'Minimalism'],
          mode: 'dystopian'
        }
      ]
    });
  } catch (error) {
    console.error('Error in getSavedStories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get saved stories',
      message: error.message
    });
  }
};

// Generate character sheet for a story
exports.generateCharacterSheet = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { story } = req.body;
    
    // Generate character sheet using Groq LLM
    const characterSheet = await generateCharacterSheetWithGroq({
      storyId,
      story
    });
    
    res.status(200).json({
      success: true,
      data: characterSheet
    });
  } catch (error) {
    console.error('Error in generateCharacterSheet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate character sheet',
      message: error.message
    });
  }
};

// Export story as EPUB
exports.exportStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { format = 'epub' } = req.query;
    
    // Here you would generate an EPUB file
    // For now, we'll just return a success message
    
    res.status(200).json({
      success: true,
      message: `Story would be exported as ${format} here`
    });
  } catch (error) {
    console.error('Error in exportStory:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export story',
      message: error.message
    });
  }
};
