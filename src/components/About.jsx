import React from "react";

const About = () => {
  return (
    <div className="about-section">
      {/* Swiss-inspired grid lines */}
      <div className="grid-lines">
        <div className="horizontal-line line-top"></div>
        <div className="horizontal-line line-bottom"></div>
      </div>
      
      
      <div className="about-heading">
        <h1>About</h1>
      </div>

      <div className="about-container">
        <div className="about-image-container">
          <img src={`${process.env.PUBLIC_URL}/about_pfp.jpg`} alt="portrait" />
        </div>

        <div className="about-content">
          <p>
            I'm a developer and designer blending technology with creative problem-solving. My journey began with a fascination for interactive systems and games, which led me to the University of California, Santa Cruz, where I pursued a B.S. in Computer Science: Game Design. There, I combined hardware, software, and creative coding to develop projects ranging from real-time OpenGL graphics to full-stack applications like my SpaceX Flight Tracker.
            </p>

          <p>
            Along the way, I’ve gained hands-on experience managing AWS S3 servers, building responsive React frontends, and developing Node.js backends, while also mentoring students in Python programming through the Academic Excellence Program. </p>

          <p>
            I’m passionate about creating intuitive, engaging experiences at the intersection of design and technology and am seeking opportunities in Frontend, Full Stack, or Software Engineering roles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;