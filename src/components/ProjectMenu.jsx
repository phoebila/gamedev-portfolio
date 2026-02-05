import React from 'react';
import { projectDetails } from './ProjectsData';

const MAX_DESC_LENGTH = 100;
const MAX_VISIBLE_SKILLS = 4;

const ProjectMenu = ({ onProjectClick }) => {
  const projects = Object.values(projectDetails);

  return (
    <div className="sw-projects-list">
      <h2 className="sw-projects-heading">Projects</h2>
      <div className="sw-projects-scroll">
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
              className="sw-project-card"
              onClick={() => onProjectClick(project.id)}
            >
              <div className="sw-card-meta">
                {project.date} / {project.category} / {project.type}
              </div>
              <h3 className="sw-card-title">{project.title}</h3>
              <p className="sw-card-desc">{truncatedDesc}</p>
              <div className="sw-card-skills">
                {visibleSkills.map((skill, i) => (
                  <span key={i} className="sw-skill-pill">
                    {skill}
                  </span>
                ))}
                {extraCount > 0 && (
                  <span className="sw-skill-pill sw-skill-more">
                    +{extraCount} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectMenu;
