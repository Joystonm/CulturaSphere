import React, { useState, useEffect } from 'react';
import TasteCard from '../components/TasteCard';
import { getFlavorRecommendations } from '../services/api';

const FlavorFusion = () => {
  const [userTastes, setUserTastes] = useState([
    { category: 'Music', value: 'Coldplay' },
    { category: 'Movies', value: 'Christopher Nolan' },
    { category: 'Books', value: 'Dystopian Fiction' },
    { category: 'Fashion', value: 'Cyberpunk' }
  ]);
  
  const [destinations, setDestinations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [narrativeText, setNarrativeText] = useState('');

  useEffect(() => {
    // Initial load of recommendations
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      // This would be replaced with an actual API call
      // const response = await getFlavorRecommendations({ tastes: userTastes });
      // setDestinations(response.data.destinations);
      // setRestaurants(response.data.restaurants);
      // setPlaylists(response.data.playlists);
      // setNarrativeText(response.data.narrative);
      
      // Placeholder data for now
      setTimeout(() => {
        setDestinations([
          {
            id: 1,
            title: 'Kyoto, Japan',
            description: 'Ancient temples meet modern design in this serene city that balances tradition with innovation.',
            image: '/path/to/kyoto.jpg',
            tags: ['Serene', 'Cultural', 'Architectural']
          },
          {
            id: 2,
            title: 'Berlin, Germany',
            description: 'A hub for electronic music and avant-garde art with a cyberpunk aesthetic in areas like Kreuzberg.',
            image: '/path/to/berlin.jpg',
            tags: ['Edgy', 'Artistic', 'Nightlife']
          },
          {
            id: 3,
            title: 'Reykjavik, Iceland',
            description: 'Otherworldly landscapes and minimalist design create a surreal atmosphere similar to Nolan\'s visuals.',
            image: '/path/to/reykjavik.jpg',
            tags: ['Surreal', 'Minimalist', 'Atmospheric']
          }
        ]);
        
        setRestaurants([
          {
            id: 1,
            title: 'Neo Tokyo Ramen',
            description: 'Futuristic dining experience with neon lighting and cyberpunk decor serving fusion Japanese cuisine.',
            image: '/path/to/neo-tokyo.jpg',
            tags: ['Cyberpunk', 'Japanese', 'Fusion']
          },
          {
            id: 2,
            title: 'Inception Café',
            description: 'Multi-level café with dream-like interiors and gravity-defying architecture inspired by Nolan\'s films.',
            image: '/path/to/inception-cafe.jpg',
            tags: ['Surreal', 'Architectural', 'Immersive']
          }
        ]);
        
        setPlaylists([
          {
            id: 1,
            title: 'Dystopian Soundscapes',
            description: 'Ambient electronic music with Coldplay-inspired melodies for your cyberpunk travel experience.',
            image: '/path/to/playlist1.jpg',
            tags: ['Electronic', 'Ambient', 'Atmospheric']
          }
        ]);
        
        setNarrativeText("Based on your love for Coldplay's atmospheric sounds and Christopher Nolan's visual aesthetics, Kyoto offers the perfect blend of serenity and surrealism. The ancient temples bathed in morning mist create dreamlike scenes reminiscent of Inception, while the city's blend of tradition and technology mirrors the dystopian-yet-beautiful worlds you enjoy in fiction.");
        
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  const handleRemoveTaste = (index) => {
    setUserTastes(userTastes.filter((_, i) => i !== index));
  };

  const handleAddTaste = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    const value = e.target.value.value;
    
    if (category && value) {
      setUserTastes([...userTastes, { category, value }]);
      e.target.reset();
    }
  };

  const handleRegenerateClick = () => {
    fetchRecommendations();
  };

  const handleCreateTravelStory = () => {
    // Navigate to TasteQuill with pre-filled travel story prompt
    // This would typically use React Router navigation with state
    console.log('Creating travel story based on recommendations');
  };

  return (
    <div className="flavor-fusion-container">
      <h1>FlavorFusion</h1>
      <p className="section-description">Discover travel and dining experiences based on your cultural taste profile.</p>
      
      <div className="flavor-fusion-layout">
        {/* Left Panel - User Tastes */}
        <div className="taste-panel">
          <h2>Your Taste Profile</h2>
          <div className="taste-tags">
            {userTastes.map((taste, index) => (
              <div key={index} className="taste-tag">
                <span className="taste-category">{taste.category}:</span>
                <span className="taste-value">{taste.value}</span>
                <button 
                  onClick={() => handleRemoveTaste(index)}
                  className="remove-taste"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleAddTaste} className="add-taste-form">
            <select name="category" required>
              <option value="">Select Category</option>
              <option value="Music">Music</option>
              <option value="Movies">Movies</option>
              <option value="Books">Books</option>
              <option value="Fashion">Fashion</option>
              <option value="Art">Art</option>
              <option value="Food">Food</option>
            </select>
            <input 
              type="text" 
              name="value" 
              placeholder="Enter your preference" 
              required 
            />
            <button type="submit">Add</button>
          </form>
          
          <button 
            onClick={handleRegenerateClick}
            className="regenerate-button"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Regenerate Suggestions'}
          </button>
          
          <button 
            onClick={handleCreateTravelStory}
            className="create-story-button"
          >
            Create a Travel Story
          </button>
        </div>
        
        {/* Right Panel - Recommendations */}
        <div className="recommendations-panel">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Crafting your personalized recommendations...</p>
            </div>
          ) : (
            <>
              {narrativeText && (
                <div className="narrative-box">
                  <h3>Your Cultural Journey</h3>
                  <p>{narrativeText}</p>
                </div>
              )}
              
              <div className="recommendation-section">
                <h2>Destinations for You</h2>
                <div className="recommendations-grid">
                  {destinations.map(destination => (
                    <TasteCard
                      key={destination.id}
                      title={destination.title}
                      description={destination.description}
                      image={destination.image}
                      tags={destination.tags}
                    />
                  ))}
                </div>
              </div>
              
              <div className="recommendation-section">
                <h2>Dining Experiences</h2>
                <div className="recommendations-grid">
                  {restaurants.map(restaurant => (
                    <TasteCard
                      key={restaurant.id}
                      title={restaurant.title}
                      description={restaurant.description}
                      image={restaurant.image}
                      tags={restaurant.tags}
                    />
                  ))}
                </div>
              </div>
              
              {playlists.length > 0 && (
                <div className="recommendation-section">
                  <h2>Travel Soundtrack</h2>
                  <div className="recommendations-grid">
                    {playlists.map(playlist => (
                      <TasteCard
                        key={playlist.id}
                        title={playlist.title}
                        description={playlist.description}
                        image={playlist.image}
                        tags={playlist.tags}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlavorFusion;
