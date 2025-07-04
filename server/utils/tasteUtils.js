// Format and combine recommendations from different sources
exports.formatRecommendations = (groqRecommendations, qlooRecommendations) => {
  // Combine recommendations from both sources
  const combinedRecommendations = [...groqRecommendations, ...qlooRecommendations];
  
  // Add unique IDs and image placeholders
  return combinedRecommendations.map((rec, index) => ({
    id: index + 1,
    title: rec.title,
    description: rec.description,
    image: `/images/recommendations/${rec.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    tags: rec.tags
  }));
};

// Format and combine trends from different sources
exports.formatTrends = (groqTrends, qlooTrends) => {
  // Combine trends from both sources
  const combinedTrends = [...groqTrends, ...qlooTrends];
  
  // Add unique IDs and image placeholders
  return combinedTrends.map((trend, index) => ({
    id: index + 1,
    title: trend.title,
    description: trend.description,
    image: `/images/trends/${trend.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    tags: trend.tags
  }));
};

// Generate tags from content
exports.generateTags = (content, category) => {
  // This is a simplified version - in a real app, you might use NLP or AI
  // to extract relevant tags from the content
  
  const commonTags = {
    food: ['recipe', 'cooking', 'ingredients', 'flavor', 'cuisine'],
    music: ['genre', 'artist', 'concert', 'album', 'instrument'],
    art: ['painting', 'sculpture', 'gallery', 'artist', 'exhibition'],
    literature: ['book', 'author', 'novel', 'poetry', 'writing'],
    travel: ['destination', 'journey', 'culture', 'adventure', 'sightseeing'],
    tradition: ['heritage', 'celebration', 'ritual', 'cultural', 'historical']
  };
  
  // Return some default tags based on category
  return commonTags[category] || ['culture', 'experience', 'personal'];
};

// Calculate taste similarity between users
exports.calculateTasteSimilarity = (userA, userB) => {
  // This would be a more complex algorithm in a real application
  // For now, we'll use a simple overlap calculation
  
  let matchCount = 0;
  let totalPreferences = 0;
  
  // Compare cuisines
  userA.preferences.cuisines.forEach(cuisine => {
    if (userB.preferences.cuisines.includes(cuisine)) {
      matchCount++;
    }
    totalPreferences++;
  });
  
  // Compare other preferences...
  
  // Return similarity score (0-100%)
  return Math.round((matchCount / totalPreferences) * 100);
};
