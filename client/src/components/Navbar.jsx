import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">CulturaSphere</Link>
      <div className="nav-links">
        <Link to="/flavor-fusion" className="nav-link">FlavorFusion</Link>
        <Link to="/trend-weaver" className="nav-link">TrendWeaver</Link>
        {/* <Link to="/taste-quill" className="nav-link">TasteQuill</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
