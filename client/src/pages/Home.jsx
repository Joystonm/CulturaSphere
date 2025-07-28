import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [preferences, setPreferences] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isOnboarded, setIsOnboarded] = useState(false);

  const popularTags = [
    'Music', 'Movies', 'Books', 'Fashion', 'Travel', 'Food', 
    'Art', 'Photography', 'Gaming', 'Sports', 'Technology'
  ];

  const handleAddPreference = (tag) => {
    if (!preferences.includes(tag)) {
      setPreferences([...preferences, tag]);
    }
  };

  const handleRemovePreference = (tag) => {
    setPreferences(preferences.filter(pref => pref !== tag));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      handleAddPreference(inputValue.trim());
      setInputValue('');
    }
  };

  const handleSubmitPreferences = () => {
    // Here you would typically save these preferences to user profile
    console.log('Submitted preferences:', preferences);
    setIsOnboarded(true);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1 className="hero-title">Discover yourself through taste.</h1>
        <h2 className="hero-subtitle">Travel. Trends. Tales.</h2>
        <p className="hero-description">
          CulturaSphere uses AI to understand your unique taste profile and connect you with 
          personalized cultural experiences across domains.
        </p>
      </section>

      {!isOnboarded ? (
        <section className="onboarding-section">
          <h2>Tell us what you love:</h2>
          <p>Music? Movies? Books? Fashion?</p>
          
          <div className="preferences-input">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Type and press Enter to add..."
              className="preference-input"
            />
          </div>
          
          <div className="popular-tags">
            <p>Popular:</p>
            <div className="tags-container">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleAddPreference(tag)}
                  className="tag-button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {preferences.length > 0 && (
            <div className="selected-preferences">
              <p>Your selections:</p>
              <div className="selected-tags">
                {preferences.map(pref => (
                  <span key={pref} className="selected-tag">
                    {pref}
                    <button 
                      onClick={() => handleRemovePreference(pref)}
                      className="remove-tag"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <button 
            onClick={handleSubmitPreferences}
            disabled={preferences.length === 0}
            className="submit-preferences-btn"
          >
            Discover My Cultural Universe
          </button>
        </section>
      ) : (
        <section className="features-section">
          <div className="feature-card flavor-fusion-card">
            <div className="feature-icon">🌍</div>
            <h2>FlavorFusion</h2>
            <p>Travel and dining recommendations based on your cultural taste profile.</p>
            <Link to="/flavor-fusion" className="feature-link">
              Explore Destinations
            </Link>
          </div>

          <div className="feature-card trend-weaver-card">
            <div className="feature-icon">📊</div>
            <h2>TrendWeaver</h2>
            <p>Discover emerging cultural trends and insights aligned with your interests.</p>
            <Link to="/trend-weaver" className="feature-link">
              Explore Trends
            </Link>
          </div>

          {/* <div className="feature-card taste-quill-card">
            <div className="feature-icon">✒️</div>
            <h2>TasteQuill</h2>
            <p>AI-generated stories crafted in the style of your favorite creators and genres.</p>
            <Link to="/taste-quill" className="feature-link">
              Generate Stories
            </Link>
          </div> */}
          
        </section>
      )}
    </div>
  );
};

export default Home;
