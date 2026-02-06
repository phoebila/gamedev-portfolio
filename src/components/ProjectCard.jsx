import React from 'react';

const ProjectCard = ({
  title,
  description,
  skills = [],
  imageUrl,
  videoUrl,
  embedUrl,
  projectUrl,
  githubUrl,
  itchoUrl,
  onBack,
}) => {
  return (
    <div className="detail-wrapper">
      {onBack && (
        <button className="back-btn" onClick={onBack}>
          ← BACK TO PROJECTS
        </button>
      )}

      <div className="detail-scroll">
        <div className="detail-card">
          {embedUrl ? (
            <div className="detail-embed">
              <iframe
                src={embedUrl}
                title={title}
                className="detail-iframe"
                allow="accelerometer; autoplay"
                scrolling="no"
              />
            </div>
          ) : videoUrl ? (
            <video
              src={videoUrl}
              className="detail-video"
              controls
              muted
              playsInline
              preload="metadata"
            />
          ) : imageUrl ? (
            <img src={imageUrl} alt={title} className="detail-image" />
          ) : null}

          <div className="detail-content">
            <h3 className="detail-title">{title}</h3>
            <p className="detail-desc">{description}</p>

            <div className="detail-skills">
              {skills.map((skill, index) => (
                <span key={index} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="detail-links">
              {projectUrl && (
                <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
                  VIEW PROJECT
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
                  GITHUB
                </a>
              )}
              {itchoUrl && (
                <a href={itchoUrl} target="_blank" rel="noopener noreferrer" className="detail-link">
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
