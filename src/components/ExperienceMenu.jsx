import React from 'react';
import { experienceData } from './ExperienceData';

const MAX_DESC_LENGTH = 120;
const MAX_VISIBLE_SKILLS = 4;

const ExperienceMenu = ({ onExperienceClick }) => {
  const experiences = Object.values(experienceData);

  return (
    <div className="section-inner">
      <h2 className="section-heading">Experience</h2>
      <div className="card-grid">
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
              className="project-card"
              onClick={() => onExperienceClick(exp.id)}
            >
              <div className="card-body">
                <div className="card-meta">
                  {exp.date} / {exp.company} / {exp.type}
                </div>
                <h3 className="card-title">{exp.title}</h3>
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

export default ExperienceMenu;
