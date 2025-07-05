const groqService = require('../services/groqService');
const qlooService = require('../services/qlooService');

/**
 * Generate a cultural itinerary based on user preferences
 */
const generateItinerary = async (req, res) => {
  try {
    const { destination, days, travelPace, travelMode, userTastes } = req.body;
    
    // Validate required fields
    if (!destination || !days || !travelPace || !travelMode || !userTastes) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Create a detailed ${days}-day travel itinerary for ${destination} with a ${travelPace} pace.
      The traveler prefers to get around via ${travelMode} and has the following interests and tastes: ${userTastes}.
      
      For each day, provide:
      - Morning activity with a culturally relevant suggestion (museum, landmark, experience)
      - Afternoon activity with a local food or dining recommendation
      - Evening activity with entertainment or hidden spot suggestion
      
      For each suggestion, explain why it matches the user's tastes.
      Format the response as a structured JSON object with days, time slots, and explanations.
    `;
    
    // Generate itinerary using Groq
    const itineraryResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'itinerary'
    });
    
    // Process and return the itinerary
    res.json(itineraryResponse);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
};

/**
 * Generate a travel persona based on user interests
 */
const generateTravelPersona = async (req, res) => {
  try {
    const { interests } = req.body;
    
    if (!interests) {
      return res.status(400).json({ error: 'Missing interests' });
    }
    
    // Get taste recommendations from Qloo
    const tasteRecommendations = await qlooService.getRecommendations(
      [interests], 
      'travel'
    );
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Based on these interests: "${interests}" and these taste recommendations: ${JSON.stringify(tasteRecommendations)},
      create a unique travel persona with the following:
      
      1. A creative persona name (e.g., "Urban Bohemian Explorer")
      2. A persona category
      3. A detailed description of this travel persona
      4. 3-5 travel style suggestions
      5. 2-3 boutique hotel recommendations that match this persona
      6. 2-3 café recommendations that match this persona
      7. A Spotify playlist concept with name and description
      8. 2-3 book recommendations that match this persona
      
      Format the response as a structured JSON object.
    `;
    
    // Generate persona using Groq
    const personaResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'travelPersona'
    });
    
    // Process and return the persona
    res.json(personaResponse);
  } catch (error) {
    console.error('Error generating travel persona:', error);
    res.status(500).json({ error: 'Failed to generate travel persona' });
  }
};

/**
 * Generate taste-to-geo visualization data
 */
const generateTasteToGeo = async (req, res) => {
  try {
    const { interests } = req.body;
    
    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid interests' });
    }
    
    // Get destination recommendations from Qloo
    const destinationRecommendations = await qlooService.getRecommendations(
      interests, 
      'destination'
    );
    
    // Create a prompt for the Groq LLM to enhance the recommendations
    const prompt = `
      Based on these interests: ${JSON.stringify(interests)} and these destination recommendations: 
      ${JSON.stringify(destinationRecommendations)},
      
      Create detailed descriptions for each destination explaining why they match the user's interests.
      For each destination, provide:
      1. A brief description
      2. A match score (percentage between 70-95)
      3. 3-5 specific reasons why this destination matches their interests
      
      Format the response as a structured JSON array of destinations.
    `;
    
    // Generate enhanced destination data using Groq
    const enhancedDestinations = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'destinations'
    });
    
    // Process and return the destinations
    res.json(enhancedDestinations);
  } catch (error) {
    console.error('Error generating taste-to-geo data:', error);
    res.status(500).json({ error: 'Failed to generate taste-to-geo data' });
  }
};

/**
 * Generate a dining moodboard based on mood tags
 */
