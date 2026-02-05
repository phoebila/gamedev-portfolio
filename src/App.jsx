import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import About from './components/About';
import Dock from './components/Dock';
import Viewfinder from './components/Viewfinder';
import ExperienceMenu from './components/ExperienceMenu';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import ProjectMenu from './components/ProjectMenu';
import { projectDetails } from './components/ProjectsData';
import { experienceData } from './components/ExperienceData';
import ArcadeDisplay from './components/ArcadeDisplay';
import Home from './components/Home';

// Navigation items for the dock
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
];

// Page transition variants
const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 8,
    filter: 'blur(4px)'
  },
  animate: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.4, 
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    filter: 'blur(4px)',
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 1, 1]
    }
  }
};

// Wrapper component to handle navigation logic
const AppContent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isWindows = navigator.platform.toUpperCase().indexOf('WIN') >= 0;
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      document.body.classList.add('firefox');
    }
    if (isWindows && isFirefox) {
      document.body.classList.add('windows-firefox');
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    if (isMac) {
      document.body.classList.add('mac-os');
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, location.pathname, navigate]);

  // Simplified navigation - no more setTimeout!
  const handleNavigation = (path) => {
    const navigatePath = path === 'home' ? '' : path;
    
    if (navigatePath !== location.pathname.slice(1)) {
      setSelectedProject(null);
      setSelectedExperience(null);
      navigate(`/${navigatePath}`);
    }
  };

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectDetails[projectId]);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const handleExperienceClick = (experienceId) => {
    setSelectedExperience(experienceData[experienceId]);
  };

  const handleBackToExperiences = () => {
    setSelectedExperience(null);
  };

  const currentPath = location.pathname.slice(1) || 'home';

  return (
    <div className="container">
      <ArcadeDisplay>
        <Viewfinder />
        
        {/* Unified Dock for both mobile and desktop */}
        <Dock 
          items={navItems}
          activeItem={currentPath}
          onNavigate={handleNavigation}
          isMobile={isMobile}
        />
        
        {/* Animated page transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="content-container"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={
                selectedProject ? (
                  <motion.div
                    key="project-detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <ProjectCard {...selectedProject} onBack={handleBackToProjects} />
                  </motion.div>
                ) : (
                  <ProjectMenu onProjectClick={handleProjectClick} />
                )
              } />
              <Route path="/experience" element={
                selectedExperience ? (
                  <motion.div
                    key="experience-detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <ExperienceCard {...selectedExperience} onBack={handleBackToExperiences} />
                  </motion.div>
                ) : (
                  <ExperienceMenu onExperienceClick={handleExperienceClick} />
                )
              } />
              {/* Catch-all: redirect any unknown route to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </ArcadeDisplay>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter basename="/gamedev-portfolio">
      <AppContent />  
    </BrowserRouter>
  );
};

export default App;
