// Format and combine recommendations from different sources
exports.formatRecommendations = (groqRecommendations = [], qlooRecommendations = []) => {
  // Combine recommendations from both sources
  const combinedRecommendations = [...groqRecommendations, ...qlooRecommendations];
  
  // Add unique IDs and image placeholders
  return combinedRecommendations.map((rec, index) => ({
    id: index + 1,
    title: rec.title,
    description: rec.description,
    image: rec.image || `/images/recommendations/${rec.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    tags: rec.tags || []
  }));
};

// Format and combine trends from different sources
exports.formatTrends = (groqTrends = [], qlooTrends = []) => {
  // Combine trends from both sources
  const combinedTrends = [...groqTrends, ...qlooTrends];
  
  // Add unique IDs and image placeholders
  return combinedTrends.map((trend, index) => ({
    id: index + 1,
    title: trend.title,
    description: trend.description,
    image: trend.image || `/images/trends/${trend.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    tags: trend.tags || [],
    growth: trend.growth || '+15% YoY',
    regions: trend.regions || ['Global']
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
  
  // Compare preferences across categories
  const categories = ['cuisines', 'artForms', 'musicGenres', 'literaryGenres'];
  
  categories.forEach(category => {
    if (!userA.preferences[category] || !userB.preferences[category]) return;
    
    userA.preferences[category].forEach(pref => {
      if (userB.preferences[category].includes(pref)) {
        matchCount++;
      }
      totalPreferences++;
    });
  });
  
  // Return similarity score (0-100%)
  return Math.round((matchCount / (totalPreferences || 1)) * 100);
};

// Extract taste profile from user interactions
exports.extractTasteProfile = (userInteractions) => {
  // This would analyze user interactions to build a taste profile
  // For now, we'll return a simplified version
  
  const profile = {
    topInterests: [],
    categories: {},
    strength: {}
  };
  
  // Count occurrences of each interest
  userInteractions.forEach(interaction => {
    // Process tags
    interaction.tags.forEach(tag => {
      if (!profile.strength[tag]) {
        profile.strength[tag] = 0;
      }
      
      // Increase strength based on interaction type
      switch (interaction.type) {
        case 'view':
          profile.strength[tag] += 1;
          break;
        case 'like':
          profile.strength[tag] += 3;
          break;
        case 'save':
          profile.strength[tag] += 5;
          break;
        case 'share':
          profile.strength[tag] += 7;
          break;
        default:
          profile.strength[tag] += 1;
      }
      
      // Add to category
      if (!profile.categories[interaction.category]) {
        profile.categories[interaction.category] = [];
      }
      
      if (!profile.categories[interaction.category].includes(tag)) {
        profile.categories[interaction.category].push(tag);
      }
    });
  });
  
  // Get top interests based on strength
  profile.topInterests = Object.entries(profile.strength)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
  
  return profile;
};

// Generate personalized narrative
exports.generateNarrative = (userProfile, recommendations) => {
  // This would generate a personalized narrative based on the user's profile
  // and the recommendations
  // For now, we'll return a template-based narrative
  
  const topInterests = userProfile.topInterests.slice(0, 3);
  const destinationNames = recommendations.destinations.slice(0, 2).map(d => d.title);
  
  return `Based on your interest in ${topInterests.join(', ')}, we think you'd enjoy exploring ${destinationNames.join(' and ')}. These destinations offer experiences that align with your unique taste profile, combining elements of your favorite cultural touchpoints in ways that might surprise and delight you.`;
};
