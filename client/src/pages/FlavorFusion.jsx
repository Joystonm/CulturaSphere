import React, { useState } from 'react';

const FlavorFusion = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
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
      image: 'https://images.unsplash.com/photo-1567364667030-4d63bac61d31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'African',
      tags: ['Spicy', 'Stew', 'Injera']
    }
  ];
  
  const destinations = [
    {
      id: 1,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      cuisine: 'Japanese cuisine capital'
    },
    {
      id: 2,
      name: 'Naples, Italy',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      cuisine: 'Birthplace of pizza'
    },
    {
      id: 3,
      name: 'Addis Ababa, Ethiopia',
      image: 'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      cuisine: 'Authentic Ethiopian dining'
    }
  ];
  
  const filteredCuisines = activeFilter === 'All' 
    ? cuisines 
    : cuisines.filter(cuisine => cuisine.category === activeFilter);
  
  return (
    <div className="flavor-fusion-container">
      <header className="flavor-fusion-header">
        <h1 className="flavor-fusion-title">FlavorFusion</h1>
        <p className="flavor-fusion-description">
          Discover culinary connections and explore new tastes based on your preferences.
          Travel the world through flavors and find your next food adventure.
        </p>
      </header>
      
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
      
      <section className="destination-section">
        <h2>Culinary Destinations</h2>
        <div className="destination-map">
          {/* Map would go here in a real implementation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#666'
          }}>
            Interactive Map Coming Soon
          </div>
        </div>
        
        <div className="destination-list">
          {destinations.map(destination => (
            <div key={destination.id} className="destination-card">
              <img src={destination.image} alt={destination.name} className="destination-image" />
              <div className="destination-overlay">
                <h3 className="destination-name">{destination.name}</h3>
                <p className="destination-cuisine">{destination.cuisine}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FlavorFusion;
