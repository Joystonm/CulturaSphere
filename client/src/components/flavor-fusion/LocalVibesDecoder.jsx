import React, { useState } from 'react';
import axios from 'axios';

const LocalVibesDecoder = () => {
  const [location, setLocation] = useState('');
  const [userStyle, setUserStyle] = useState('');
  const [tonePreference, setTonePreference] = useState('friendly');
  const [loading, setLoading] = useState(false);
  const [vibesData, setVibesData] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('cultural-norms');

  const toneOptions = [
    { value: 'friendly', label: 'Friendly & Helpful' },
    { value: 'humorous', label: 'Humorous & Light' },
    { value: 'poetic', label: 'Poetic & Descriptive' },
    { value: 'concise', label: 'Concise & Practical' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/flavor-fusion/local-vibes', {
        location,
        userStyle,
        tonePreference
      });
      
      setVibesData(response.data);
    } catch (err) {
      setError('Failed to decode local vibes. Please try again.');
      console.error('Error decoding local vibes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="local-vibes-decoder">
      <div className="decoder-header">
        <h2>Local Vibes Decoder</h2>
        <p>Understand the cultural nuances of your destination</p>
      </div>

      <form onSubmit={handleSubmit} className="decoder-form">
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Seoul, South Korea"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userStyle">Your Style & Interests (Optional)</label>
          <textarea
            id="userStyle"
            value={userStyle}
            onChange={(e) => setUserStyle(e.target.value)}
            placeholder="e.g., I'm into indie music, street photography, and coffee culture"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tonePreference">Tone Preference</label>
          <select
            id="tonePreference"
            value={tonePreference}
            onChange={(e) => setTonePreference(e.target.value)}
          >
            {toneOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="decode-button" disabled={loading}>
          {loading ? 'Decoding...' : 'Decode Local Vibes'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {vibesData && (
        <div className="vibes-result">
          <div className="location-header">
            <h3>{vibesData.locationName}</h3>
            <p className="location-tagline">{vibesData.tagline}</p>
          </div>
          
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'cultural-norms' ? 'active' : ''}`}
              onClick={() => setActiveTab('cultural-norms')}
            >
              Cultural Norms
            </button>
            <button 
              className={`tab ${activeTab === 'fashion-etiquette' ? 'active' : ''}`}
              onClick={() => setActiveTab('fashion-etiquette')}
            >
              Fashion & Etiquette
            </button>
            <button 
              className={`tab ${activeTab === 'local-events' ? 'active' : ''}`}
              onClick={() => setActiveTab('local-events')}
            >
              Local Events
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'cultural-norms' && (
              <div className="cultural-norms">
                <div className="vibe-section">
                  <h4>Social Customs</h4>
                  <p>{vibesData.culturalNorms.socialCustoms}</p>
                </div>
                
                <div className="vibe-section">
                  <h4>Communication Style</h4>
                  <p>{vibesData.culturalNorms.communicationStyle}</p>
                </div>
                
                <div className="vibe-section">
                  <h4>Local Values</h4>
                  <ul className="values-list">
                    {vibesData.culturalNorms.localValues.map((value, index) => (
                      <li key={index}>{value}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'fashion-etiquette' && (
              <div className="fashion-etiquette">
                <div className="vibe-section">
                  <h4>Fashion Trends</h4>
                  <p>{vibesData.fashionEtiquette.fashionTrends}</p>
                </div>
                
                <div className="vibe-section">
                  <h4>Dining Etiquette</h4>
                  <ul className="etiquette-list">
                    {vibesData.fashionEtiquette.diningEtiquette.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="vibe-section">
                  <h4>Local Slang</h4>
                  <div className="slang-items">
                    {vibesData.fashionEtiquette.localSlang.map((slang, index) => (
                      <div key={index} className="slang-item">
                        <span className="slang-term">{slang.term}</span>
                        <span className="slang-meaning">{slang.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'local-events' && (
              <div className="local-events">
                <div className="vibe-section">
                  <h4>Events Matching Your Style</h4>
                  <div className="events-list">
                    {vibesData.localEvents.matchingEvents.map((event, index) => (
                      <div key={index} className="event-card">
                        <h5>{event.name}</h5>
                        <p className="event-time">{event.time}</p>
                        <p>{event.description}</p>
                        <div className="event-tags">
                          {event.tags.map((tag, idx) => (
                            <span key={idx} className="event-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="vibe-section">
                  <h4>Seasonal Highlights</h4>
                  <p>{vibesData.localEvents.seasonalHighlights}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="local-insight">
            <h4>Local Insight</h4>
            <blockquote>
              {vibesData.localInsight}
            </blockquote>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalVibesDecoder;
