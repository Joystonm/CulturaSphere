/**
 * Normalize a list of taste preferences
 * @param {Array} preferences - Raw user preferences
 * @returns {Array} - Normalized preferences
 */
const normalizeTastePreferences = (preferences) => {
  if (!Array.isArray(preferences)) {
    return [];
  }
  
  return preferences.map(pref => {
    // Convert to string and trim
    const normalized = String(pref).trim();
    
    // Convert to lowercase
    return normalized.toLowerCase();
  }).filter(Boolean); // Remove empty strings
};

/**
 * Calculate taste similarity between two preference sets
 * @param {Array} preferencesA - First set of preferences
 * @param {Array} preferencesB - Second set of preferences
 * @returns {number} - Similarity score (0-1)
 */
const calculateTasteSimilarity = (preferencesA, preferencesB) => {
  // Normalize both preference sets
  const normA = normalizeTastePreferences(preferencesA);
  const normB = normalizeTastePreferences(preferencesB);
  
  if (normA.length === 0 || normB.length === 0) {
    return 0;
  }
  
  // Count matching preferences
  const matches = normA.filter(pref => normB.includes(pref)).length;
  
  // Calculate Jaccard similarity (intersection over union)
  const union = new Set([...normA, ...normB]).size;
  
  return matches / union;
};

/**
 * Generate taste categories from raw preferences
 * @param {Array} preferences - User preferences
 * @returns {Object} - Categorized preferences
 */
const categorizeTastePreferences = (preferences) => {
  const normalized = normalizeTastePreferences(preferences);
  
  // Define category keywords
  const categories = {
    music: ['music', 'song', 'artist', 'band', 'genre', 'album', 'concert', 'playlist'],
    film: ['movie', 'film', 'cinema', 'director', 'actor', 'actress', 'hollywood', 'netflix'],
    food: ['food', 'cuisine', 'dish', 'restaurant', 'chef', 'cooking', 'recipe', 'taste'],
    literature: ['book', 'novel', 'author', 'reading', 'fiction', 'nonfiction', 'poetry', 'literature'],
    art: ['art', 'painting', 'sculpture', 'artist', 'gallery', 'museum', 'design', 'creative'],
    fashion: ['fashion', 'style', 'clothing', 'designer', 'trend', 'outfit', 'accessory', 'model']
  };
  
  // Initialize result object
  const result = Object.keys(categories).reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {});
  
  // Categorize each preference
  normalized.forEach(pref => {
    let assigned = false;
    
    // Check each category
    for (const [category, keywords] of Object.entries(categories)) {
      // Check if preference contains any category keyword
      if (keywords.some(keyword => pref.includes(keyword))) {
        result[category].push(pref);
        assigned = true;
        break;
      }
    }
    
    // If not assigned to any category, put in 'other'
    if (!assigned) {
      if (!result.other) {
        result.other = [];
      }
      result.other.push(pref);
    }
  });
  
  return result;
};

module.exports = {
  normalizeTastePreferences,
  calculateTasteSimilarity,
  categorizeTastePreferences
};
