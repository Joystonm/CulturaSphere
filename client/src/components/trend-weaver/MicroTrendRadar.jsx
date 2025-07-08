import React, { useState, useEffect } from 'react';

const MicroTrendRadar = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: 'global',
    ageGroup: 'all',
    domain: 'all'
  });

  // Regions, age groups, and domains for filtering
  const regions = [
    { value: 'global', label: 'Global' },
    { value: 'midwest-us', label: 'Midwest US' },
    { value: 'paris', label: 'Paris' },
    { value: 'tokyo', label: 'Tokyo' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'scandinavia', label: 'Scandinavia' }
  ];

  const ageGroups = [
    { value: 'all', label: 'All Ages' },
    { value: '18-24', label: '18-24' },
    { value: '25-34', label: '25-34' },
    { value: '35-44', label: '35-44' },
    { value: '45+', label: '45+' }
  ];

  const domains = [
    { value: 'all', label: 'All Domains' },
    { value: 'music', label: 'Music' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'culinary', label: 'Culinary' },
    { value: 'publishing', label: 'Publishing' },
    { value: 'art', label: 'Art' }
  ];

  // Function to generate random trends based on filters
  const generateRandomTrends = (filters) => {
    const trendTitles = [
      { domain: 'music', titles: ['Lo-fi Revival', 'Ambient Jazz Fusion', 'Digital Folk Movement', 'Retro Synth Wave', 'Acoustic Electronic Blend'] },
      { domain: 'fashion', titles: ['Sustainable Streetwear', 'Digital Textile Printing', 'Neo-Vintage Aesthetics', 'Adaptive Clothing Tech', 'Biodesigned Materials'] },
      { domain: 'culinary', titles: ['Fermentation Innovation', 'Hyperlocal Sourcing', 'Climate-Adaptive Cuisine', 'Food Waste Upcycling', 'Functional Ingredients'] },
      { domain: 'publishing', titles: ['Interactive Digital Zines', 'Micro-Fiction Platforms', 'Audio-First Publishing', 'Community Anthology Models', 'AR Enhanced Books'] },
      { domain: 'art', titles: ['Bioart Installations', 'Climate Data Visualization', 'AI-Human Collaborations', 'Immersive Audio Experiences', 'Public Space Interventions'] }
    ];
    
    const regionDescriptors = {
      'midwest-us': ['emerging in college towns', 'gaining traction in urban centers', 'spreading through community spaces', 'appearing at local festivals', 'growing through online communities'],
      'paris': ['transforming traditional spaces', 'blending with historical contexts', 'emerging in cultural districts', 'featured in pop-up experiences', 'crossing generational boundaries'],
      'tokyo': ['reimagining urban experiences', 'creating new digital-physical hybrids', 'evolving traditional practices', 'spreading through specialized communities', 'gaining mainstream attention'],
      'berlin': ['reshaping nightlife culture', 'emerging from underground scenes', 'crossing cultural boundaries', 'transforming industrial spaces', 'creating new community models'],
      'scandinavia': ['integrating sustainability principles', 'reimagining minimalist approaches', 'connecting urban-rural experiences', 'emphasizing wellbeing aspects', 'pioneering circular models']
    };
    
    const ageGroupInsights = {
      '18-24': ['resonating with digital natives', 'spreading through campus communities', 'driven by social media creators', 'emphasizing participatory experiences', 'blending virtual and physical spaces'],
      '25-34': ['adopted by young professionals', 'integrated with work-life balance', 'emphasizing quality over quantity', 'driven by experience seekers', 'balancing digital and analog elements'],
      '35-44': ['connecting family experiences', 'reimagining established practices', 'emphasizing craftsmanship and durability', 'creating intergenerational connections', 'balancing nostalgia and innovation'],
      '45+': ['rediscovering traditional techniques', 'emphasizing wellness and longevity', 'creating community learning spaces', 'preserving cultural knowledge', 'adapting to changing lifestyles']
    };

    // Generate random number of trends (3-6)
    const numTrends = Math.floor(Math.random() * 4) + 3;
    const newTrends = [];
    
    // Current timestamp for "real-time" effect
    const now = new Date();
    const timestamp = now.toISOString();
    
    for (let i = 0; i < numTrends; i++) {
      // Select domain based on filter or random if "all"
      let domainToUse = filters.domain;
      if (domainToUse === 'all') {
        const randomDomainIndex = Math.floor(Math.random() * domains.length - 1) + 1; // Skip "all"
        domainToUse = domains[randomDomainIndex].value;
      }
      
      // Find matching domain titles
      const domainTitlesObj = trendTitles.find(d => d.domain === domainToUse);
      if (!domainTitlesObj) continue; // Skip if no matching domain
      
      // Select random title from domain
      const randomTitleIndex = Math.floor(Math.random() * domainTitlesObj.titles.length);
      const title = domainTitlesObj.titles[randomTitleIndex];
      
      // Generate region-specific description if applicable
      let regionDesc = '';
      if (filters.region !== 'global') {
        const regionDescs = regionDescriptors[filters.region];
        if (regionDescs) {
          const randomRegionIndex = Math.floor(Math.random() * regionDescs.length);
          regionDesc = regionDescs[randomRegionIndex];
        }
      }
      
      // Generate age-specific insight if applicable
      let ageInsight = '';
      if (filters.ageGroup !== 'all') {
        const ageInsights = ageGroupInsights[filters.ageGroup];
        if (ageInsights) {
          const randomAgeIndex = Math.floor(Math.random() * ageInsights.length);
          ageInsight = ageInsights[randomAgeIndex];
        }
      }
      
      // Combine descriptions
      let description = `A ${domainToUse} trend characterized by innovative approaches and cultural significance`;
      if (regionDesc) description += `, ${regionDesc}`;
      if (ageInsight) description += ` and ${ageInsight}`;
      description += '.';
      
      // Generate random growth rate (5-50%)
      const growthRate = Math.floor(Math.random() * 46) + 5;
      
      // Generate random timeframe
      const timeframes = ['Last 24 hours', 'Last 7 days', 'Last 30 days'];
      const randomTimeIndex = Math.floor(Math.random() * timeframes.length);
      
      newTrends.push({
        id: i + 1,
        title,
        region: filters.region === 'global' ? regions[Math.floor(Math.random() * (regions.length - 1)) + 1].value : filters.region,
        ageGroup: filters.ageGroup === 'all' ? ageGroups[Math.floor(Math.random() * (ageGroups.length - 1)) + 1].value : filters.ageGroup,
        domain: domainToUse,
        description,
        growthRate,
        timeframe: timeframes[randomTimeIndex],
        timestamp
      });
    }
    
    return newTrends;
  };

  // Fetch trends when filters change or component mounts
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with a delay
    const fetchTimeout = setTimeout(() => {
      const newTrends = generateRandomTrends(filters);
      setTrends(newTrends);
      setLoading(false);
    }, 800);
    
    // Set up interval for real-time updates (every 30 seconds)
    const updateInterval = setInterval(() => {
      if (!loading) {
        const newTrends = generateRandomTrends(filters);
        setTrends(newTrends);
      }
    }, 30000);
    
    return () => {
      clearTimeout(fetchTimeout);
      clearInterval(updateInterval);
    };
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  return (
    <div className="micro-trend-radar">
      <div className="radar-header">
        <h2>Real-Time Microtrend Radar</h2>
        <p>Detect emerging cultural trends before they go mainstream</p>
        <div className="real-time-indicator">
          <span className="pulse"></span>
          <span>Live data updating every 30 seconds</span>
        </div>
      </div>

      <div className="radar-filters">
        <div className="filter-group">
          <label>Region</label>
          <select 
            value={filters.region} 
            onChange={(e) => handleFilterChange('region', e.target.value)}
          >
            {regions.map(region => (
              <option key={region.value} value={region.value}>{region.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Age Group</label>
          <select 
            value={filters.ageGroup} 
            onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
          >
            {ageGroups.map(age => (
              <option key={age.value} value={age.value}>{age.label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Domain</label>
          <select 
            value={filters.domain} 
            onChange={(e) => handleFilterChange('domain', e.target.value)}
          >
            {domains.map(domain => (
              <option key={domain.value} value={domain.value}>{domain.label}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
          <p>Analyzing cultural signals...</p>
        </div>
      ) : (
        <div className="trends-container">
          {trends.length === 0 ? (
            <div className="no-trends">No trends match your current filters</div>
          ) : (
            trends.map(trend => (
              <div key={trend.id} className="trend-card">
                <div className="trend-header">
                  <h3>{trend.title}</h3>
                  <span className={`growth-indicator ${trend.growthRate > 30 ? 'high' : 'moderate'}`}>
                    +{trend.growthRate}%
                  </span>
                </div>
                <div className="trend-body">
                  <p>{trend.description}</p>
                  <div className="trend-meta">
                    <span className="timeframe">{trend.timeframe}</span>
                    <span className="region-tag">{regions.find(r => r.value === trend.region)?.label}</span>
                    <span className="domain-tag">{trend.domain}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MicroTrendRadar;
