import React, { useState, useEffect } from 'react';

const CrossDomainCulturalFunnel = () => {
  const [selectedFunnel, setSelectedFunnel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [funnelData, setFunnelData] = useState(null);

  // Sample funnel starting points
  const funnelStartingPoints = [
    { id: 1, name: 'Fans of Timothée Chalamet', category: 'Celebrity' },
    { id: 2, name: 'K-Pop Enthusiasts', category: 'Music' },
    { id: 3, name: 'Plant-Based Diet Followers', category: 'Lifestyle' },
    { id: 4, name: 'Cottagecore Aesthetic Fans', category: 'Visual Culture' },
    { id: 5, name: 'Mindfulness Practitioners', category: 'Wellness' },
    { id: 6, name: 'Sustainable Fashion Advocates', category: 'Fashion' }
  ];

  // Sample funnel data - in a real app, this would come from Qloo API
  const sampleFunnelData = {
    1: { // Timothée Chalamet
      stages: [
        {
          name: 'Initial Interest',
          description: 'Fans of Timothée Chalamet',
          touchpoints: [
            { type: 'Content', items: ['Film performances', 'Red carpet appearances', 'Interview clips'] },
            { type: 'Commerce', items: ['Movie tickets', 'Streaming subscriptions'] },
            { type: 'Engagement', items: ['Social media follows', 'Fan communities', 'Award show viewing'] }
          ]
        },
        {
          name: 'Taste Expansion',
          description: 'Watch arthouse films',
          touchpoints: [
            { type: 'Content', items: ['A24 films', 'Film festival selections', 'Director retrospectives'] },
            { type: 'Commerce', items: ['Boutique streaming services', 'Independent theater memberships'] },
            { type: 'Engagement', items: ['Film discussion groups', 'Letterboxd reviews', 'Cinema-focused social accounts'] }
          ]
        },
        {
          name: 'Lifestyle Integration',
          description: 'Shop vintage fashion',
          touchpoints: [
            { type: 'Content', items: ['Vintage style guides', 'Sustainable fashion content', 'Thrifting tutorials'] },
            { type: 'Commerce', items: ['Curated vintage shops', 'Secondhand platforms', 'Sustainable brands'] },
            { type: 'Engagement', items: ['Style sharing communities', 'Fashion history accounts', 'Local swap events'] }
          ]
        },
        {
          name: 'Cultural Immersion',
          description: 'Listen to French indie pop',
          touchpoints: [
            { type: 'Content', items: ['French music playlists', 'Artist documentaries', 'Music blogs'] },
            { type: 'Commerce', items: ['Concert tickets', 'Vinyl records', 'Band merchandise'] },
            { type: 'Engagement', items: ['Language learning apps', 'Music discovery platforms', 'Live shows'] }
          ]
        },
        {
          name: 'Identity Expression',
          description: 'Attend poetry readings',
          touchpoints: [
            { type: 'Content', items: ['Poetry collections', 'Literary magazines', 'Spoken word videos'] },
            { type: 'Commerce', items: ['Independent bookstores', 'Literary event tickets', 'Small press publications'] },
            { type: 'Engagement', items: ['Writing workshops', 'Reading groups', 'Open mic nights'] }
          ]
        }
      ],
      insights: [
        "This audience journey reveals a pattern of seeking authenticity across multiple cultural domains",
        "Strong preference for curation and discovery over mainstream consumption",
        "High value placed on artistic expression and emotional depth",
        "Tendency to form community around shared cultural experiences",
        "Willingness to invest in experiences over material possessions"
      ]
    },
    2: { // K-Pop
      stages: [
        {
          name: 'Initial Interest',
          description: 'K-Pop Enthusiasts',
          touchpoints: [
            { type: 'Content', items: ['Music videos', 'Dance performances', 'Behind-the-scenes content'] },
            { type: 'Commerce', items: ['Digital music', 'Streaming subscriptions', 'Official merchandise'] },
            { type: 'Engagement', items: ['Fan communities', 'Streaming parties', 'Social media campaigns'] }
          ]
        },
        {
          name: 'Taste Expansion',
          description: 'Explore Korean beauty',
          touchpoints: [
            { type: 'Content', items: ['Skincare routines', 'Product reviews', 'Beauty tutorials'] },
            { type: 'Commerce', items: ['K-beauty brands', 'Skincare sets', 'Sheet masks'] },
            { type: 'Engagement', items: ['Beauty communities', 'Skincare tracking apps', 'Product swaps'] }
          ]
        },
        {
          name: 'Lifestyle Integration',
          description: 'Discover Korean cuisine',
          touchpoints: [
            { type: 'Content', items: ['Recipe videos', 'Restaurant reviews', 'Food documentaries'] },
            { type: 'Commerce', items: ['Korean ingredients', 'Cooking tools', 'Restaurant visits'] },
            { type: 'Engagement', items: ['Cooking classes', 'Food sharing platforms', 'Dining groups'] }
          ]
        },
        {
          name: 'Cultural Immersion',
          description: 'Watch K-dramas',
          touchpoints: [
            { type: 'Content', items: ['Streaming platforms', 'Fan translations', 'Analysis videos'] },
            { type: 'Commerce', items: ['Premium subscriptions', 'OST albums', 'Featured products'] },
            { type: 'Engagement', items: ['Episode discussions', 'Recommendation groups', 'Watch parties'] }
          ]
        },
        {
          name: 'Identity Expression',
          description: 'Learn Korean language',
          touchpoints: [
            { type: 'Content', items: ['Language apps', 'Study materials', 'Cultural context videos'] },
            { type: 'Commerce', items: ['Language courses', 'Books', 'Travel experiences'] },
            { type: 'Engagement', items: ['Language exchange', 'Study groups', 'Cultural events'] }
          ]
        }
      ],
      insights: [
        "This audience demonstrates high engagement across multiple aspects of Korean culture",
        "Strong community orientation with collective activities and shared experiences",
        "Digital-first discovery with physical experiences as deeper engagement",
        "Tendency to become cultural ambassadors and educators within their networks",
        "Willing to invest significantly in authentic cultural products and experiences"
      ]
    }
  };

  const handleSelectFunnel = (funnelId) => {
    setSelectedFunnel(funnelId);
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would call the Qloo API
      setFunnelData(sampleFunnelData[funnelId]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="cross-domain-cultural-funnel">
      <div className="funnel-header">
        <h2>Cross-Domain Cultural Funnel</h2>
        <p>Understand the customer journey across multiple taste domains</p>
      </div>
      
      <div className="funnel-selection">
        <h3>Select a Starting Point</h3>
        <div className="starting-points">
          {funnelStartingPoints.map(point => (
            <button
              key={point.id}
              className={`starting-point ${selectedFunnel === point.id ? 'selected' : ''}`}
              onClick={() => handleSelectFunnel(point.id)}
            >
              <span className="point-name">{point.name}</span>
              <span className="point-category">{point.category}</span>
            </button>
          ))}
        </div>
      </div>
      
      {isLoading && (
        <div className="loading-indicator">
          <p>Mapping cultural journey...</p>
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {funnelData && (
        <div className="funnel-visualization">
          <div className="funnel-flow">
            {funnelData.stages.map((stage, index) => (
              <div key={index} className="funnel-stage">
                <div className="stage-header">
                  <span className="stage-number">{index + 1}</span>
                  <h4 className="stage-name">{stage.name}</h4>
                </div>
                <div className="stage-description">{stage.description}</div>
                <div className="stage-arrow">
                  {index < funnelData.stages.length - 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="touchpoints-container">
            <h3>Touchpoints by Stage</h3>
            <div className="touchpoints-tabs">
              {funnelData.stages.map((stage, index) => (
                <button
                  key={index}
                  className="touchpoint-tab"
                  onClick={() => document.getElementById(`stage-${index}`).scrollIntoView({ behavior: 'smooth' })}
                >
                  Stage {index + 1}
                </button>
              ))}
            </div>
            
            <div className="touchpoints-content">
              {funnelData.stages.map((stage, index) => (
                <div key={index} id={`stage-${index}`} className="stage-touchpoints">
                  <h4>{stage.name}: {stage.description}</h4>
                  <div className="touchpoint-categories">
                    {stage.touchpoints.map((touchpoint, tIndex) => (
                      <div key={tIndex} className="touchpoint-category">
                        <h5>{touchpoint.type}</h5>
                        <ul>
                          {touchpoint.items.map((item, iIndex) => (
                            <li key={iIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="funnel-insights">
            <h3>Strategic Insights</h3>
            <ul>
              {funnelData.insights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
          
          <div className="funnel-actions">
            <button className="export-button">
              Export Funnel Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrossDomainCulturalFunnel;
