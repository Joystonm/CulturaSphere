import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>CulturaSphere</h3>
          <p>Connecting cultures through taste and trends</p>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} CulturaSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
