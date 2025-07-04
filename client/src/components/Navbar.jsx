import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">CulturaSphere</Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/flavor-fusion" className="nav-link">FlavorFusion</Link>
          </li>
          <li className="nav-item">
            <Link to="/trend-weaver" className="nav-link">TrendWeaver</Link>
          </li>
          <li className="nav-item">
            <Link to="/taste-quill" className="nav-link">TasteQuill</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
