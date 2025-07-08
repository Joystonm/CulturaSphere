import React, { useState } from 'react';

const CulturalWhitespaceFinder = () => {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');
  const [whitespaces, setWhitespaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWhitespace, setSelectedWhitespace] = useState(null);

  // Sample domains and audiences
  const domains = [
    { id: 'all', name: 'All Domains' },
    { id: 'fashion', name: 'Fashion & Apparel' },
    { id: 'food', name: 'Food & Beverage' },
    { id: 'media', name: 'Media & Entertainment' },
    { id: 'tech', name: 'Technology' },
    { id: 'wellness', name: 'Health & Wellness' },
    { id: 'home', name: 'Home & Living' }
  ];

  const audiences = [
    { id: 'all', name: 'All Audiences' },
    { id: 'gen-z', name: 'Gen Z' },
    { id: 'millennials', name: 'Millennials' },
    { id: 'gen-x', name: 'Gen X' },
    { id: 'boomers', name: 'Baby Boomers' },
    { id: 'urban', name: 'Urban Dwellers' },
    { id: 'suburban', name: 'Suburban Residents' },
    { id: 'rural', name: 'Rural Communities' }
  ];

  // Sample whitespace data - in a real app, this would come from Qloo + Groq
  const sampleWhitespaces = [
    {
      id: 1,
      title: 'Afrofuturism + Eco-Design',
      description: 'The intersection of Afrofuturism aesthetics with sustainable design principles represents an underserved market with strong internal affinity.',
      affinityScore: 87,
      saturationLevel: 'Low',
      domain: 'fashion',
      audience: 'gen-z',
      conceptBrief: 'A brand that reimagines traditional African textiles and patterns through sustainable materials and futuristic silhouettes. The aesthetic would blend cultural heritage with forward-thinking environmental consciousness.',
      productIdeas: [
        'Modular, adaptable accessories that transform for multiple uses',
        'Biodegradable textiles with embedded technology for climate adaptation',
        'Limited edition collaborations with Afrofuturist artists and designers',
        'Digital/physical hybrid experiences that connect product stories to cultural narratives'
      ],
      culturalAmbassadors: [
        'Emerging digital artists working at the intersection of African diaspora culture and environmental themes',
        'Sustainable fashion advocates with authentic connections to African design traditions',
        'Musicians blending traditional African instruments with electronic production'
      ]
    },
    {
      id: 2,
      title: 'Post-Apocalyptic Anime + Analog Photography',
      description: 'Fans of post-apocalyptic anime show strong affinity for analog photography, creating an untapped niche for visual storytelling products and experiences.',
      affinityScore: 82,
      saturationLevel: 'Very Low',
      domain: 'media',
      audience: 'millennials',
      conceptBrief: 'A limited-run zine series that combines analog photography techniques with post-apocalyptic anime-inspired narratives. Each issue would explore themes of memory, technology, and environmental change through visual storytelling.',
      productIdeas: [
        'Disposable cameras with custom filters inspired by iconic anime color palettes',
        'Workshop series teaching analog photography techniques to create dystopian/utopian visual narratives',
        'Collector\'s edition prints pairing anime artists with analog photographers',
        'Pop-up gallery experiences in unexpected urban locations'
      ],
      culturalAmbassadors: [
        'Photographers experimenting with damaged film and alternative processes',
        'Anime artists with environmental or futurist themes in their work',
        'Zine makers and independent publishers with cult followings'
      ]
    },
    {
      id: 3,
      title: 'Fermentation Culture + Modern Architecture',
      description: 'The unexpected intersection between fermentation enthusiasts and modern architecture admirers reveals an opportunity for experiential dining concepts.',
      affinityScore: 79,
      saturationLevel: 'Very Low',
      domain: 'food',
      audience: 'millennials',
      conceptBrief: 'A dining concept that explores the relationship between fermentation processes and architectural principles. The experience would highlight how time, space, and transformation apply to both domains.',
      productIdeas: [
        'Subscription service delivering architectural vessels designed specifically for home fermentation',
        'Pop-up dining experiences in architecturally significant spaces',
        'Educational content connecting fermentation timelines with architectural movements',
        'Design-forward fermentation tools for home kitchens'
      ],
      culturalAmbassadors: [
        'Chefs specializing in fermentation with interest in spatial design',
        'Architects exploring food systems and preservation',
        'Food scientists with design backgrounds'
      ]
    },
    {
      id: 4,
      title: 'Ambient Music + Urban Gardening',
      description: 'The strong affinity between ambient music listeners and urban gardening enthusiasts suggests an opportunity for audio-enhanced plant care experiences.',
      affinityScore: 84,
      saturationLevel: 'Low',
      domain: 'wellness',
      audience: 'millennials',
      conceptBrief: 'A plant care system that integrates ambient soundscapes specifically composed to enhance plant growth and human wellbeing. The concept would bridge biophilic design, sound healing, and urban agriculture.',
      productIdeas: [
        'Smart planters with embedded speakers playing generative music responsive to plant health',
        'Subscription service pairing rare plants with exclusive ambient compositions',
        'Community gardens with spatial audio installations',
        'Plant care app with integrated ambient music library'
      ],
      culturalAmbassadors: [
        'Ambient composers with interests in biophilia and ecology',
        'Urban agriculture advocates with backgrounds in sound design',
        'Wellness influencers focusing on plant care and mindfulness'
      ]
    },
    {
      id: 5,
      title: 'Speculative Fiction + Craft Spirits',
      description: 'Readers of speculative fiction show unusually high affinity for craft spirits, creating an opportunity for narrative-driven beverage experiences.',
      affinityScore: 81,
      saturationLevel: 'Low',
      domain: 'food',
      audience: 'gen-x',
      conceptBrief: 'A limited edition series of craft spirits where each release is tied to an original speculative fiction story. The flavor profiles, packaging, and accompanying narrative would create a multisensory storytelling experience.',
      productIdeas: [
        'Quarterly spirit releases with accompanying illustrated short stories',
        'Tasting events featuring author readings and discussions',
        'Collectible bottle designs by speculative fiction illustrators',
        'Interactive digital experiences extending the story world'
      ],
      culturalAmbassadors: [
        'Speculative fiction authors with interests in culinary arts',
        'Craft distillers with storytelling approaches to their products',
        'Illustrators working across beverage design and book covers'
      ]
    }
  ];

  const handleSearch = () => {
    setIsLoading(true);
    setSelectedWhitespace(null);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Filter whitespaces based on selected domain and audience
      const filteredWhitespaces = sampleWhitespaces.filter(whitespace => {
        return (
          (selectedDomain === 'all' || whitespace.domain === selectedDomain) &&
          (selectedAudience === 'all' || whitespace.audience === selectedAudience)
        );
      });
      
      setWhitespaces(filteredWhitespaces);
      setIsLoading(false);
    }, 1500);
  };

  const handleWhitespaceSelect = (whitespace) => {
    setSelectedWhitespace(whitespace);
  };

  return (
    <div className="cultural-whitespace-finder">
      <div className="whitespace-header">
        <h2>Cultural Whitespace Finder</h2>
        <p>Identify untapped cultural intersections with strong affinity but low market saturation</p>
      </div>
      
      <div className="search-controls">
        <div className="filter-group">
          <label>Domain</label>
          <select 
            value={selectedDomain} 
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            {domains.map(domain => (
              <option key={domain.id} value={domain.id}>{domain.name}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Target Audience</label>
          <select 
            value={selectedAudience} 
            onChange={(e) => setSelectedAudience(e.target.value)}
          >
            {audiences.map(audience => (
              <option key={audience.id} value={audience.id}>{audience.name}</option>
            ))}
          </select>
        </div>
        
        <button 
          className="search-button"
          onClick={handleSearch}
        >
          Find Whitespace Opportunities
        </button>
      </div>
      
      {isLoading ? (
        <div className="loading-indicator">
          <p>Analyzing cultural intersections...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="results-container">
          {whitespaces.length > 0 ? (
            <div className="whitespace-results">
              <div className="whitespace-list">
                <h3>Identified Opportunities</h3>
                {whitespaces.map(whitespace => (
                  <div 
                    key={whitespace.id} 
                    className={`whitespace-item ${selectedWhitespace?.id === whitespace.id ? 'selected' : ''}`}
                    onClick={() => handleWhitespaceSelect(whitespace)}
                  >
                    <div className="whitespace-title">{whitespace.title}</div>
                    <div className="whitespace-metrics">
                      <span className="affinity-score">
                        Affinity: <strong>{whitespace.affinityScore}%</strong>
                      </span>
                      <span className="saturation-level">
                        Saturation: <strong className={`saturation-${whitespace.saturationLevel.toLowerCase().replace(' ', '-')}`}>
                          {whitespace.saturationLevel}
                        </strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedWhitespace && (
                <div className="whitespace-detail">
                  <h3>{selectedWhitespace.title}</h3>
                  <p className="whitespace-description">{selectedWhitespace.description}</p>
                  
                  <div className="concept-brief">
                    <h4>Concept Brief</h4>
                    <p>{selectedWhitespace.conceptBrief}</p>
                  </div>
                  
                  <div className="product-ideas">
                    <h4>Sample Product Ideas</h4>
                    <ul>
                      {selectedWhitespace.productIdeas.map((idea, index) => (
                        <li key={index}>{idea}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="cultural-ambassadors">
                    <h4>Suggested Cultural Ambassadors</h4>
                    <ul>
                      {selectedWhitespace.culturalAmbassadors.map((ambassador, index) => (
                        <li key={index}>{ambassador}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="whitespace-actions">
                    <button className="export-button">
                      Export Opportunity Brief
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : whitespaces.length === 0 && !isLoading ? (
            <div className="no-results">
              <p>No whitespace opportunities found for your current selection. Try different filters or check back later as our cultural data is continuously updated.</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CulturalWhitespaceFinder;
