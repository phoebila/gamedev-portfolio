import React from 'react';

const ProjectCard = ({
  title,
  description,
  skills = [],
  imageUrl,
  projectUrl,
  githubUrl,
  itchoUrl,
  onBack,
}) => {
  return (
    <div className="sw-detail-wrapper">
      {onBack && (
        <button className="sw-back-btn" onClick={onBack}>
          ← BACK TO PROJECTS
        </button>
      )}

      <div className="sw-detail-scroll">
        <div className="sw-detail-card">
          {imageUrl && (
            <img src={imageUrl} alt={title} className="sw-detail-image" />
          )}

          <div className="sw-detail-content">
            <h3 className="sw-detail-title">{title}</h3>
            <p className="sw-detail-desc">{description}</p>

            <div className="sw-detail-skills">
              {skills.map((skill, index) => (
                <span key={index} className="sw-skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="sw-detail-links">
              {projectUrl && (
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-detail-link"
                >
                  VIEW PROJECT
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-detail-link"
                >
                  GITHUB
                </a>
              )}
              {itchoUrl && (
                <a
                  href={itchoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-detail-link"
                >
                  ITCH.IO
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
