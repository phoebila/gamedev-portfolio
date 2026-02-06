import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="footer-section">
      <div className="footer-content">
        <h2 className="footer-heading">Hold Your Horses</h2>
        <p className="footer-desc">
          I'm always open to discussing game development, design collaborations, or new opportunities.
        </p>

        <div className="footer-links">
          <a href="mailto:proyer@ucsc.edu" className="footer-link-btn">
            proyer@ucsc.edu
          </a>
          <a
            href="https://docs.google.com/document/d/1wyBcwQG3RLfHdP5QHGha7YPgK_n1Kf-U/edit?usp=sharing&ouid=114965531656279797689&rtpof=true&sd=true"
            className="footer-link-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        <div className="footer-socials">
          <a href="https://github.com/phoebila" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="footer-dot">•</span>
          <a href="https://www.linkedin.com/in/phoebe-royer/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="footer-dot">•</span>
          <a href="https://proyer.itch.io/" target="_blank" rel="noopener noreferrer">Itch.io</a>
          <span className="footer-dot">•</span>
          <a href="https://www.instagram.com/phoeberoyerr/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        <p className="footer-copy">© 2025 Phoebe Royer. All rights reserved.</p>

        <p className="footer-credit">
          Horse model by{' '}
          <a
            href="https://sketchfab.com/3d-models/realistic-animated-horse-75ca409fb4da47c9ae4725046e9bfa1e"
            target="_blank"
            rel="noopener noreferrer"
          >
            WildMesh 3D
          </a>{' '}
          on Sketchfab — licensed under{' '}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC Attribution
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
