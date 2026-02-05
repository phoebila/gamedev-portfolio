import React from 'react';
import { experienceData } from './ExperienceData';

const MAX_DESC_LENGTH = 100;
const MAX_VISIBLE_SKILLS = 4;

const ExperienceMenu = ({ onExperienceClick }) => {
  const experiences = Object.values(experienceData);

  return (
    <div className="sw-projects-list">
      <h2 className="sw-projects-heading">Experience</h2>
      <div className="sw-projects-scroll">
        {experiences.map((exp) => {
          const truncatedDesc =
            exp.description.length > MAX_DESC_LENGTH
              ? exp.description.slice(0, MAX_DESC_LENGTH) + '...'
              : exp.description;

          const visibleSkills = exp.skills.slice(0, MAX_VISIBLE_SKILLS);
          const extraCount = exp.skills.length - MAX_VISIBLE_SKILLS;

          return (
            <div
              key={exp.id}
              className="sw-project-card"
              onClick={() => onExperienceClick(exp.id)}
            >
              <div className="sw-card-meta">
                {exp.date} / {exp.company} / {exp.type}
              </div>
              <h3 className="sw-card-title">{exp.title}</h3>
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

export default ExperienceMenu;