const generateDiningMoodboard = async (req, res) => {
  try {
    const { moodTags, location } = req.body;
    
    if (!moodTags || !Array.isArray(moodTags) || moodTags.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid mood tags' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Create a dining moodboard based on these mood/taste tags: ${JSON.stringify(moodTags)}
      ${location ? `for ${location}` : ''}.
      
      Include:
      1. An overall dining aesthetic name and description
      2. 3-4 curated dining spot recommendations with name, type, description, and why they match the mood
      3. A sample menu with 4-5 dishes and descriptions
      4. Ambience suggestions including music style, lighting, and decor
      
      Format the response as a structured JSON object.
    `;
    
    // Generate moodboard using Groq
    const moodboardResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'diningMoodboard'
    });
    
    // Process and return the moodboard
    res.json(moodboardResponse);
  } catch (error) {
    console.error('Error generating dining moodboard:', error);
    res.status(500).json({ error: 'Failed to generate dining moodboard' });
  }
};

/**
 * Start a taste trip simulation
 */
const startTasteTripSimulation = async (req, res) => {
  try {
    const { destination, interests, duration } = req.body;
    
    if (!destination || !interests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      You are a travel guide simulator for a ${duration}-day trip to ${destination}.
      The traveler has these interests: ${interests}.
      
      Create an immersive, first-person introduction to the trip that:
      1. Sets the scene with sensory details (sights, sounds, smells)
      2. Mentions 2-3 specific locations that match their interests
      3. Hints at cultural experiences they'll encounter
      4. Ends with an engaging question to prompt their interaction
      
      Write in a cinematic, present-tense style that makes them feel like they're there.
    `;
    
    // Generate initial response using Groq
    const initialResponse = await groqService.generateContent({
      prompt,
      maxTokens: 500,
      temperature: 0.7
    });
    
    // Return the initial response
    res.json({ initialResponse });
  } catch (error) {
    console.error('Error starting taste trip simulation:', error);
    res.status(500).json({ error: 'Failed to start taste trip simulation' });
  }
};

/**
 * Process a message in the taste trip simulation
 */
const processTasteTripMessage = async (req, res) => {
  try {
    const { message, destination, interests } = req.body;
    
    if (!message || !destination || !interests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      You are a travel guide simulator for a trip to ${destination}.
      The traveler has these interests: ${interests}.
      
      The traveler says: "${message}"
      
      Respond in character as their guide, maintaining an immersive, present-tense narrative.
      Include sensory details and cultural insights that match their interests.
      If they ask about specific places, foods, or activities, provide realistic details about ${destination}.
      
      Keep your response engaging, informative, and focused on creating a rich travel experience.
    `;
    
    // Generate response using Groq
    const response = await groqService.generateContent({
      prompt,
      maxTokens: 500,
      temperature: 0.7
    });
    
    // Return the response
    res.json({ response });
  } catch (error) {
    console.error('Error processing taste trip message:', error);
    res.status(500).json({ error: 'Failed to process taste trip message' });
  }
};

/**
 * Generate local vibes information
 */
const generateLocalVibes = async (req, res) => {
  try {
    const { location, userStyle, tonePreference } = req.body;
    
    if (!location) {
      return res.status(400).json({ error: 'Missing location' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Create a "Local Vibes Decoder" for ${location} in a ${tonePreference || 'friendly'} tone.
      ${userStyle ? `The traveler is interested in: ${userStyle}.` : ''}
      
      Include:
      1. A location name and catchy tagline
      2. Cultural norms (social customs, communication style, local values)
      3. Fashion and etiquette (fashion trends, dining etiquette, local slang)
      4. Local events (3-4 events that match the traveler's style, seasonal highlights)
      5. A local insight quote that captures the essence of the location
      
      Format the response as a structured JSON object.
    `;
    
    // Generate local vibes using Groq
    const localVibesResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'localVibes'
    });
    
    // Process and return the local vibes
    res.json(localVibesResponse);
  } catch (error) {
    console.error('Error generating local vibes:', error);
    res.status(500).json({ error: 'Failed to generate local vibes' });
  }
};

/**
 * Generate a mood blend experience
 */
