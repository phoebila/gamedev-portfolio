import React, { useEffect, useRef, useState } from 'react';
import '../styles.css';

const ArcadeDisplay = ({ children }) => {
  const crtRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Fixed canvas dimensions - layout is always designed at this resolution
  // The entire canvas scales uniformly to fit the CRT screen
  const CANVAS_WIDTH = 1700;
  const CANVAS_HEIGHT = 800;

  const updateScale = () => {
    if (!crtRef.current) return;

    const crtWidth = crtRef.current.clientWidth;
    const crtHeight = crtRef.current.clientHeight;

    if (crtWidth === 0 || crtHeight === 0) return;

    const scaleX = crtWidth / CANVAS_WIDTH;
    const scaleY = crtHeight / CANVAS_HEIGHT;
    setScale(Math.min(scaleX, scaleY));
  };

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    // Also observe the CRT element for size changes
    const observer = new ResizeObserver(updateScale);
    if (crtRef.current) observer.observe(crtRef.current);
    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="arcade-wrapper">
      {/* CRT overlay / screen */}
      <div className="crt-overlay" ref={crtRef}>
        {/* Uniformly scaled content canvas */}
        <div
          className="crt-canvas"
          ref={contentRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            position: 'absolute',
            top: 0,
            left: 0,
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
