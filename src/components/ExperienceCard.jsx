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
    <div className="detail-wrapper">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          ← BACK TO EXPERIENCE
        </button>
      )}

      <div className="detail-scroll">
        <div className="detail-card">
          <div className="detail-content">
            <h3 className="detail-title">{title}</h3>
            <div className="exp-company">{company} &bull; {location}</div>
            <div className="exp-date">{date}</div>

            <p className="detail-desc">{description}</p>

            {achievements && achievements.length > 0 && (
              <div className="exp-achievements">
                <h4 className="exp-achievements-heading">Key Achievements</h4>
                <ul className="exp-achievements-list">
                  {achievements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="detail-skills">
              {skills.map((skill, index) => (
                <span key={index} className="skill-pill">
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
