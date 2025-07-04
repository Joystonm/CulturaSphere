import React, { useState, useEffect } from 'react';
import TasteCard from '../components/TasteCard';
import { getTrends } from '../services/api';

const TrendWeaver = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'global'
  });

  useEffect(() => {
    // Initial load of trends
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      // This would be replaced with an actual API call
      // const response = await getTrends(filters);
      // setTrends(response.data);
      
      // Placeholder data for now
      setTimeout(() => {
        setTrends([
          {
            id: 1,
            title: 'Neo-Traditional Art Revival',
            description: 'A modern take on traditional art forms, blending historical techniques with contemporary themes.',
            image: '/path/to/neo-trad-art.jpg',
            tags: ['Art', 'Visual Culture', 'Trending']
          },
          {
            id: 2,
            title: 'Fusion Electronic Music',
            description: 'Electronic producers incorporating traditional instruments and folk melodies from around the world.',
            image: '/path/to/fusion-music.jpg',
            tags: ['Music', 'Electronic', 'Cultural Fusion']
          },
          {
            id: 3,
            title: 'Sustainable Fashion Movement',
            description: 'Designers embracing eco-friendly materials and traditional craftsmanship for sustainable fashion.',
            image: '/path/to/sustainable-fashion.jpg',
            tags: ['Fashion', 'Sustainability', 'Craftsmanship']
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching trends:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTrends();
  };

  return (
    <div className="trend-weaver-container">
      <h1>TrendWeaver</h1>
      <p>Discover and connect with cultural trends across music, art, fashion, and entertainment.</p>
      
      <div className="filters-form">
        <h2>Explore Trends</h2>
        <form onSubmit={handleSubmit} className="filters-grid">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="all">All Categories</option>
              <option value="music">Music</option>
              <option value="art">Art</option>
              <option value="fashion">Fashion</option>
              <option value="film">Film & TV</option>
              <option value="literature">Literature</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Region</label>
            <select
              name="region"
              value={filters.region}
              onChange={handleFilterChange}
            >
              <option value="global">Global</option>
              <option value="north-america">North America</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="south-america">South America</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Discover Trends'}
          </button>
        </form>
      </div>

      {trends.length > 0 && (
        <div className="trends">
          <h2>Current Trends</h2>
          <div className="trends-grid">
            {trends.map(trend => (
              <TasteCard
                key={trend.id}
                title={trend.title}
                description={trend.description}
                image={trend.image}
                tags={trend.tags}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendWeaver;
