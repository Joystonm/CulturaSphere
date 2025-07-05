import React, { useState } from 'react';

const TrendWeaver = () => {
  const [activeCategory, setActiveCategory] = useState('Music');
  
  const categories = ['Music', 'Art', 'Fashion', 'Film', 'Literature'];
  
  const trends = [
    {
      id: 1,
      title: 'Neo-Soul Revival',
      description: 'A resurgence of soul music with modern production techniques and classic vocal stylings.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Music',
      date: '2023-06-15'
    },
    {
      id: 2,
      title: 'Digital Surrealism',
      description: 'AI-generated artwork that blends surrealist concepts with digital manipulation.',
      image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Art',
      date: '2023-05-22'
    },
    {
      id: 3,
      title: 'Sustainable Luxury',
      description: 'High-end fashion brands embracing eco-friendly materials and ethical production.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Fashion',
      date: '2023-07-03'
    },
    {
      id: 4,
      title: 'Micro-Budget Cinema',
      description: 'Independent filmmakers creating compelling narratives with minimal resources.',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Film',
      date: '2023-04-18'
    },
    {
      id: 5,
      title: 'Climate Fiction',
      description: 'Literary works exploring the impact of climate change on society and individuals.',
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Literature',
      date: '2023-06-29'
    }
  ];
  
  const insights = [
    {
      id: 1,
      title: 'The Intersection of Technology and Traditional Art Forms',
      date: 'July 10, 2023',
      content: 'As digital tools become more accessible, we\'re seeing a fascinating blend of traditional artistic techniques with cutting-edge technology. This fusion is creating new aesthetic languages and challenging our perception of what constitutes "authentic" art.'
    },
    {
      id: 2,
      title: 'Global Influences in Local Music Scenes',
      date: 'June 28, 2023',
      content: 'The internet has accelerated the cross-pollination of musical styles across geographical boundaries. Local music scenes are increasingly incorporating elements from distant cultures, resulting in rich, hybrid genres that reflect our interconnected world.'
    }
  ];
  
  const filteredTrends = trends.filter(trend => trend.category === activeCategory);
  
  return (
    <div className="trend-weaver-container">
      <header className="trend-weaver-header">
        <h1 className="trend-weaver-title">TrendWeaver</h1>
        <p className="trend-weaver-description">
          Connect with cultural trends across music, art, fashion, and entertainment.
          Stay ahead of the curve with personalized trend insights.
        </p>
      </header>
      
      <div className="trend-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`trend-category ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="trend-grid">
        {filteredTrends.map(trend => (
          <div key={trend.id} className="trend-item">
            <img src={trend.image} alt={trend.title} className="trend-image" />
            <div className="trend-content">
              <h3 className="trend-title">{trend.title}</h3>
              <p className="trend-description">{trend.description}</p>
              <div className="trend-meta">
                <span className="trend-date">{trend.date}</span>
                <span className="trend-category-tag">{trend.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <section className="trend-chart-section">
        <h2>Trend Analysis</h2>
        <div className="trend-chart">
          {/* Chart would go here in a real implementation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100%',
            color: '#666'
          }}>
            Interactive Trend Chart Coming Soon
          </div>
        </div>
      </section>
      
      <section className="trend-insights">
        <h2>Cultural Insights</h2>
        {insights.map(insight => (
          <div key={insight.id} className="insight-card">
            <div className="insight-header">
              <h3 className="insight-title">{insight.title}</h3>
              <span className="insight-date">{insight.date}</span>
            </div>
            <p className="insight-content">{insight.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TrendWeaver;
