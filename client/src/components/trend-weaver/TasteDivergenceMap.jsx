import React, { useState, useEffect } from 'react';

const TasteDivergenceMap = () => {
  const [selectedTaste, setSelectedTaste] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [divergenceData, setDivergenceData] = useState(null);
  const [customTaste, setCustomTaste] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Sample taste options
  const tasteOptions = [
    { id: 'kpop', name: 'K-pop' },
    { id: 'plantbased', name: 'Plant-based Diet' },
    { id: 'vintagefashion', name: 'Vintage Fashion' },
    { id: 'mindfulness', name: 'Mindfulness Practices' },
    { id: 'indiefilm', name: 'Independent Film' },
    { id: 'craftbeer', name: 'Craft Beer' },
    { id: 'custom', name: 'Custom Taste...' }
  ];

  // Sample divergence data - in a real app, this would come from Qloo + Groq
  const sampleDivergenceData = {
    'kpop': {
      regions: [
        {
          name: 'South Korea',
          domains: [
            { name: 'Fashion', items: ['High fashion', 'Luxury brands', 'Streetwear'], strength: 92 },
            { name: 'Food', items: ['Café culture', 'Food challenges', 'Mukbang content'], strength: 88 },
            { name: 'Media', items: ['Dance practice videos', 'Reality shows', 'Behind-the-scenes content'], strength: 95 },
            { name: 'Technology', items: ['Mobile gaming', 'Beauty tech', 'Smart home devices'], strength: 82 }
          ]
        },
        {
          name: 'United States',
          domains: [
            { name: 'Fashion', items: ['Streetwear', 'DIY fashion', 'Y2K revival'], strength: 85 },
            { name: 'Food', items: ['Korean snacks', 'Boba tea', 'Themed cafés'], strength: 79 },
            { name: 'Media', items: ['Reaction videos', 'Dance covers', 'Fan theories'], strength: 90 },
            { name: 'Technology', items: ['Streaming platforms', 'Social media', 'Digital collectibles'], strength: 87 }
          ]
        },
        {
          name: 'Southeast Asia',
          domains: [
            { name: 'Fashion', items: ['Idol-inspired looks', 'Accessories', 'Beauty trends'], strength: 91 },
            { name: 'Food', items: ['Korean street food', 'Character cafés', 'Fusion cuisine'], strength: 84 },
            { name: 'Media', items: ['Cover contests', 'Fan meetings', 'Local adaptations'], strength: 93 },
            { name: 'Technology', items: ['Mobile fandom apps', 'Virtual meet-ups', 'AR experiences'], strength: 86 }
          ]
        },
        {
          name: 'Europe',
          domains: [
            { name: 'Fashion', items: ['Minimalist takes', 'Sustainable K-fashion', 'Vintage fusion'], strength: 76 },
            { name: 'Food', items: ['Korean-European fusion', 'Home cooking', 'Pop-up events'], strength: 72 },
            { name: 'Media', items: ['Music analysis', 'Cultural commentary', 'Language learning'], strength: 81 },
            { name: 'Technology', items: ['Translation tools', 'Music production', 'Cultural exchange platforms'], strength: 78 }
          ]
        }
      ],
      strategicReport: "K-pop's cultural impact shows fascinating regional divergences that brands should consider when developing localized strategies. In South Korea, K-pop is deeply integrated with high fashion and luxury brands, while in the US, it connects more strongly with streetwear and DIY fashion communities. Southeast Asian fans show the highest engagement with beauty trends and character-themed experiences, creating opportunities for immersive retail concepts.\n\nThe most significant divergence appears in content consumption patterns: Korean fans prioritize dance and performance aspects, US fans focus on reaction and community content, Southeast Asian fans engage deeply with participatory experiences, and European fans show stronger interest in cultural and musical analysis.\n\nFor global brands, these divergences suggest a need for regionally tailored approaches that respect the different ways K-pop integrates into local cultural contexts. The strongest universal connections are around community experiences, visual aesthetics, and digital engagement, which could serve as foundations for cross-market campaigns."
    },
    'vintagefashion': {
      regions: [
        {
          name: 'North America',
          domains: [
            { name: 'Fashion', items: ['Americana workwear', 'Mid-century modern', '90s revival'], strength: 90 },
            { name: 'Home', items: ['Vinyl collecting', 'Antique furniture', 'Analog photography'], strength: 85 },
            { name: 'Media', items: ['Period dramas', 'Retro gaming', 'Classic film'], strength: 82 },
            { name: 'Food', items: ['Classic cocktails', 'Diners', 'Heritage recipes'], strength: 78 }
          ]
        },
        {
          name: 'Western Europe',
          domains: [
            { name: 'Fashion', items: ['Haute couture archives', 'Military surplus', 'Artisanal revival'], strength: 88 },
            { name: 'Home', items: ['Mid-century design', 'Antique markets', 'Upcycling'], strength: 91 },
            { name: 'Media', items: ['Art house cinema', 'Vinyl culture', 'Literary classics'], strength: 86 },
            { name: 'Food', items: ['Natural wine', 'Traditional techniques', 'Regional preservation'], strength: 84 }
          ]
        },
        {
          name: 'Japan',
          domains: [
            { name: 'Fashion', items: ['American vintage', 'Workwear archives', 'Meticulous reproduction'], strength: 94 },
            { name: 'Home', items: ['Minimalist curation', 'Specialty collecting', 'Craft preservation'], strength: 89 },
            { name: 'Media', items: ['Magazine archives', 'Film photography', 'Analog sound'], strength: 92 },
            { name: 'Food', items: ['Kissaten coffee culture', 'Traditional tools', 'Craft techniques'], strength: 87 }
          ]
        },
        {
          name: 'Global South',
          domains: [
            { name: 'Fashion', items: ['Cultural heritage', 'Textile preservation', 'Contemporary reinterpretation'], strength: 86 },
            { name: 'Home', items: ['Traditional crafts', 'Intergenerational objects', 'Adaptive reuse'], strength: 83 },
            { name: 'Media', items: ['Oral histories', 'Regional music archives', 'Cultural documentation'], strength: 80 },
            { name: 'Food', items: ['Indigenous ingredients', 'Traditional preparation', 'Family recipes'], strength: 89 }
          ]
        }
      ],
      strategicReport: "Vintage fashion enthusiasm manifests distinctly across regions, reflecting different relationships with history, consumption, and authenticity. North American vintage culture centers around nostalgia and Americana, with strong connections to pop culture references and accessible price points. Western European vintage enthusiasts show stronger interest in provenance, craftsmanship, and historical significance, often connecting vintage to sustainability conversations.\n\nThe most striking divergence appears in Japan, where vintage (particularly American vintage) is approached with unparalleled attention to detail, authentication, and preservation. Japanese vintage communities show the strongest cross-domain consistency, with vintage appreciation extending methodically into home goods, media consumption, and food culture.\n\nIn contrast, vintage fashion in the Global South more frequently connects to cultural heritage preservation, traditional craftsmanship, and reinterpretation of historical elements for contemporary relevance. Here, vintage is less about nostalgia for mid-century aesthetics and more about intergenerational knowledge and cultural continuity.\n\nFor brands, these divergences suggest that vintage-inspired marketing should be carefully tailored to regional understandings of what vintage represents culturally. The strongest universal connections are around quality, uniqueness, and storytelling, which could serve as foundations for cross-market campaigns."
    }
  };

  const handleTasteSelect = (tasteId) => {
    if (tasteId === 'custom') {
      setShowCustomInput(true);
      setSelectedTaste('');
    } else {
      setShowCustomInput(false);
      setSelectedTaste(tasteId);
    }
  };

  const handleCustomTasteSubmit = () => {
    if (customTaste.trim()) {
      setSelectedTaste('custom');
      setShowCustomInput(false);
    }
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would call the Qloo API and Groq LLM
      if (selectedTaste === 'custom') {
        // Generate a placeholder response for custom taste
        setDivergenceData({
          regions: [
            {
              name: 'North America',
              domains: [
                { name: 'Media', items: ['Content type 1', 'Content type 2', 'Content type 3'], strength: 85 },
                { name: 'Social', items: ['Activity 1', 'Activity 2', 'Activity 3'], strength: 80 },
                { name: 'Commerce', items: ['Product type 1', 'Product type 2', 'Product type 3'], strength: 75 }
              ]
            },
            {
              name: 'Europe',
              domains: [
                { name: 'Media', items: ['Content type A', 'Content type B', 'Content type C'], strength: 82 },
                { name: 'Social', items: ['Activity A', 'Activity B', 'Activity C'], strength: 78 },
                { name: 'Commerce', items: ['Product type A', 'Product type B', 'Product type C'], strength: 73 }
              ]
            }
          ],
          strategicReport: `Analysis of "${customTaste}" shows regional variations in how this taste manifests across different cultural contexts. While the core appeal remains consistent, the expressions and associated behaviors show meaningful divergence that would be important for any brand strategy.\n\nIn North America, this taste connects more strongly with [specific aspects], while European audiences tend to associate it more with [different aspects].\n\nThese regional differences suggest opportunities for localized approaches while maintaining a consistent core brand identity. The strongest universal connections appear to be around [common elements], which could serve as foundations for global campaigns.`
        });
      } else {
        setDivergenceData(sampleDivergenceData[selectedTaste]);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  // Get the display name for the selected taste
  const getSelectedTasteName = () => {
    if (selectedTaste === 'custom') {
      return customTaste;
    } else {
      const option = tasteOptions.find(option => option.id === selectedTaste);
      return option ? option.name : '';
    }
  };

  return (
    <div className="taste-divergence-map">
      <div className="divergence-header">
        <h2>Taste Divergence Map</h2>
        <p>Analyze how cultural tastes manifest differently across regions and demographics</p>
      </div>
      
      <div className="taste-selection">
        <h3>Select a Cultural Taste</h3>
        <div className="taste-options">
          {tasteOptions.map(option => (
            <button
              key={option.id}
              className={`taste-option ${selectedTaste === option.id ? 'selected' : ''}`}
              onClick={() => handleTasteSelect(option.id)}
            >
              {option.name}
            </button>
          ))}
        </div>
        
        {showCustomInput && (
          <div className="custom-taste-input">
            <input
              type="text"
              placeholder="Enter a cultural taste or trend..."
              value={customTaste}
              onChange={(e) => setCustomTaste(e.target.value)}
            />
            <button 
              onClick={handleCustomTasteSubmit}
              disabled={!customTaste.trim()}
            >
              Set
            </button>
          </div>
        )}
        
        {selectedTaste && (
          <button 
            className="analyze-button"
            onClick={handleAnalyze}
          >
            Analyze Regional Divergence
          </button>
        )}
      </div>
      
      {isLoading && (
        <div className="loading-indicator">
          <p>Mapping cultural divergence...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {divergenceData && (
        <div className="divergence-results">
          <h3>Divergence Map for {getSelectedTasteName()}</h3>
          
          <div className="regions-comparison">
            <div className="regions-grid">
              {divergenceData.regions.map((region, regionIndex) => (
                <div key={regionIndex} className="region-card">
                  <h4 className="region-name">{region.name}</h4>
                  
                  {region.domains.map((domain, domainIndex) => (
                    <div key={domainIndex} className="domain-section">
                      <div className="domain-header">
                        <h5>{domain.name}</h5>
                        <div className="strength-indicator">
                          <div 
                            className="strength-bar" 
                            style={{ width: `${domain.strength}%` }}
                          ></div>
                          <span className="strength-value">{domain.strength}%</span>
                        </div>
                      </div>
                      <ul className="domain-items">
                        {domain.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="strategic-report">
            <h4>Strategic Localization Report</h4>
            <div className="report-content">
              {divergenceData.strategicReport.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="divergence-actions">
            <button className="export-button">
              Export Divergence Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasteDivergenceMap;
