import React, { useState, useEffect } from 'react';
import TasteCard from '../components/TasteCard';
import { getTrends } from '../services/api';

const TrendWeaver = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [trends, setTrends] = useState([]);
  const [crossDomainLinks, setCrossDomainLinks] = useState([]);
  const [brandIdeas, setBrandIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'music', name: 'Music' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'travel', name: 'Travel' },
    { id: 'literature', name: 'Literature' },
    { id: 'branding', name: 'Branding' },
    { id: 'film', name: 'Film & TV' },
    { id: 'art', name: 'Visual Arts' }
  ];

  useEffect(() => {
    // Initial load of trends
    fetchTrends();
  }, [selectedIndustry]);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      // This would be replaced with an actual API call
      // const response = await getTrends({ industry: selectedIndustry });
      // setTrends(response.data.trends);
      // setCrossDomainLinks(response.data.crossDomainLinks);
      // setBrandIdeas(response.data.brandIdeas);
      
      // Placeholder data for now
      setTimeout(() => {
        setTrends([
          {
            id: 1,
            title: 'Neo-Traditional Art Revival',
            description: 'A modern take on traditional art forms, blending historical techniques with contemporary themes.',
            image: '/path/to/neo-trad-art.jpg',
            tags: ['Art', 'Visual Culture', 'Trending'],
            growth: '+28% YoY',
            regions: ['North America', 'Western Europe', 'Japan']
          },
          {
            id: 2,
            title: 'Fusion Electronic Music',
            description: 'Electronic producers incorporating traditional instruments and folk melodies from around the world.',
            image: '/path/to/fusion-music.jpg',
            tags: ['Music', 'Electronic', 'Cultural Fusion'],
            growth: '+42% YoY',
            regions: ['Global', 'Strong in Scandinavia']
          },
          {
            id: 3,
            title: 'Sustainable Fashion Movement',
            description: 'Designers embracing eco-friendly materials and traditional craftsmanship for sustainable fashion.',
            image: '/path/to/sustainable-fashion.jpg',
            tags: ['Fashion', 'Sustainability', 'Craftsmanship'],
            growth: '+65% YoY',
            regions: ['Global', 'Led by EU markets']
          }
        ]);
        
        setCrossDomainLinks([
          {
            id: 1,
            title: 'Scandinavian Noir & Ambient Techno',
            description: 'People into Scandinavian noir novels also show strong interest in ambient techno music and minimalist design.',
            tags: ['Cross-Domain', 'Literature', 'Music']
          },
          {
            id: 2,
            title: 'K-Pop & Streetwear Fashion',
            description: 'K-Pop fans are 3.2x more likely to follow streetwear fashion trends and purchase limited edition apparel.',
            tags: ['Cross-Domain', 'Music', 'Fashion']
          }
        ]);
        
        setBrandIdeas([
          {
            id: 1,
            title: 'Nostalgia-Tech Fusion',
            description: 'Brands combining retro aesthetics with cutting-edge technology are seeing 47% higher engagement with Gen Z.',
            tags: ['Brand Strategy', 'Gen Z', 'Nostalgia']
          },
          {
            id: 2,
            title: 'Micro-Community Targeting',
            description: 'Brands creating highly specific content for niche interest groups see 3.8x higher conversion rates.',
            tags: ['Brand Strategy', 'Community', 'Conversion']
          }
        ]);
        
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching trends:', error);
      setLoading(false);
    }
  };

  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry);
  };

  const handleAiQuestionChange = (e) => {
    setAiQuestion(e.target.value);
  };

  const handleAiQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    
    setIsAiResponding(true);
    
    try {
      // This would be replaced with an actual API call to your LLM service
      // const response = await askAiStrategist(aiQuestion);
      // setAiResponse(response.data.answer);
      
      // Placeholder response for now
      setTimeout(() => {
        setAiResponse(
          "For a skincare brand targeting Gen Z K-pop and anime fans, I recommend:\n\n" +
          "1. Collaborate with K-pop artists on limited edition collections with anime-inspired packaging\n\n" +
          "2. Create content featuring skincare routines of K-pop idols, emphasizing the 'glass skin' aesthetic popular in both K-pop and anime\n\n" +
          "3. Develop products with ingredients popular in Korean and Japanese skincare, but with playful branding that references anime aesthetics\n\n" +
          "4. Launch social campaigns on platforms like TikTok and Instagram with challenges that combine K-pop choreography with skincare application\n\n" +
          "5. Consider sustainability in packaging as this demographic shows 72% higher concern for environmental impact"
        );
        setIsAiResponding(false);
      }, 2000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse('Sorry, I encountered an error while processing your question. Please try again.');
      setIsAiResponding(false);
    }
  };

  const handleExportTrends = () => {
    // This would typically generate and download a PDF or CSV
    console.log('Exporting trend data...');
    alert('Trend report would be downloaded here in a real implementation.');
  };

  const handlePredictNextTrend = () => {
    // This would trigger a more advanced prediction algorithm
    console.log('Predicting next trends...');
    alert('Next trend prediction would be generated here in a real implementation.');
  };

  return (
    <div className="trend-weaver-container">
      <h1>TrendWeaver</h1>
      <p className="section-description">Discover emerging cultural trends and insights aligned with your interests.</p>
      
      <div className="industry-selector">
        {industries.map(industry => (
          <button
            key={industry.id}
            className={`industry-button ${selectedIndustry === industry.id ? 'active' : ''}`}
            onClick={() => handleIndustryChange(industry.id)}
          >
            {industry.name}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Analyzing cultural trends...</p>
        </div>
      ) : (
        <div className="dashboard-layout">
          <div className="main-trends-section">
            <div className="section-header">
              <h2>Emerging Trends</h2>
              <div className="section-actions">
                <button onClick={handleExportTrends} className="action-button">
                  Export Report
                </button>
                <button onClick={handlePredictNextTrend} className="action-button predict-button">
                  Predict Next Trend
                </button>
              </div>
            </div>
            
            <div className="trends-grid">
              {trends.map(trend => (
                <div key={trend.id} className="trend-card">
                  <div className="trend-card-header">
                    <h3>{trend.title}</h3>
                    <div className="trend-growth">{trend.growth}</div>
                  </div>
                  <p className="trend-description">{trend.description}</p>
                  <div className="trend-regions">
                    <strong>Regions:</strong> {trend.regions.join(', ')}
                  </div>
                  <div className="trend-tags">
                    {trend.tags.map((tag, index) => (
                      <span key={index} className="trend-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="side-panels">
            <div className="cross-domain-section panel">
              <h2>Cross-Domain Connections</h2>
              {crossDomainLinks.map(link => (
                <div key={link.id} className="cross-domain-card">
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                  <div className="trend-tags">
                    {link.tags.map((tag, index) => (
                      <span key={index} className="trend-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="brand-ideas-section panel">
              <h2>Brand Content Ideas</h2>
              {brandIdeas.map(idea => (
                <div key={idea.id} className="brand-idea-card">
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                  <div className="trend-tags">
                    {idea.tags.map((tag, index) => (
                      <span key={index} className="trend-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="ai-strategist-section">
            <h2>Ask an AI Strategist</h2>
            <form onSubmit={handleAiQuestionSubmit} className="ai-question-form">
              <input
                type="text"
                value={aiQuestion}
                onChange={handleAiQuestionChange}
                placeholder="E.g., How can a skincare brand target Gen Z into K-pop and anime?"
                className="ai-question-input"
              />
              <button 
                type="submit" 
                className="ai-question-button"
                disabled={isAiResponding || !aiQuestion.trim()}
              >
                {isAiResponding ? 'Thinking...' : 'Ask'}
              </button>
            </form>
            
            {aiResponse && (
              <div className="ai-response">
                <h3>Strategic Insight:</h3>
                <div className="ai-response-content">
                  {aiResponse.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendWeaver;
