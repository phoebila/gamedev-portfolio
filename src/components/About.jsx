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
            I’m a UC Santa Cruz Computer Science graduate specializing in Game Design. During my undergraduate studies, I worked on a variety of game projects, gaining hands-on experience with game mechanics, level design, UI/UX, and engines including Unity, Unreal, and Godot. These projects allowed me to apply skills in C/C++, C#, Python, and JavaScript, while exploring graphics programming, shaders, and interactive gameplay systems. </p>

          <p>
            Through my time at the COSMOS program, I mentored high school students in small teams to design and develop games, focusing on mechanics, collaborative design, and experimenting across different engines. This experience strengthened my ability to guide iterative design processes, foster creativity in a team, and translate ideas into engaging, playable experiences.</p>
            <p>
            I’m eager to bring creativity, collaboration, and technical expertise to teams crafting immersive games.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;