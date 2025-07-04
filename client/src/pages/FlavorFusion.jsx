import React, { useState, useEffect } from 'react';
import TasteCard from '../components/TasteCard';
import { getFlavorRecommendations } from '../services/api';

const FlavorFusion = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    cuisine: '',
    dietary: [],
    flavors: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    if (checked) {
      setPreferences({
        ...preferences,
        [category]: [...preferences[category], value]
      });
    } else {
      setPreferences({
        ...preferences,
        [category]: preferences[category].filter(item => item !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This would be replaced with an actual API call
      // const response = await getFlavorRecommendations(preferences);
      // setRecommendations(response.data);
      
      // Placeholder data for now
      setTimeout(() => {
        setRecommendations([
          {
            id: 1,
            title: 'Thai Green Curry',
            description: 'A fragrant, spicy curry with coconut milk, vegetables, and your choice of protein.',
            image: '/path/to/thai-curry.jpg',
            tags: ['Thai', 'Spicy', 'Aromatic']
          },
          {
            id: 2,
            title: 'Mediterranean Mezze Platter',
            description: 'A selection of small dishes including hummus, falafel, and fresh vegetables.',
            image: '/path/to/mezze.jpg',
            tags: ['Mediterranean', 'Vegetarian', 'Shareable']
          },
          {
            id: 3,
            title: 'Japanese Ramen',
            description: 'Rich broth with noodles, vegetables, and traditional toppings.',
            image: '/path/to/ramen.jpg',
            tags: ['Japanese', 'Comfort Food', 'Umami']
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  return (
    <div className="flavor-fusion-container">
      <h1>FlavorFusion</h1>
      <p>Discover culinary connections and explore new tastes based on your preferences.</p>
      
      <div className="preferences-form">
        <h2>Your Taste Preferences</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Favorite Cuisine</label>
            <input
              type="text"
              name="cuisine"
              value={preferences.cuisine}
              onChange={handleInputChange}
              placeholder="Italian, Japanese, Mexican, etc."
            />
          </div>
          
          {/* More form fields would go here */}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Finding matches...' : 'Discover Flavors'}
          </button>
        </form>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h2>Your Flavor Matches</h2>
          <div className="recommendations-grid">
            {recommendations.map(item => (
              <TasteCard
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                tags={item.tags}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlavorFusion;
