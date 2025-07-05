import React, { useState } from 'react';
import CulturalItineraryComposer from '../components/flavor-fusion/CulturalItineraryComposer';
import TasteAlignedPersonas from '../components/flavor-fusion/TasteAlignedPersonas';
import TasteToGeoVisualizer from '../components/flavor-fusion/TasteToGeoVisualizer';
import MoodBlendingEngine from '../components/flavor-fusion/MoodBlendingEngine';
import TravelPDFGenerator from '../components/flavor-fusion/TravelPDFGenerator';
import PostTripStoryMode from '../components/flavor-fusion/PostTripStoryMode';

const FlavorFusion = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('explore');
  
  const cuisineFilters = ['All', 'Asian', 'European', 'African', 'American', 'Middle Eastern'];
  
  const cuisines = [
    {
      id: 1,
      name: 'Japanese',
      description: 'Delicate flavors, fresh ingredients, and artistic presentation.',
      image: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Asian',
      tags: ['Umami', 'Fresh', 'Seafood']
    },
    {
      id: 2,
      name: 'Italian',
      description: 'Rich flavors, fresh herbs, and simple yet delicious combinations.',
      image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'European',
      tags: ['Pasta', 'Tomato', 'Herbs']
    },
    {
      id: 3,
      name: 'Ethiopian',
      description: 'Bold spices, communal dining, and unique fermented flavors.',
      image: 'https://images.unsplash.com/photo-1511516412963-801b050c92aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'African',
      tags: ['Spicy', 'Stew', 'Injera']
    },
    {
      id: 4,
      name: 'Mexican',
      description: 'Vibrant flavors, fresh ingredients, and a perfect balance of spice.',
      image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'American',
      tags: ['Spicy', 'Corn', 'Avocado']
    },
    {
      id: 5,
      name: 'Thai',
      description: 'Complex flavors balancing sweet, sour, salty, and spicy elements.',
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Asian',
      tags: ['Spicy', 'Aromatic', 'Herbs']
    },
    {
      id: 6,
      name: 'Lebanese',
      description: 'Fresh ingredients, aromatic herbs, and a focus on healthy preparations.',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Middle Eastern',
      tags: ['Mezze', 'Olive Oil', 'Herbs']
    },
    {
      id: 7,
      name: 'French',
      description: 'Refined techniques, rich sauces, and an emphasis on quality ingredients.',
      image: 'https://images.unsplash.com/photo-1608855238293-a8853e7f7c98?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'European',
      tags: ['Butter', 'Wine', 'Pastry']
    },
    {
      id: 8,
      name: 'Indian',
      description: 'Complex spice blends, diverse regional variations, and aromatic curries.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Asian',
      tags: ['Spicy', 'Curry', 'Vegetarian']
    },
    {
      id: 9,
      name: 'Moroccan',
      description: 'Fragrant spices, sweet-savory combinations, and slow-cooked tagines.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'African',
      tags: ['Tagine', 'Couscous', 'Spices']
    }
  ];
  
  const filteredCuisines = activeFilter === 'All' 
    ? cuisines 
    : cuisines.filter(cuisine => cuisine.category === activeFilter);

  const advancedFeatures = [
    { id: 'itinerary', name: 'Cultural Itinerary Composer', component: <CulturalItineraryComposer /> },
    { id: 'personas', name: 'Taste-Aligned Travel Personas', component: <TasteAlignedPersonas /> },
    { id: 'geo-visualizer', name: 'Taste-to-Geo Visualizer', component: <TasteToGeoVisualizer /> },
    { id: 'mood-blending', name: 'Mood Blending Engine', component: <MoodBlendingEngine /> },
    { id: 'pdf-generator', name: 'Travel PDF Generator', component: <TravelPDFGenerator /> },
    { id: 'story-mode', name: 'Post-Trip Story Mode', component: <PostTripStoryMode /> }
  ];
  
  return (
    <div className="flavor-fusion-container">
      <header className="flavor-fusion-header">
        <h1 className="flavor-fusion-title">FlavorFusion</h1>
        <p className="flavor-fusion-description">
          Discover culinary connections and explore new tastes based on your preferences.
          Travel the world through flavors and find your next food adventure.
        </p>
      </header>
      
      <div className="flavor-fusion-tabs">
        <button 
          className={`tab-button ${activeTab === 'explore' ? 'active' : ''}`}
          onClick={() => setActiveTab('explore')}
        >
          Explore Cuisines
        </button>
        <button 
          className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced Features
        </button>
      </div>
      
      {activeTab === 'explore' && (
        <section className="cuisine-explorer">
          <h2>Explore Cuisines</h2>
          
          <div className="cuisine-filters">
            {cuisineFilters.map(filter => (
              <button
                key={filter}
                className={`cuisine-filter ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="cuisine-grid">
            {filteredCuisines.map(cuisine => (
              <div key={cuisine.id} className="cuisine-card">
                <img src={cuisine.image} alt={cuisine.name} className="cuisine-image" />
                <div className="cuisine-content">
                  <h3 className="cuisine-name">{cuisine.name}</h3>
                  <p className="cuisine-description">{cuisine.description}</p>
                  <div className="cuisine-tags">
                    {cuisine.tags.map((tag, index) => (
                      <span key={index} className="cuisine-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {activeTab === 'advanced' && (
        <section className="advanced-features">
          <h2>Advanced Features</h2>
          
          <div className="features-grid">
            {advancedFeatures.map(feature => (
              <div key={feature.id} className="feature-card" onClick={() => setActiveTab(feature.id)}>
                <h3>{feature.name}</h3>
                <div className="feature-icon">
                  <i className={`fas fa-${getFeatureIcon(feature.id)}`}></i>
                </div>
                <p>{getFeatureDescription(feature.id)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {advancedFeatures.map(feature => (
        activeTab === feature.id && (
          <section key={feature.id} className="feature-section">
            <button className="back-button" onClick={() => setActiveTab('advanced')}>
              <i className="fas fa-arrow-left"></i> Back to Features
            </button>
            {feature.component}
          </section>
        )
      ))}
    </div>
  );
};

// Helper function to get feature icon
const getFeatureIcon = (featureId) => {
  const icons = {
    'itinerary': 'map-marked-alt',
    'personas': 'user-circle',
    'geo-visualizer': 'globe-americas',
    'mood-blending': 'palette',
    'pdf-generator': 'file-pdf',
    'story-mode': 'book-open'
  };
  
  return icons[featureId] || 'star';
};

// Helper function to get feature description
const getFeatureDescription = (featureId) => {
  const descriptions = {
    'itinerary': 'Generate a themed multi-day travel plan based on your cultural tastes.',
    'personas': 'Discover your unique travel persona based on your interests and preferences.',
    'geo-visualizer': 'See how your cultural tastes map to global destinations.',
    'mood-blending': 'Combine mood and taste for a unique travel experience.',
    'pdf-generator': 'Create a personalized travel guide with local phrases and cultural insights.',
    'story-mode': 'Transform your travel memories into a beautifully crafted story.'
  };
  
  return descriptions[featureId] || '';
};

export default FlavorFusion;
