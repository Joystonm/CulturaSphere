import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to CulturaSphere</h1>
        <p>Discover cultural connections through taste, trends, and creative expression.</p>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h2>FlavorFusion</h2>
          <p>Explore culinary connections and discover new tastes based on your preferences.</p>
          <Link to="/flavor-fusion" className="feature-link">
            Explore Flavors
          </Link>
        </div>

        <div className="feature-card">
          <h2>TrendWeaver</h2>
          <p>Connect with cultural trends across music, art, fashion, and entertainment.</p>
          <Link to="/trend-weaver" className="feature-link">
            Discover Trends
          </Link>
        </div>

        <div className="feature-card">
          <h2>TasteQuill</h2>
          <p>Express your cultural experiences and connect with others through creative writing.</p>
          <Link to="/taste-quill" className="feature-link">
            Start Writing
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
