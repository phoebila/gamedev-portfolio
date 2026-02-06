import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HorseBackground from './components/HorseBackground';
import Hero from './components/Hero';
import DockNav from './components/DockNav';
import About from './components/About';
import ProjectMenu from './components/ProjectMenu';
import ProjectCard from './components/ProjectCard';
import ExperienceMenu from './components/ExperienceMenu';
import ExperienceCard from './components/ExperienceCard';
import Footer from './components/Footer';
import { projectDetails } from './components/ProjectsData';
import { experienceData } from './components/ExperienceData';

// Icons for dock nav
const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const dockItems = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => scrollTo('home') },
    { icon: <UserIcon />, label: 'About', onClick: () => scrollTo('about') },
    { icon: <CodeIcon />, label: 'Projects', onClick: () => scrollTo('projects') },
    { icon: <BriefcaseIcon />, label: 'Experience', onClick: () => scrollTo('experience') },
    { icon: <MailIcon />, label: 'Contact', onClick: () => scrollTo('contact') },
  ];

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectDetails[projectId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setTimeout(() => scrollTo('projects'), 100);
  };

  const handleExperienceClick = (experienceId) => {
    setSelectedExperience(experienceData[experienceId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToExperiences = () => {
    setSelectedExperience(null);
    setTimeout(() => scrollTo('experience'), 100);
  };

  // Detail overlay mode
  if (selectedProject) {
    return (
      <div className="app-root">
        <HorseBackground />
        <DockNav items={dockItems} magnification={60} baseItemSize={40} panelHeight={56} />
        <div className="detail-overlay">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="detail-container"
          >
            <ProjectCard {...selectedProject} onBack={handleBackToProjects} />
          </motion.div>
        </div>
      </div>
    );
  }

  if (selectedExperience) {
    return (
      <div className="app-root">
        <HorseBackground />
        <DockNav items={dockItems} magnification={60} baseItemSize={40} panelHeight={56} />
        <div className="detail-overlay">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="detail-container"
          >
            <ExperienceCard {...selectedExperience} onBack={handleBackToExperiences} />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <HorseBackground />
      <DockNav items={dockItems} magnification={60} baseItemSize={40} panelHeight={56} />

      <main className="main-scroll">
        <Hero />

        <section id="about" className="section">
          <About />
        </section>

        <section id="projects" className="section">
          <ProjectMenu onProjectClick={handleProjectClick} />
        </section>

        <section id="experience" className="section">
          <ExperienceMenu onExperienceClick={handleExperienceClick} />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default App;
