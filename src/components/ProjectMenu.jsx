import React from 'react';
import { projectDetails } from './ProjectsData';

const MAX_DESC_LENGTH = 120;
const MAX_VISIBLE_SKILLS = 4;

const ProjectMenu = ({ onProjectClick }) => {
  const projects = Object.values(projectDetails);

  return (
    <div className="section-inner">
      <h2 className="section-heading">Projects</h2>
      <div className="card-grid">
        {projects.map((project) => {
          const truncatedDesc =
            project.description.length > MAX_DESC_LENGTH
              ? project.description.slice(0, MAX_DESC_LENGTH) + '...'
              : project.description;

          const visibleSkills = project.skills.slice(0, MAX_VISIBLE_SKILLS);
          const extraCount = project.skills.length - MAX_VISIBLE_SKILLS;

          return (
            <div
              key={project.id}
              className="project-card"
              onClick={() => onProjectClick(project.id)}
            >
              {/* Thumbnail preview */}
              {project.imageUrl ? (
                <div className="card-thumb">
                  <img src={project.imageUrl} alt={project.title} />
                </div>
              ) : project.videoUrl ? (
                <div className="card-thumb">
                  <video src={project.videoUrl} muted preload="metadata" />
                </div>
              ) : project.embedUrl ? (
                <div className="card-thumb card-thumb-embed">
                  <iframe
                    src={project.embedUrl}
                    title={project.title}
                    scrolling="no"
                    tabIndex={-1}
                  />
                </div>
              ) : null}

              <div className="card-body">
                <div className="card-meta">
                  {project.date} / {project.category} / {project.type}
                </div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{truncatedDesc}</p>
                <div className="card-skills">
                  {visibleSkills.map((skill, i) => (
                    <span key={i} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                  {extraCount > 0 && (
                    <span className="skill-pill skill-more">+{extraCount}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectMenu;
