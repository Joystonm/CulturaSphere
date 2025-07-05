import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// Import Leaflet and our custom CSS
import L from 'leaflet';
import '../../styles/leaflet.css';

const TasteToGeoVisualizer = () => {
  const [interests, setInterests] = useState([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState(null);
  const [error, setError] = useState('');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const handleAddInterest = () => {
    if (currentInterest.trim() !== '' && !interests.includes(currentInterest.trim())) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(item => item !== interest));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddInterest();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (interests.length === 0) {
      setError('Please add at least one interest');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // For demo purposes, we'll use mock data instead of making an actual API call
      // In a real implementation, this would be:
      // const response = await axios.post('/api/flavor-fusion/taste-to-geo', { interests });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockDestinations = generateMockDestinations(interests);
      setDestinations(mockDestinations);
    } catch (err) {
      setError('Failed to generate destination matches. Please try again.');
      console.error('Error generating destination matches:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate mock destination data
  const generateMockDestinations = (interests) => {
    // Expanded destination options
    const allDestinations = [
      {
        name: 'Tokyo, Japan',
        description: 'A vibrant metropolis blending ultramodern and traditional, from neon-lit skyscrapers to historic temples.',
        baseScore: 70,
        tags: ['anime', 'manga', 'technology', 'sushi', 'ramen', 'japanese', 'asian', 'urban', 'modern', 'traditional', 'fashion', 'shopping', 'gaming', 'electronics', 'pop culture', 'cherry blossoms', 'temples', 'shrines'],
        defaultReasons: [
          'World-renowned culinary scene with diverse options',
          'Blend of traditional and contemporary art forms',
          'Vibrant music scene spanning multiple genres',
          'Cutting-edge technology and innovation'
        ],
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [35.6762, 139.6503]
      },
      {
        name: 'Amsterdam, Netherlands',
        description: 'A city of artistic heritage, elaborate canal system, and narrow houses with gabled facades.',
        baseScore: 70,
        tags: ['art', 'museum', 'canals', 'cycling', 'bicycles', 'dutch', 'european', 'van gogh', 'rembrandt', 'architecture', 'design', 'liberal', 'tulips', 'cheese', 'windmills', 'history', 'beer'],
        defaultReasons: [
          'Rich museum culture featuring renowned art collections',
          'Thriving contemporary music scene',
          'Bicycle-friendly urban environment',
          'Progressive cultural attitudes'
        ],
        image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [52.3676, 4.9041]
      },
      {
        name: 'Reykjavik, Iceland',
        description: 'A city of striking contrasts where geothermal energy powers a vibrant cultural scene against a backdrop of dramatic landscapes.',
        baseScore: 70,
        tags: ['nature', 'landscape', 'northern lights', 'aurora', 'geothermal', 'hot springs', 'indie music', 'bjork', 'sigur ros', 'nordic', 'viking', 'sustainable', 'eco-friendly', 'waterfalls', 'glaciers', 'volcanoes', 'literature'],
        defaultReasons: [
          'Strong connection to nature and sustainability',
          'Thriving indie music scene',
          'Contemporary Nordic cuisine',
          'Literary heritage and storytelling tradition'
        ],
        image: 'https://images.unsplash.com/photo-1504541095505-2b5be8e5a400?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [64.1466, -21.9426]
      },
      {
        name: 'Barcelona, Spain',
        description: 'A city known for its art and architecture, with the fantastical Sagrada Família church and other modernist landmarks.',
        baseScore: 70,
        tags: ['architecture', 'design', 'gaudi', 'mediterranean', 'tapas', 'spanish', 'european', 'beach', 'soccer', 'football', 'art', 'picasso', 'modernism', 'gothic', 'seafood', 'wine', 'festivals'],
        defaultReasons: [
          'Rich architectural heritage featuring Gaudí\'s works',
          'Mediterranean cuisine with emphasis on fresh ingredients',
          'Vibrant street life and cultural festivals',
          'Strong connection to modern art movements'
        ],
        image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [41.3851, 2.1734]
      },
      {
        name: 'Melbourne, Australia',
        description: 'A coastal capital known for its vibrant arts scene, food culture, and Victorian-era architecture.',
        baseScore: 70,
        tags: ['coffee', 'cafe', 'music', 'street art', 'graffiti', 'australian', 'multicultural', 'food', 'wine', 'sports', 'cricket', 'tennis', 'arts', 'festivals', 'beaches', 'coastal', 'hipster'],
        defaultReasons: [
          'Thriving coffee and café culture',
          'Street art and creative urban spaces',
          'Multicultural culinary scene',
          'Live music venues and festivals'
        ],
        image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [-37.8136, 144.9631]
      },
      {
        name: 'Kyoto, Japan',
        description: 'The cultural heart of Japan with over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites.',
        baseScore: 70,
        tags: ['temples', 'shrines', 'traditional', 'japanese', 'zen', 'gardens', 'geisha', 'tea ceremony', 'bamboo', 'kimono', 'history', 'ancient', 'meditation', 'buddhism', 'shinto', 'cherry blossoms', 'autumn leaves'],
        defaultReasons: [
          'Preserved traditional Japanese architecture and gardens',
          'Authentic cultural experiences including tea ceremonies',
          'Seasonal beauty with cherry blossoms and autumn foliage',
          'Spiritual atmosphere with numerous temples and shrines'
        ],
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [35.0116, 135.7681]
      },
      {
        name: 'Paris, France',
        description: 'The City of Light, known for its art, fashion, gastronomy, and cultural landmarks like the Eiffel Tower and Louvre Museum.',
        baseScore: 70,
        tags: ['art', 'fashion', 'cuisine', 'wine', 'romance', 'french', 'european', 'louvre', 'eiffel tower', 'history', 'architecture', 'literature', 'cafe', 'pastry', 'cheese', 'luxury', 'cinema', 'philosophy'],
        defaultReasons: [
          'World-class museums and art collections',
          'Renowned culinary scene from street food to fine dining',
          'Iconic architecture spanning centuries',
          'Rich literary and philosophical heritage'
        ],
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [48.8566, 2.3522]
      },
      {
        name: 'New Orleans, USA',
        description: 'A melting pot of cultures known for its distinctive music, Creole cuisine, unique dialect, and annual celebrations like Mardi Gras.',
        baseScore: 70,
        tags: ['jazz', 'blues', 'music', 'food', 'creole', 'cajun', 'mardi gras', 'carnival', 'history', 'french quarter', 'southern', 'american', 'voodoo', 'mississippi', 'architecture', 'festivals', 'nightlife'],
        defaultReasons: [
          'Birthplace of jazz with vibrant live music scene',
          'Unique fusion cuisine reflecting multicultural heritage',
          'Distinctive architecture in the French Quarter',
          'Rich traditions and festivals throughout the year'
        ],
        image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [29.9511, -90.0715]
      },
      {
        name: 'Marrakech, Morocco',
        description: 'A former imperial city with a medieval medina, maze-like alleys, and vibrant souks selling traditional textiles, pottery, and jewelry.',
        baseScore: 70,
        tags: ['markets', 'souks', 'medina', 'moroccan', 'african', 'arabic', 'islamic', 'desert', 'spices', 'textiles', 'architecture', 'gardens', 'history', 'crafts', 'tea', 'tagine', 'colors'],
        defaultReasons: [
          'Sensory experience of colors, scents, and sounds in the souks',
          'Rich architectural heritage with intricate Islamic designs',
          'Traditional craftsmanship in textiles, pottery, and metalwork',
          'Flavorful cuisine featuring aromatic spices and slow-cooked dishes'
        ],
        image: 'https://images.unsplash.com/photo-1553102674-af685bb5fe40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [31.6295, -7.9811]
      },
      {
        name: 'Buenos Aires, Argentina',
        description: 'A sophisticated city with European-style architecture, rich cultural life, and the birthplace of tango.',
        baseScore: 70,
        tags: ['tango', 'dance', 'music', 'steak', 'wine', 'latin', 'spanish', 'literature', 'architecture', 'european', 'football', 'soccer', 'art', 'nightlife', 'cafe', 'history', 'politics'],
        defaultReasons: [
          'Passionate tango culture with milongas throughout the city',
          'Thriving arts scene with theaters, galleries, and street art',
          'Exceptional culinary experiences centered around beef and wine',
          'Blend of European and Latin American architectural styles'
        ],
        image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [-34.6037, -58.3816]
      },
      {
        name: 'Istanbul, Turkey',
        description: 'A transcontinental city straddling Europe and Asia, reflecting the cultural influences of the many empires that ruled there.',
        baseScore: 70,
        tags: ['history', 'architecture', 'bazaar', 'market', 'turkish', 'ottoman', 'islamic', 'byzantine', 'tea', 'coffee', 'spices', 'carpets', 'mosques', 'bosphorus', 'east meets west', 'food', 'cats'],
        defaultReasons: [
          'Unique position bridging Eastern and Western cultures',
          'Rich historical layers from Byzantine to Ottoman empires',
          'Vibrant culinary scene with influences from across the region',
          'Stunning architectural masterpieces like Hagia Sophia'
        ],
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [41.0082, 28.9784]
      },
      {
        name: 'Berlin, Germany',
        description: 'A city of contrasts with a complex history, cutting-edge architecture, and a thriving contemporary arts scene.',
        baseScore: 70,
        tags: ['techno', 'electronic music', 'nightlife', 'art', 'history', 'wall', 'cold war', 'modern', 'alternative', 'beer', 'german', 'european', 'museums', 'galleries', 'street art', 'politics', 'design'],
        defaultReasons: [
          'Legendary nightlife and electronic music scene',
          'Thriving contemporary art and alternative culture',
          'Rich historical significance and memorials',
          'Diverse and experimental culinary landscape'
        ],
        image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        coordinates: [52.5200, 13.4050]
      }
    ];
    
    // Function to calculate match score based on interests
    const calculateMatchScore = (destination, userInterests) => {
      let score = destination.baseScore;
      let matchReasons = [...destination.defaultReasons];
      let customReasons = [];
      
      // Convert all interests to lowercase for comparison
      const lowerInterests = userInterests.map(interest => interest.toLowerCase());
      
      // Check each user interest against destination tags
      lowerInterests.forEach(interest => {
        // Split the interest into words for better matching
        const interestWords = interest.split(' ');
        
        interestWords.forEach(word => {
          if (word.length < 3) return; // Skip very short words
          
          // Check if any destination tag contains this word
          destination.tags.forEach(tag => {
            if (tag.includes(word) || word.includes(tag)) {
              // Add points based on how closely it matches
              if (tag === word) {
                score += 15; // Exact match
                customReasons.push(`Strong ${tag} culture and experiences`);
              } else if (tag.includes(word) || word.includes(tag)) {
                score += 8; // Partial match
              }
            }
          });
          
          // Special case matches based on categories
          if (['food', 'cuisine', 'culinary', 'gastronomy', 'dining'].includes(word)) {
            if (destination.tags.some(tag => ['food', 'cuisine', 'restaurant', 'culinary', 'gastronomy', 'dining'].includes(tag))) {
              score += 10;
              customReasons.push(`Renowned ${destination.name.split(',')[0]} cuisine and dining experiences`);
            }
          }
          
          if (['music', 'concert', 'festival', 'band', 'jazz', 'rock', 'classical'].includes(word)) {
            if (destination.tags.some(tag => ['music', 'jazz', 'rock', 'classical', 'concert', 'festival'].includes(tag))) {
              score += 10;
              customReasons.push(`Vibrant music scene featuring ${destination.tags.find(t => ['jazz', 'rock', 'classical', 'indie', 'electronic'].includes(t)) || 'local'} influences`);
            }
          }
          
          if (['art', 'museum', 'gallery', 'exhibition'].includes(word)) {
            if (destination.tags.some(tag => ['art', 'museum', 'gallery', 'exhibition'].includes(tag))) {
              score += 10;
              customReasons.push(`World-class art museums and galleries`);
            }
          }
          
          if (['nature', 'outdoor', 'hiking', 'landscape', 'mountain', 'beach'].includes(word)) {
            if (destination.tags.some(tag => ['nature', 'outdoor', 'hiking', 'landscape', 'mountain', 'beach', 'coast'].includes(tag))) {
              score += 10;
              customReasons.push(`Stunning natural landscapes and outdoor activities`);
            }
          }
          
          if (['history', 'ancient', 'heritage', 'historical'].includes(word)) {
            if (destination.tags.some(tag => ['history', 'ancient', 'heritage', 'historical', 'ruins'].includes(tag))) {
              score += 10;
              customReasons.push(`Rich historical sites and cultural heritage`);
            }
          }
        });
      });
      
      // Add some randomness to avoid identical scores (±5 points)
      score += Math.floor(Math.random() * 10) - 5;
      
      // Cap the score at 95
      score = Math.min(95, Math.max(50, score));
      
      // Combine default and custom reasons, removing duplicates
      const allReasons = [...new Set([...customReasons, ...matchReasons])];
      
      // Return only the top 4 reasons
      const topReasons = allReasons.slice(0, 4);
      
      return {
        ...destination,
        matchScore: score,
        matchReasons: topReasons
      };
    };
    
    // Calculate scores for all destinations
    const scoredDestinations = allDestinations.map(destination => 
      calculateMatchScore(destination, interests)
    );
    
    // Sort by match score and return top results
    return scoredDestinations.sort((a, b) => b.matchScore - a.matchScore);
  };

  useEffect(() => {
    // Initialize the map when destinations are available
    if (destinations && mapRef.current) {
      // If a map instance already exists, remove it
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      // Create a new map instance
      const map = L.map(mapRef.current).setView([20, 0], 2);
      mapInstanceRef.current = map;

      // Add the tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add markers for each destination
      destinations.forEach((destination, index) => {
        const markerSize = 30 - (index * 4); // Decrease size for lower-ranked destinations
        const markerColor = index === 0 ? '#ff6b6b' : '#4CAF50';
        
        // Create a custom icon
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            width: ${markerSize}px; 
            height: ${markerSize}px; 
            background-color: ${markerColor}; 
            border-radius: 50%; 
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: ${markerSize/2}px;
          ">${index + 1}</div>`,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize/2, markerSize/2]
        });
        
        // Add marker with popup
        const marker = L.marker(destination.coordinates, { icon })
          .addTo(map)
          .bindPopup(`
            <div style="text-align: center;">
              <h3 style="margin: 0 0 5px 0;">${destination.name}</h3>
              <p style="margin: 0 0 5px 0;">Match Score: ${Math.round(destination.matchScore)}%</p>
              <img src="${destination.image}" alt="${destination.name}" style="width: 100%; max-width: 200px; border-radius: 5px; margin-top: 5px;">
            </div>
          `);
        
        // Open popup for the top destination
        if (index === 0) {
          marker.openPopup();
        }
      });
    }
  }, [destinations]);

  return (
    <div className="taste-to-geo-visualizer">
      <div className="visualizer-header">
        <h2>Taste-to-Geo Visualizer</h2>
        <p>See how your cultural interests map to global destinations</p>
      </div>

      <form onSubmit={handleSubmit} className="visualizer-form">
        <div className="form-group">
          <label htmlFor="interest">Add Your Interests</label>
          <div className="interest-input-group">
            <input
              type="text"
              id="interest"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., Jazz music, Haruki Murakami, Sushi"
            />
            <button 
              type="button" 
              className="add-interest-button"
              onClick={handleAddInterest}
            >
              Add
            </button>
          </div>
        </div>

        <div className="interest-tags">
          {interests.map((interest, index) => (
            <div key={index} className="interest-tag">
              <span>{interest}</span>
              <button 
                type="button"
                className="remove-tag"
                onClick={() => handleRemoveInterest(interest)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="visualize-button" disabled={loading || interests.length === 0}>
          {loading ? 'Analyzing...' : 'Visualize Destinations'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {destinations && (
        <div className="visualizer-result">
          <div className="map-container" ref={mapRef}>
            {/* Leaflet map will be rendered here */}
          </div>
          
          <div className="destination-matches">
            <h3>Your Top Destination Matches</h3>
            
            <div className="destination-list">
              {destinations.map((destination, index) => (
                <div key={index} className="destination-match-card">
                  <div className="match-score">
                    <div 
                      className="score-circle" 
                      style={{ 
                        background: `conic-gradient(#4CAF50 ${destination.matchScore * 3.6}deg, #f0f0f0 0deg)` 
                      }}
                    >
                      <span>{Math.round(destination.matchScore)}%</span>
                    </div>
                  </div>
                  
                  <div className="destination-info">
                    <div className="destination-header">
                      <h4>{destination.name}</h4>
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="destination-thumbnail"
                      />
                    </div>
                    <p>{destination.description}</p>
                    
                    <div className="match-reasons">
                      <h5>Why it matches your taste:</h5>
                      <ul>
                        {destination.matchReasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasteToGeoVisualizer;