const generateMoodBlend = async (req, res) => {
  try {
    const { mood, taste } = req.body;
    
    if (!mood || !taste) {
      return res.status(400).json({ error: 'Missing mood or taste' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Create a travel experience that blends the mood "${mood}" with the taste/style "${taste}".
      
      Include:
      1. A creative blend name that combines the mood and taste
      2. A perfect destination recommendation with description
      3. 3-4 specific experiences that embody this mood-taste blend
      4. 2-3 dining recommendations that match this blend
      5. 3-5 music tracks that would form a soundtrack for this experience
      6. A caption for an image that would represent this mood-taste blend
      
      Format the response as a structured JSON object.
    `;
    
    // Generate mood blend using Groq
    const moodBlendResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'moodBlend'
    });
    
    // Process and return the mood blend
    res.json(moodBlendResponse);
  } catch (error) {
    console.error('Error generating mood blend:', error);
    res.status(500).json({ error: 'Failed to generate mood blend' });
  }
};

/**
 * Generate a travel PDF
 */
const generateTravelPDF = async (req, res) => {
  try {
    const { destination, travelDates, interests, narrativeStyle } = req.body;
    
    if (!destination || !interests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Create content for a travel guide PDF for ${destination} in a ${narrativeStyle || 'friendly'} style.
      The traveler is interested in: ${interests}.
      ${travelDates.start ? `Travel dates: ${travelDates.start} to ${travelDates.end || 'unspecified'}.` : ''}
      
      Include:
      1. A title and subtitle for the guide
      2. A mini phrasebook with 5-7 useful local phrases (original language, pronunciation, translation)
      3. Cultural tips (5 do's and 5 don'ts)
      4. A daily plan overview for 3 days
      5. Music and reading recommendations that match the destination and traveler's interests
      6. A personal note written in the specified narrative style
      
      Format the response as a structured JSON object.
    `;
    
    // Generate travel PDF content using Groq
    const travelPDFResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'travelPDF'
    });
    
    // Process and return the travel PDF content
    res.json(travelPDFResponse);
  } catch (error) {
    console.error('Error generating travel PDF:', error);
    res.status(500).json({ error: 'Failed to generate travel PDF' });
  }
};

/**
 * Generate a post-trip story
 */
const generatePostTripStory = async (req, res) => {
  try {
    const { destination, travelDates, experiences, storyStyle } = req.body;
    
    if (!destination || !experiences) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Handle photo uploads if present
    const photoCount = req.files ? req.files.length : 0;
    
    // Create a prompt for the Groq LLM
    const prompt = `
      Create a post-trip story about a journey to ${destination} in the style of a "${storyStyle || 'narrative'}".
      The traveler shared these experiences: ${experiences}.
      ${travelDates.start ? `Travel dates: ${travelDates.start} to ${travelDates.end || 'unspecified'}.` : ''}
      ${photoCount > 0 ? `The traveler shared ${photoCount} photos from their trip.` : ''}
      
      Include:
      1. A creative title and subtitle for the story
      2. Content divided into sections with headings
      3. A mix of narrative text, reflections, and descriptions
      4. ${photoCount > 0 ? 'Photo captions that integrate with the narrative' : 'Suggestions for where photos could be placed'}
      5. A conclusion that captures the essence of the journey
      
      Format the response as a structured JSON object with title, subtitle, and content sections.
      Each content section should have a type (text, photo, quote), heading (optional), and appropriate content.
    `;
    
    // Generate post-trip story using Groq
    const postTripStoryResponse = await groqService.generateStructuredContent({
      prompt,
      format: 'json',
      structure: 'postTripStory'
    });
    
    // Process and return the post-trip story
    res.json(postTripStoryResponse);
  } catch (error) {
    console.error('Error generating post-trip story:', error);
    res.status(500).json({ error: 'Failed to generate post-trip story' });
  }
};

module.exports = {
  generateItinerary,
  generateTravelPersona,
  generateTasteToGeo,
  generateDiningMoodboard,
  startTasteTripSimulation,
  processTasteTripMessage,
  generateLocalVibes,
  generateMoodBlend,
  generateTravelPDF,
  generatePostTripStory
};
