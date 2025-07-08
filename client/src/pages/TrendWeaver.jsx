import React, { useState } from 'react';
import MicroTrendRadar from '../components/trend-weaver/MicroTrendRadar';
import CrossTasteBrandFitAnalyzer from '../components/trend-weaver/CrossTasteBrandFitAnalyzer';
import PersonaGrowthSimulator from '../components/trend-weaver/PersonaGrowthSimulator';
import TrendStrategistAssistant from '../components/trend-weaver/TrendStrategistAssistant';
import CulturalTimeMachine from '../components/trend-weaver/CulturalTimeMachine';

const TrendWeaver = () => {
  const [activeFeature, setActiveFeature] = useState('intro');
  
  const features = [
    { id: 'intro', name: 'Overview' },
    { id: 'microtrend-radar', name: 'Microtrend Radar' },
    { id: 'brand-fit-analyzer', name: 'Brand Fit Analyzer' },
    { id: 'persona-growth', name: 'Persona Growth Simulator' },
    { id: 'trend-strategist', name: 'AI Trend Strategist' },
    { id: 'time-machine', name: 'Cultural Time Machine' }
  ];
  
  const renderActiveFeature = () => {
    switch (activeFeature) {
      case 'microtrend-radar':
        return <MicroTrendRadar />;
      case 'brand-fit-analyzer':
        return <CrossTasteBrandFitAnalyzer />;
      case 'persona-growth':
        return <PersonaGrowthSimulator />;
      case 'trend-strategist':
        return <TrendStrategistAssistant />;
      case 'time-machine':
        return <CulturalTimeMachine />;
      case 'intro':
      default:
        return renderIntro();
    }
  };
  
  const renderIntro = () => {
    return (
      <div className="trend-weaver-intro">
        <div className="intro-content">
          <h2>Welcome to TrendWeaver</h2>
          <p className="intro-description">
            Connect with cultural trends across music, art, fashion, and entertainment.
            Discover insights, analyze patterns, and identify opportunities using our
            advanced cultural intelligence tools.
          </p>
          
          <div className="feature-grid">
            <div className="feature-card" onClick={() => setActiveFeature('microtrend-radar')}>
              <h3>Real-Time Microtrend Radar</h3>
              <p>Detect emerging microtrends before they go mainstream</p>
            </div>
            
            <div className="feature-card" onClick={() => setActiveFeature('brand-fit-analyzer')}>
              <h3>Cross-Taste Brand Fit Analyzer</h3>
              <p>Discover where your brand best fits in the cultural landscape</p>
            </div>
            
            <div className="feature-card" onClick={() => setActiveFeature('persona-growth')}>
              <h3>Persona Growth Simulator</h3>
              <p>Model how customer personas evolve over time based on taste transitions</p>
            </div>
            
            <div className="feature-card" onClick={() => setActiveFeature('trend-strategist')}>
              <h3>AI Trend Strategist Assistant</h3>
              <p>Get consultant-level insights using Qloo + Groq</p>
            </div>
            
            <div className="feature-card" onClick={() => setActiveFeature('time-machine')}>
              <h3>Cultural Time Machine</h3>
              <p>Rewind or fast-forward cultural trends to understand context</p>
            </div>
          </div>
        </div>
        
        <div className="trend-highlights">
          <h3>Trending Now</h3>
          <div className="trend-cards">
            <div className="trend-card">
              <div className="trend-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)' }}></div>
              <div className="trend-content">
                <h4>Neo-Soul Revival</h4>
                <p>A resurgence of soul music with modern production techniques and classic vocal stylings.</p>
                <span className="trend-category">Music</span>
              </div>
            </div>
            
            <div className="trend-card">
              <div className="trend-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)' }}></div>
              <div className="trend-content">
                <h4>Digital Surrealism</h4>
                <p>AI-generated artwork that blends surrealist concepts with digital manipulation.</p>
                <span className="trend-category">Art</span>
              </div>
            </div>
            
            <div className="trend-card">
              <div className="trend-image" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80)' }}></div>
              <div className="trend-content">
                <h4>Sustainable Luxury</h4>
                <p>High-end fashion brands embracing eco-friendly materials and ethical production.</p>
                <span className="trend-category">Fashion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="trend-weaver-container">
      <header className="trend-weaver-header">
        <h1 className="trend-weaver-title">TrendWeaver</h1>
        <p className="trend-weaver-description">
          Connect with cultural trends across music, art, fashion, and entertainment.
        </p>
      </header>
      
      <div className="trend-weaver-navigation">
        {features.map(feature => (
          <button
            key={feature.id}
            className={`nav-item ${activeFeature === feature.id ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.id)}
          >
            {feature.name}
          </button>
        ))}
      </div>
      
      <div className="trend-weaver-content">
        {renderActiveFeature()}
      </div>
    </div>
  );
};

export default TrendWeaver;
