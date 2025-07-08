import React, { useState } from 'react';

const CrossTasteBrandFitAnalyzer = () => {
  const [brandType, setBrandType] = useState('');
  const [customAudiences, setCustomAudiences] = useState(['', '']);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Function to generate dynamic brand fit analysis
  const generateBrandFitAnalysis = (brandType, audiences) => {
    // Color palette generator
    const generateColorPalette = () => {
      const colors = [];
      for (let i = 0; i < 5; i++) {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 30) + 20; // 20-50%
        const lightness = Math.floor(Math.random() * 30) + 40; // 40-70%
        colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
      }
      return colors;
    };
    
    // Tone generator based on brand type and audiences
    const generateTone = (brandType, audiences) => {
      const toneAdjectives = [
        'authentic', 'bold', 'calm', 'dynamic', 'elegant', 
        'futuristic', 'grounded', 'harmonious', 'innovative', 'joyful',
        'minimalist', 'nostalgic', 'organic', 'playful', 'refined',
        'sophisticated', 'thoughtful', 'unconventional', 'vibrant', 'warm'
      ];
      
      const toneEmphasis = [
        'with an emphasis on simplicity and clarity',
        'highlighting sustainability and ethical practices',
        'focusing on community and shared experiences',
        'emphasizing craftsmanship and attention to detail',
        'with a focus on innovation and forward-thinking',
        'celebrating diversity and inclusivity',
        'with a strong narrative approach',
        'balancing tradition and modernity',
        'emphasizing wellness and self-care',
        'with a distinctive cultural perspective'
      ];
      
      // Select random adjectives based on inputs
      const getRandomItems = (arr, count) => {
        const result = [];
        const used = new Set();
        
        // Use brand type and audiences to seed the selection
        const seed = brandType.length + audiences.join('').length;
        let counter = seed % arr.length;
        
        while (result.length < count) {
          if (!used.has(counter)) {
            used.add(counter);
            result.push(arr[counter]);
          }
          counter = (counter + 1) % arr.length;
        }
        
        return result;
      };
      
      const selectedAdjectives = getRandomItems(toneAdjectives, 3);
      const selectedEmphasis = getRandomItems(toneEmphasis, 1)[0];
      
      return `${selectedAdjectives[0]}, ${selectedAdjectives[1]}, and ${selectedAdjectives[2]} ${selectedEmphasis}`;
    };
    
    // Visual identity generator
    const generateVisualIdentity = (brandType, audiences) => {
      const visualElements = [
        'Clean, modern design with subtle texture elements',
        'Organic shapes and flowing lines',
        'Bold typography with distinctive character',
        'Minimalist approach with strategic use of negative space',
        'Vibrant illustrations with cultural references',
        'Photography-forward approach with authentic moments',
        'Geometric patterns with symbolic meaning',
        'Hand-crafted elements with digital precision',
        'Gradient color transitions with depth',
        'Monochromatic scheme with textural contrast'
      ];
      
      const typographyApproaches = [
        'Typography balancing sans-serif headers with serif body text for readability',
        'Custom letterforms that reflect the brand\'s personality',
        'Typography inspired by historical references but with contemporary execution',
        'Minimalist type treatment with careful attention to spacing and hierarchy',
        'Expressive typography that functions as a visual element'
      ];
      
      // Use inputs to select elements
      const seed = brandType.length + audiences.join('').length;
      const visualElement = visualElements[seed % visualElements.length];
      const typography = typographyApproaches[(seed + 3) % typographyApproaches.length];
      
      return `${visualElement}. ${typography}.`;
    };
    
    // Launch event ideas generator
    const generateLaunchIdeas = (brandType, audiences) => {
      const eventTypes = [
        'Intimate pop-up experiences',
        'Digital-physical hybrid events',
        'Community workshops',
        'Collaborative installations',
        'Immersive storytelling sessions',
        'Curated sensory experiences',
        'Limited-access preview events',
        'Interactive digital launches',
        'Sustainability-focused gatherings',
        'Cultural exchange programs'
      ];
      
      const eventDetails = [
        'featuring local artists and creators',
        'with interactive elements that encourage participation',
        'that transform unexpected spaces',
        'combining multiple sensory experiences',
        'that build community around shared values',
        'with educational components about your process',
        'that create shareable moments without feeling forced',
        'connecting digital and physical experiences seamlessly',
        'highlighting the stories behind your brand',
        'that evolve over time to maintain engagement'
      ];
      
      // Use inputs to select elements
      const seed = brandType.length + audiences.join('').length;
      const eventType = eventTypes[seed % eventTypes.length];
      const detail = eventDetails[(seed + 5) % eventDetails.length];
      
      return `${eventType} ${detail}. Focus on creating authentic connections rather than traditional marketing approaches.`;
    };
    
    // Influencer fit generator
    const generateInfluencerFit = (brandType, audiences) => {
      const influencerTypes = [
        'Micro-influencers with highly engaged niche communities',
        'Content creators focused on educational depth rather than surface-level promotion',
        'Cultural curators with distinctive taste and perspective',
        'Multi-disciplinary creators who bridge different domains',
        'Thought leaders who challenge conventional thinking in your space',
        'Authentic voices who prioritize transparency and honesty',
        'Community builders who foster meaningful connections',
        'Storytellers who excel at narrative-driven content',
        'Emerging voices from underrepresented perspectives',
        'Established experts with credibility in adjacent fields'
      ];
      
      const approachSuggestions = [
        'Focus on long-term relationships over one-off promotions',
        'Prioritize authentic alignment over follower count',
        'Consider collaborative product development rather than just promotion',
        'Look for genuine users of similar products or services',
        'Seek partners who can provide substantive context and education'
      ];
      
      // Use inputs to select elements
      const seed = brandType.length + audiences.join('').length;
      const influencerType = influencerTypes[seed % influencerTypes.length];
      const approach = approachSuggestions[(seed + 2) % approachSuggestions.length];
      
      return `${influencerType}. ${approach}.`;
    };
    
    // Launch recommendation generator
    const generateLaunchRecommendation = (brandType, audiences) => {
      const seasons = [
        'Early spring when people are seeking renewal and fresh perspectives',
        'Late summer when there\'s a transition mindset before fall begins',
        'Mid-autumn when people are settling into reflective routines',
        'January when people are establishing new habits and perspectives',
        'Pre-holiday season when thoughtful consumption is being considered'
      ];
      
      const locations = [
        'urban centers with strong creative communities',
        'markets with established interest in innovation within your category',
        'regions with cultural alignment to your brand values',
        'areas with emerging interest in your category but limited options',
        'digital-first with strategic physical touchpoints in key cities'
      ];
      
      // Use inputs to select elements
      const seed = brandType.length + audiences.join('').length;
      const season = seasons[seed % seasons.length];
      const location = locations[(seed + 4) % locations.length];
      
      return `Consider launching during ${season}. Focus on ${location}.`;
    };
    
    // Generate the complete analysis
    return {
      tone: generateTone(brandType, audiences),
      colorPalette: generateColorPalette(),
      visualIdentity: generateVisualIdentity(brandType, audiences),
      launchEvents: generateLaunchIdeas(brandType, audiences),
      influencerFit: generateInfluencerFit(brandType, audiences),
      launchRecommendation: generateLaunchRecommendation(brandType, audiences)
    };
  };

  const handleAddAudience = () => {
    if (customAudiences.length < 3) {
      setCustomAudiences([...customAudiences, '']);
    }
  };

  const handleRemoveAudience = (index) => {
    if (customAudiences.length > 2) {
      const newAudiences = [...customAudiences];
      newAudiences.splice(index, 1);
      setCustomAudiences(newAudiences);
    }
  };

  const handleAudienceChange = (index, value) => {
    const newAudiences = [...customAudiences];
    newAudiences[index] = value;
    setCustomAudiences(newAudiences);
  };

  const handleAnalyze = () => {
    setIsLoading(true);
    
    // Filter out empty audience entries
    const filteredAudiences = customAudiences.filter(audience => audience.trim() !== '');
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Generate dynamic analysis based on inputs
      const analysis = generateBrandFitAnalysis(brandType, filteredAudiences);
      setResults(analysis);
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="analyzer-step">
      <h3>Step 1: What are you creating?</h3>
      <div className="brand-type-input">
        <input
          type="text"
          placeholder="e.g., Plant-based skincare, Artisanal coffee subscription"
          value={brandType}
          onChange={(e) => setBrandType(e.target.value)}
        />
        <button 
          className="next-button"
          onClick={() => setStep(2)}
          disabled={!brandType.trim()}
        >
          Next
        </button>
      </div>
      <div className="input-examples">
        <p>Examples: "Sustainable homeware brand", "Travel photography app", "Plant-based skincare"</p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="analyzer-step">
      <h3>Step 2: Enter 2-3 target audiences or tastes</h3>
      <div className="custom-audiences">
        {customAudiences.map((audience, index) => (
          <div key={index} className="custom-audience-input">
            <input
              type="text"
              placeholder={`Target audience ${index + 1} (e.g., "Mindful millennials", "Outdoor enthusiasts")`}
              value={audience}
              onChange={(e) => handleAudienceChange(index, e.target.value)}
            />
            {customAudiences.length > 2 && (
              <button 
                className="remove-audience"
                onClick={() => handleRemoveAudience(index)}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        
        {customAudiences.length < 3 && (
          <button 
            className="add-audience"
            onClick={handleAddAudience}
          >
            + Add another audience (optional)
          </button>
        )}
      </div>
      
      <div className="step-actions">
        <button 
          className="back-button"
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button 
          className="analyze-button"
          onClick={handleAnalyze}
          disabled={!customAudiences[0].trim() || !customAudiences[1].trim()}
        >
          {!customAudiences[0].trim() || !customAudiences[1].trim() 
            ? 'Enter at least 2 audiences' 
            : 'Analyze Brand Fit'}
        </button>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="analyzer-results">
      <h3>Brand Fit Analysis for {brandType}</h3>
      
      {isLoading ? (
        <div className="loading-indicator">
          <p>Analyzing cultural affinities...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="results-content">
          <div className="result-section">
            <h4>Brand Tone</h4>
            <p>{results.tone}</p>
          </div>
          
          <div className="result-section">
            <h4>Color Palette</h4>
            <div className="color-palette">
              {results.colorPalette.map((color, index) => (
                <div 
                  key={index} 
                  className="color-swatch" 
                  style={{ backgroundColor: color }}
                >
                  <span>{color}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="result-section">
            <h4>Visual Identity</h4>
            <p>{results.visualIdentity}</p>
          </div>
          
          <div className="result-section">
            <h4>Launch Event Ideas</h4>
            <p>{results.launchEvents}</p>
          </div>
          
          <div className="result-section">
            <h4>Influencer Fit</h4>
            <p>{results.influencerFit}</p>
          </div>
          
          <div className="result-section">
            <h4>Best Time & Location to Launch</h4>
            <p>{results.launchRecommendation}</p>
          </div>
          
          <div className="export-section">
            <button 
              className="restart-button"
              onClick={() => {
                setBrandType('');
                setCustomAudiences(['', '']);
                setResults(null);
                setStep(1);
              }}
            >
              Start New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="cross-taste-brand-fit-analyzer">
      <div className="analyzer-header">
        <h2>Cross-Taste Brand Fit Analyzer</h2>
        <p>Discover where your brand best fits in the cultural landscape</p>
      </div>
      
      <div className="analyzer-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Define Brand</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Enter Audiences</div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. View Analysis</div>
      </div>
      
      <div className="analyzer-content">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderResults()}
      </div>
    </div>
  );
};

export default CrossTasteBrandFitAnalyzer;
