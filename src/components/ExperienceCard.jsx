import React from 'react';

const ExperienceCard = ({
  title,
  company,
  description,
  skills = [],
  achievements = [],
  location,
  date,
  onBack,
}) => {
  return (
    <div className="sw-detail-wrapper">
      {onBack && (
        <button className="sw-back-btn" onClick={onBack}>
          ← BACK TO EXPERIENCE
        </button>
      )}

      <div className="sw-detail-scroll">
        <div className="sw-detail-card">
          <div className="sw-detail-content">
            <h3 className="sw-detail-title">{title}</h3>
            <div className="sw-exp-company">{company} &bull; {location}</div>
            <div className="sw-exp-date">{date}</div>

            <p className="sw-detail-desc">{description}</p>

            {achievements && achievements.length > 0 && (
              <div className="sw-exp-achievements">
                <h4 className="sw-exp-achievements-heading">Key Achievements</h4>
                <ul className="sw-exp-achievements-list">
                  {achievements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="sw-detail-skills">
              {skills.map((skill, index) => (
                <span key={index} className="sw-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
