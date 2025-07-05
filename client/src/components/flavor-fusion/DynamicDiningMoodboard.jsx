import React, { useState } from 'react';
import axios from 'axios';

const DynamicDiningMoodboard = () => {
  const [moodTags, setMoodTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [moodboard, setMoodboard] = useState(null);
  const [error, setError] = useState('');

  const suggestedTags = [
    'Cozy', 'Elegant', 'Rustic', 'Modern', 'Vibrant', 'Minimalist', 
    'Romantic', 'Nostalgic', 'Fusion', 'Authentic', 'Experimental',
    'Intimate', 'Social', 'Artisanal', 'Street Food', 'Fine Dining'
  ];

  const handleAddTag = (tag) => {
    if (!moodTags.includes(tag)) {
      setMoodTags([...moodTags, tag]);
    }
    setCurrentTag('');
  };

  const handleRemoveTag = (tag) => {
    setMoodTags(moodTags.filter(item => item !== tag));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag(currentTag.trim());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (moodTags.length === 0) {
      setError('Please add at least one mood or taste tag');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/flavor-fusion/dining-moodboard', {
        moodTags,
        location: location || undefined
      });
      
      setMoodboard(response.data);
    } catch (err) {
      setError('Failed to generate dining moodboard. Please try again.');
      console.error('Error generating dining moodboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dynamic-dining-moodboard">
      <div className="moodboard-header">
        <h2>Dynamic Dining Moodboard</h2>
        <p>Create your perfect dining experience based on mood and taste</p>
      </div>

      <form onSubmit={handleSubmit} className="moodboard-form">
        <div className="form-group">
          <label htmlFor="location">Location (Optional)</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Barcelona, Spain"
          />
        </div>

        <div className="form-group">
          <label htmlFor="moodTag">Add Mood & Taste Tags</label>
          <div className="tag-input-group">
            <input
              type="text"
              id="moodTag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Cozy, Spicy, Vegetarian"
            />
            <button 
              type="button" 
              className="add-tag-button"
              onClick={() => handleAddTag(currentTag.trim())}
              disabled={currentTag.trim() === ''}
            >
              Add
            </button>
          </div>
        </div>

        <div className="suggested-tags">
          <p>Suggested tags:</p>
          <div className="tag-suggestions">
            {suggestedTags.map((tag, index) => (
              <button
                key={index}
                type="button"
                className="tag-suggestion"
                onClick={() => handleAddTag(tag)}
                disabled={moodTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="selected-tags">
          {moodTags.map((tag, index) => (
            <div key={index} className="selected-tag">
              <span>{tag}</span>
              <button 
                type="button"
                className="remove-tag"
                onClick={() => handleRemoveTag(tag)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="generate-button" disabled={loading || moodTags.length === 0}>
          {loading ? 'Creating...' : 'Create Moodboard'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {moodboard && (
        <div className="moodboard-result">
          <h3>Your Dining Moodboard</h3>
          
          <div className="moodboard-aesthetic">
            <h4>Dining Aesthetic: {moodboard.aesthetic}</h4>
            <p>{moodboard.description}</p>
          </div>
          
          <div className="dining-recommendations">
            <h4>Curated Dining List</h4>
            
            <div className="dining-cards">
              {moodboard.diningSpots.map((spot, index) => (
                <div key={index} className="dining-card">
                  <div className="dining-image-placeholder">
                    {/* In a real implementation, this would be an actual image */}
                    <div className="placeholder-text">{spot.name}</div>
                  </div>
                  
                  <div className="dining-content">
                    <h5>{spot.name}</h5>
                    <p className="dining-type">{spot.type}</p>
                    <p>{spot.description}</p>
                    
                    <div className="taste-match">
                      <span>Matches your taste:</span> {spot.tasteMatch}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="sample-menu">
            <h4>Sample Menu</h4>
            
            <div className="menu-items">
              {moodboard.sampleMenu.map((item, index) => (
                <div key={index} className="menu-item">
                  <h5>{item.name}</h5>
                  <p className="item-price">{item.price}</p>
                  <p className="item-description">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="ambience-preview">
            <h4>Ambience Preview</h4>
            
            <div className="ambience-details">
              <div className="ambience-section">
                <h5>Music Recommendation</h5>
                <div className="music-preview">
                  <p>{moodboard.ambience.music.description}</p>
                  <button className="spotify-button">
                    <i className="fab fa-spotify"></i> Listen on Spotify
                  </button>
                </div>
              </div>
              
              <div className="ambience-section">
                <h5>Lighting & Decor</h5>
                <p>{moodboard.ambience.lighting}</p>
                <p>{moodboard.ambience.decor}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicDiningMoodboard;
