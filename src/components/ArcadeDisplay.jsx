import React, { useEffect, useRef, useState } from 'react';
import '../styles.css';

const ArcadeDisplay = ({ children }) => {
  const crtRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  const ORIGINAL_WIDTH = 1700;
  const ORIGINAL_HEIGHT = 800;

  const updateScale = () => {
    if (!crtRef.current || !contentRef.current) return;

    const crtWidth = crtRef.current.clientWidth;
    const crtHeight = crtRef.current.clientHeight;

    const scaleX = crtWidth / ORIGINAL_WIDTH;
    const scaleY = crtHeight / ORIGINAL_HEIGHT;

    setScale(Math.min(scaleX, scaleY));
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="arcade-wrapper">
      {/* CRT overlay / screen */}
      <div className="crt-overlay" ref={crtRef}>
        {/* Scaled content */}
        <div
          className="container"
          ref={contentRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${ORIGINAL_WIDTH}px`,
            height: `${ORIGINAL_HEIGHT}px`,
          }}
        >
          {children}
        </div>
      </div>

      {/* Optional: scanlines / CRT effects */}
      <div className="crt-scanlines"></div>
    </div>
  );
};

export default ArcadeDisplay;
