import React from 'react';

const About = () => {
  return (
    <div className="about-wrapper">
      <h2 className="section-heading">About</h2>

      <div className="about-grid">
        <div className="about-image-col">
          <img
            src={`${process.env.PUBLIC_URL}/about_pfp.jpg`}
            alt="Phoebe Royer"
            className="about-photo"
          />
        </div>

        <div className="about-text-col">
          <p>
            Hey, I'm Phoebe. I just finished my B.S. in Computer Science (Game Design) at UC Santa Cruz. Most of my time there was spent in Unity, Unreal, Godot, and Blender. Making games, breaking games, figuring out why things look wrong, that kind of thing.
          </p>
          <p>
            The classes that stuck with me the most were computer graphics, AR/VR, generative design, and creative coding. I like working on the stuff that sits between the code and what the player actually sees.
          </p>
          <p>
            Currently I'm at Paystand as an AI/ML engineering intern. Data pipelines, ML models, deploying endpoints. Before that I did IT at HardConnect, a software dev internship at Reveal Data, four years of tutoring Python at Baskin Engineering, and a summer teaching game design to high schoolers through COSMOS.
          </p>
          <p>
            I want to make games. That's basically it.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-card">
            <span className="stat-label">Education</span>
            <span className="stat-value">B.S. Computer Science: Game Design</span>
            <span className="stat-sub">UC Santa Cruz • 2020–2025</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Location</span>
            <span className="stat-value">Sunnyvale, California</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Seeking</span>
            <span className="stat-value">Gameplay Programmer / Developer</span>
            <span className="stat-sub">Designer • 3D Artist</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
