import React, { useState } from 'react';
import axios from 'axios';

const MoodBlendingEngine = () => {
  const [mood, setMood] = useState('');
  const [taste, setTaste] = useState('');
  const [loading, setLoading] = useState(false);
  const [blendResult, setBlendResult] = useState(null);
  const [error, setError] = useState('');

  const suggestedMoods = [
    'Melancholic', 'Romantic', 'Adventurous', 'Nostalgic', 'Contemplative',
    'Energetic', 'Peaceful', 'Mysterious', 'Whimsical', 'Sophisticated'
  ];

  const suggestedTastes = [
    'Cyberpunk', 'Bollywood', 'Jazz', 'Minimalist', 'Bohemian',
    'Art Deco', 'Folklore', 'Futuristic', 'Vintage', 'Surrealist'
  ];

  const handleMoodClick = (selectedMood) => {
    setMood(selectedMood);
  };

  const handleTasteClick = (selectedTaste) => {
    setTaste(selectedTaste);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!mood || !taste) {
      setError('Please select both a mood and a taste');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real implementation, this would be:
      // const response = await axios.post('/api/flavor-fusion/mood-blend', { mood, taste });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockBlendResult = generateMockBlendResult(mood, taste);
      setBlendResult(mockBlendResult);
    } catch (err) {
      setError('Failed to generate mood blend. Please try again.');
      console.error('Error generating mood blend:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock blend result data
  const generateMockBlendResult = (mood, taste) => {
    // Determine destination based on mood and taste combination
    let destination, blendName;
    
    if ((mood === 'Melancholic' && taste === 'Cyberpunk') || 
        (mood === 'Mysterious' && taste === 'Futuristic')) {
      destination = 'Tokyo, Japan';
      blendName = 'Neo-Tokyo Dreamer';
    } else if ((mood === 'Romantic' && taste === 'Bollywood') || 
               (mood === 'Whimsical' && taste === 'Folklore')) {
      destination = 'Jaipur, India';
      blendName = 'Poetic Rajasthan';
    } else if ((mood === 'Nostalgic' && taste === 'Jazz') || 
               (mood === 'Sophisticated' && taste === 'Art Deco')) {
      destination = 'New Orleans, USA';
      blendName = 'Vintage Rhythm Seeker';
    } else if ((mood === 'Peaceful' && taste === 'Minimalist') || 
               (mood === 'Contemplative' && taste === 'Bohemian')) {
      destination = 'Kyoto, Japan';
      blendName = 'Zen Wanderer';
    } else if ((mood === 'Adventurous' && taste === 'Vintage') || 
               (mood === 'Energetic' && taste === 'Surrealist')) {
      destination = 'Barcelona, Spain';
      blendName = 'Gaudi\'s Dreamer';
    } else {
      destination = 'Copenhagen, Denmark';
      blendName = 'Nordic Explorer';
    }
    
    return {
      blendName: blendName,
      destination: destination,
      destinationDescription: `${destination} perfectly embodies the blend of ${mood.toLowerCase()} mood and ${taste.toLowerCase()} aesthetic, offering a unique atmosphere where these sensibilities naturally converge.`,
      experiences: [
        {
          title: `${mood} ${taste} Walking Tour`,
          description: `Explore the ${mood.toLowerCase()} corners of ${destination} while discovering hidden gems that showcase the local ${taste.toLowerCase()} influence.`
        },
        {
          title: `${taste} Workshop Experience`,
          description: `Participate in a hands-on workshop that captures the essence of ${taste} culture with a distinctly ${mood.toLowerCase()} atmosphere.`
        },
        {
          title: `${mood} Evening Excursion`,
          description: `As day turns to night, experience the city's transformation through a carefully curated excursion that highlights the ${mood.toLowerCase()} qualities of ${destination}.`
        }
      ],
      dining: [
        {
          name: `${taste} Fusion Café`,
          description: `A unique dining spot where ${taste} influences meet local cuisine in a distinctly ${mood.toLowerCase()} setting.`
        },
        {
          name: `${mood} Bistro`,
          description: `This intimate restaurant captures the essence of ${mood.toLowerCase()} dining with subtle ${taste.toLowerCase()} design elements.`
        }
      ],
      soundtrack: [
        {
          title: `${mood} Mornings`,
          artist: `The ${taste} Collective`
        },
        {
          title: `${destination} Dreams`,
          artist: `${taste} Soundscapes`
        },
        {
          title: `${mood} Journey`,
          artist: `${taste} Explorers`
        }
      ]
    };
  };

  return (
    <div className="mood-blending-engine">
      <div className="blending-header">
        <h2>Mood Blending Engine</h2>
        <p>Combine mood and taste for a unique travel experience</p>
      </div>

      <form onSubmit={handleSubmit} className="blending-form">
        <div className="form-section">
          <h3>Select a Mood</h3>
          <div className="mood-grid">
            {suggestedMoods.map((suggestedMood, index) => (
              <button
                key={index}
                type="button"
                className={`mood-button ${mood === suggestedMood ? 'selected' : ''}`}
                onClick={() => handleMoodClick(suggestedMood)}
              >
                {suggestedMood}
              </button>
            ))}
          </div>
          
          <div className="custom-input">
            <label htmlFor="customMood">Or enter your own:</label>
            <input
              type="text"
              id="customMood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              placeholder="e.g., Dreamy"
            />
          </div>
        </div>
        
        <div className="form-section">
          <h3>Select a Taste</h3>
          <div className="taste-grid">
            {suggestedTastes.map((suggestedTaste, index) => (
              <button
                key={index}
                type="button"
                className={`taste-button ${taste === suggestedTaste ? 'selected' : ''}`}
                onClick={() => handleTasteClick(suggestedTaste)}
              >
                {suggestedTaste}
              </button>
            ))}
          </div>
          
          <div className="custom-input">
            <label htmlFor="customTaste">Or enter your own:</label>
            <input
              type="text"
              id="customTaste"
              value={taste}
              onChange={(e) => setTaste(e.target.value)}
              placeholder="e.g., Film Noir"
            />
          </div>
        </div>

        <button type="submit" className="blend-button" disabled={loading || !mood || !taste}>
          {loading ? 'Blending...' : 'Blend Experience'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {blendResult && (
        <div className="blend-result">
          <div className="blend-header">
            <h3>{mood} + {taste}</h3>
            <div className="blend-badge">{blendResult.blendName}</div>
          </div>
          
          <div className="destination-recommendation">
            <h4>Perfect Destination: {blendResult.destination}</h4>
            <p>{blendResult.destinationDescription}</p>
          </div>
          
          <div className="experience-sections">
            <div className="experience-section">
              <h4>Experiences</h4>
              <ul className="experiences-list">
                {blendResult.experiences.map((experience, index) => (
                  <li key={index}>
                    <strong>{experience.title}</strong>
                    <p>{experience.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="experience-section">
              <h4>Dining</h4>
              <ul className="dining-list">
                {blendResult.dining.map((item, index) => (
                  <li key={index}>
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="experience-section">
              <h4>Soundtrack</h4>
              <div className="soundtrack-items">
                {blendResult.soundtrack.map((track, index) => (
                  <div key={index} className="soundtrack-item">
                    <span className="track-name">{track.title}</span>
                    <span className="track-artist">by {track.artist}</span>
                  </div>
                ))}
              </div>
              <button className="spotify-button">
                <i className="fab fa-spotify"></i> Listen on Spotify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodBlendingEngine;
