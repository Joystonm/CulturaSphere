import React, { useState } from 'react';
import axios from 'axios';

const TasteAlignedPersonas = () => {
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real implementation, this would be:
      // const response = await axios.post('/api/flavor-fusion/travel-persona', { interests });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockPersona = generateMockPersona(interests);
      setPersona(mockPersona);
    } catch (err) {
      setError('Failed to generate travel persona. Please try again.');
      console.error('Error generating travel persona:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock persona data
  const generateMockPersona = (interests) => {
    // Extract keywords from interests
    const keywords = interests.toLowerCase().split(/[,.\s]+/).filter(word => word.length > 3);
    
    // Choose a persona type based on interests
    let personaType;
    if (interests.toLowerCase().includes('art') || interests.toLowerCase().includes('museum')) {
      personaType = 'Urban Bohemian Explorer';
    } else if (interests.toLowerCase().includes('nature') || interests.toLowerCase().includes('hiking')) {
      personaType = 'Folklore + Forest Lover';
    } else {
      personaType = 'Cinematic Minimalist Nomad';
    }
    
    return {
      name: personaType,
      category: 'Cultural Traveler',
      description: `As a ${personaType}, you seek authentic experiences that connect you with local culture and artistic expressions. You value meaningful interactions over tourist attractions and prefer to immerse yourself in the daily rhythms of your destination.`,
      travelStyle: [
        'Slow travel with extended stays in each location',
        'Preference for local neighborhoods over tourist districts',
        'Seeking authentic cultural exchanges',
        'Balancing planned activities with spontaneous discoveries'
      ],
      accommodations: [
        {
          name: 'Boutique Art Hotel',
          description: 'A small, design-focused hotel featuring local art and architecture in a central but quiet neighborhood.'
        },
        {
          name: 'Converted Heritage Building',
          description: 'A thoughtfully renovated historical building that preserves original character while offering modern comforts.'
        }
      ],
      cafes: [
        {
          name: 'Literary Café',
          description: 'A quiet café with bookshelves lining the walls, perfect for reading or journaling while enjoying locally-sourced coffee.'
        },
        {
          name: 'Artist\'s Workshop Café',
          description: 'Part café, part working studio where local artists create while visitors enjoy unique beverages and small plates.'
        }
      ],
      playlist: {
        name: 'Cultural Immersion Soundtrack',
        description: 'A curated mix of contemporary indie tracks and traditional music from your destination, perfect for wandering city streets or relaxing after a day of exploration.'
      },
      books: [
        {
          title: 'The Art of Travel',
          author: 'Alain de Botton',
          description: 'A philosophical look at why and how we travel, perfect for the reflective traveler.'
        },
        {
          title: 'Local Narratives',
          author: 'Various Local Authors',
          description: 'A collection of short stories by authors from your destination, offering intimate glimpses into the culture.'
        }
      ]
    };
  };

  return (
    <div className="taste-aligned-personas">
      <div className="personas-header">
        <h2>Taste-Aligned Travel Personas</h2>
        <p>Discover your unique travel persona based on your cultural interests</p>
      </div>

      <form onSubmit={handleSubmit} className="personas-form">
        <div className="form-group">
          <label htmlFor="interests">Your Interests</label>
          <textarea
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Tell us about your favorite music, books, films, foods, art styles, etc."
            rows={4}
            required
          />
        </div>

        <button type="submit" className="generate-button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate My Travel Persona'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {persona && (
        <div className="persona-result">
          <div className="persona-card">
            <div className="persona-header">
              <h3>{persona.name}</h3>
              <div className="persona-badge">{persona.category}</div>
            </div>
            
            <p className="persona-description">{persona.description}</p>
            
            <div className="persona-details">
              <div className="detail-section">
                <h4>Travel Style</h4>
                <ul>
                  {persona.travelStyle.map((style, index) => (
                    <li key={index}>{style}</li>
                  ))}
                </ul>
              </div>
              
              <div className="detail-section">
                <h4>Accommodation Preferences</h4>
                <div className="accommodation-cards">
                  {persona.accommodations.map((accommodation, index) => (
                    <div key={index} className="accommodation-card">
                      <h5>{accommodation.name}</h5>
                      <p>{accommodation.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Café Recommendations</h4>
                <div className="cafe-cards">
                  {persona.cafes.map((cafe, index) => (
                    <div key={index} className="cafe-card">
                      <h5>{cafe.name}</h5>
                      <p>{cafe.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Spotify Playlist</h4>
                <div className="spotify-preview">
                  <div className="playlist-info">
                    <h5>{persona.playlist.name}</h5>
                    <p>{persona.playlist.description}</p>
                  </div>
                  <button className="spotify-button">
                    <i className="fab fa-spotify"></i> Listen on Spotify
                  </button>
                </div>
              </div>
              
              <div className="detail-section">
                <h4>Book Recommendations</h4>
                <div className="book-cards">
                  {persona.books.map((book, index) => (
                    <div key={index} className="book-card">
                      <h5>{book.title}</h5>
                      <p>by {book.author}</p>
                      <p className="book-description">{book.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasteAlignedPersonas;
