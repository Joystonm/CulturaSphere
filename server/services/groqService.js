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

/**
 * Generate general content using Groq LLM
 * @param {Object} options - Content generation options
 * @param {string} options.prompt - The content prompt
 * @param {number} options.maxTokens - Maximum tokens to generate
 * @param {number} options.temperature - Temperature for generation
 * @returns {Promise<string>} - The generated content
 */
const generateContent = async ({ prompt, maxTokens = 1000, temperature = 0.7 }) => {
  try {
    // Make the API call to Groq
    const response = await groqClient.post('/chat/completions', {
      model: 'llama3-70b-8192',
      messages: [
        { 
          role: 'system', 
          content: 'You are a helpful assistant that provides detailed, accurate, and engaging responses.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature: temperature
    });
    
    // Extract the content
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with Groq:', error);
    throw new Error('Failed to generate content');
  }
};

/**
 * Generate structured content (like JSON) using Groq LLM
 * @param {Object} options - Content generation options
 * @param {string} options.prompt - The content prompt
 * @param {string} options.format - The desired format (e.g., 'json')
 * @param {string} options.structure - The type of structure to generate
 * @returns {Promise<Object>} - The generated structured content
 */
const generateStructuredContent = async ({ prompt, format = 'json', structure }) => {
  try {
    // Create a system prompt based on the parameters
    let systemPrompt = `You are an AI assistant that generates structured ${format.toUpperCase()} content.`;
    
    if (structure) {
      systemPrompt += ` You specialize in creating ${structure} structures.`;
    }
    
    systemPrompt += ` Always respond with valid ${format.toUpperCase()} only, no explanations or other text.`;
    
    // Make the API call to Groq
    const response = await groqClient.post('/chat/completions', {
      model: 'llama3-70b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });
    
    // Extract the content
    const content = response.data.choices[0].message.content;
    
    // Parse the JSON content
    if (format.toLowerCase() === 'json') {
      // Extract JSON from the response (in case there's any text before or after)
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/```([\s\S]*?)```/) || [null, content];
      const jsonContent = jsonMatch[1] || content;
      
      try {
        return JSON.parse(jsonContent);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        
        // Attempt to fix common JSON issues and try again
        const fixedJson = fixJsonString(jsonContent);
        return JSON.parse(fixedJson);
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error generating structured content with Groq:', error);
    throw new Error('Failed to generate structured content');
  }
};

/**
 * Helper function to fix common JSON string issues
 * @param {string} jsonString - The potentially invalid JSON string
 * @returns {string} - A fixed JSON string
 */
const fixJsonString = (jsonString) => {
  // Remove any markdown code block markers
  let fixed = jsonString.replace(/```json|```/g, '').trim();
  
  // Replace single quotes with double quotes for keys and string values
  fixed = fixed.replace(/(\w+):'([^']*)'/g, '"$1":"$2"');
  fixed = fixed.replace(/(\w+):\s*'([^']*)'/g, '"$1":"$2"');
  fixed = fixed.replace(/'([^']*)'/g, '"$1"');
  
  // Fix trailing commas in arrays and objects
  fixed = fixed.replace(/,\s*}/g, '}');
  fixed = fixed.replace(/,\s*\]/g, ']');
  
  return fixed;
};

module.exports = {
  generateStory,
  generateContent,
  generateStructuredContent
};
