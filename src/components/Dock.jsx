import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dock = ({ items, activeItem, onNavigate, isMobile = false }) => {
  return (
    <motion.nav
      className="dock"
      initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        zIndex: 100,
        ...(isMobile ? {
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        } : {
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
        })
      }}
    >
      <motion.div 
        layout
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: 'center',
          gap: isMobile ? '4px' : '2px',
          padding: isMobile ? '8px 12px' : '12px 8px',
          background: 'rgba(0, 20, 10, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '4px',
          border: '1px solid rgba(0, 255, 128, 0.25)',
          boxShadow: '0 0 20px rgba(0, 255, 128, 0.15), inset 0 0 30px rgba(0, 0, 0, 0.4)',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <motion.button
              layout
              onClick={() => onNavigate(item.id)}
              whileHover={{ 
                background: 'rgba(0, 255, 128, 0.15)',
                borderColor: 'rgba(0, 255, 128, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: activeItem === item.id 
                  ? 'rgba(0, 255, 128, 0.2)' 
                  : 'transparent',
                border: activeItem === item.id 
                  ? '1px solid rgba(0, 255, 128, 0.5)'
                  : '1px solid transparent',
                padding: isMobile ? '8px 14px' : '10px 16px',
                borderRadius: '2px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease, border-color 0.2s ease',
                width: isMobile ? 'auto' : '100%',
                fontFamily: '"VT323", monospace',
              }}
              transition={{ layout: { duration: 0.4, ease: 'easeInOut' } }}
            >
              <span style={{
                fontSize: isMobile ? '0.85rem' : '1rem',
                fontWeight: 500,
                fontFamily: '"VT323", monospace',
                color: activeItem === item.id ? '#00ff80' : 'rgba(255, 255, 255, 0.7)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textShadow: activeItem === item.id 
                  ? '0 0 10px rgba(0, 255, 128, 0.9)' 
                  : 'none',
              }}>
                {item.label}
              </span>
              
              {/* Active indicator */}
              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: isMobile ? '-10px' : '50%',
                      left: isMobile ? '50%' : '-8px',
                      transform: isMobile ? 'translateX(-50%)' : 'translateY(50%)',
                      width: '6px',
                      height: '6px',
                      background: '#00ff80',
                      boxShadow: '0 0 10px #00ff80, 0 0 20px rgba(0, 255, 128, 0.6)',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
            
            {/* Separator */}
            {index < items.length - 1 && (
              <motion.div 
                layout
                style={{
                  width: isMobile ? '1px' : '80%',
                  height: isMobile ? '16px' : '1px',
                  background: 'rgba(0, 255, 128, 0.2)',
                  alignSelf: 'center',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </motion.nav>
  );
};

export default Dock;
