const axios = require('axios');

// Initialize Groq client
const groqClient = axios.create({
  baseURL: 'https://api.groq.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Generate a story using Groq LLM
 * @param {Object} options - Story generation options
 * @param {string} options.prompt - The story prompt
 * @param {string} options.genre - The story genre
 * @param {string} options.style - The writing style
 * @param {string} options.length - The story length (short, medium, long)
 * @returns {Promise<Object>} - The generated story
 */
const generateStory = async ({ prompt, genre, style, length }) => {
  try {
    // Create a system prompt based on the parameters
    let systemPrompt = `You are a creative writer specializing in ${genre || 'various genres'}.`;
    
    if (style) {
      systemPrompt += ` Write in the style of ${style}.`;
    }
    
    let maxTokens = 1000; // Default for medium length
    if (length === 'short') {
      maxTokens = 500;
    } else if (length === 'long') {
      maxTokens = 2000;
    }
    
    // Create the user prompt
    const userPrompt = `Write a ${genre || ''} story based on the following prompt: ${prompt}. 
    The story should have a compelling beginning, middle, and end. 
    Include descriptive language and engaging dialogue.
    Give the story a creative title.`;
    
    // Make the API call to Groq
    const response = await groqClient.post('/chat/completions', {
      model: 'llama3-70b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens,
      temperature: 0.7
    });
    
    // Extract the story content
    const storyContent = response.data.choices[0].message.content;
    
    // Extract title from the content (assuming the first line is the title)
    const lines = storyContent.split('\n');
    let title = lines[0].replace(/^#\s*/, ''); // Remove markdown heading if present
    
    // If title is too long, truncate it
    if (title.length > 50) {
      title = title.substring(0, 50) + '...';
    }
    
    // Remove the title from the content
    const content = lines.slice(1).join('\n').trim();
    
    return {
      title,
      content,
      author: 'AI & You',
      date: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error('Error generating story with Groq:', error);
    throw new Error('Failed to generate story');
  }
};

module.exports = {
  generateStory
};
