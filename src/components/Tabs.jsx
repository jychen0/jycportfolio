import React, { useState } from 'react';
import '../assets/styles.css'; 

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('skills'); 

  return (
    <div className="tab-container">
      {/* Tab Titles */}
      <div className="tab-titles">
        <b
          className={`tab-links ${activeTab === 'skills' ? 'active-link' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </b>
        <b
          className={`tab-links ${activeTab === 'experience' ? 'active-link' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </b>
        <b
          className={`tab-links ${activeTab === 'education' ? 'active-link': ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </b>
      </div>

      {/* Tab Contents */}
      <div className={`tab-contents ${activeTab === 'skills' ? 'active-tab skills-tab' : ''}`} id="skills">
        <ul className="grid-content-skills">
          <li><span><b>Game Development</b></span><br />Unity<br />Unreal Engine</li>
          <li><span><b>Programming Languages</b></span><br />Java<br />Python<br />C#<br />C++<br />JavaScript<br />SQL</li>
          <li><span><b>Web Technologies</b></span><br />React.js<br />HTML5<br />CSS<br />Git<br />PlasticCSM</li>
          <li><span><b>Tools and Technologies</b></span><br />Google Docs<br />Google Sheets<br />Microsoft 365 Suite Apps<br />Visual Studio<br />Github Desktop<br />Canva<br />Notion</li>
          <li><span><b>Languages</b></span><br />English (Fluent)<br />Cantonese (Conversational)<br />Mandarin (Beginner)</li>
          <li><span><b>Others</b></span><br />Communication<br />Time Management<br />Interpersonal Skills<br />Attention to Detail<br />Problem-Solving</li>
        </ul>
      </div>

      <div className={`tab-contents ${activeTab === 'experience' ? 'active-tab experience-tab' : ''}`} id="experience">
        <ul className="grid-content-experience">
          {/* <li><span><b>Test1</b></span><br />test1<br />test1</li> */}
          <li><span><b>Seasonal Driver</b></span><br />Enterprise Mobility, Boston MA<br />June 2025 - August 2025</li>
          <li><span><b>Home Game Staff</b></span><br />Clark University, Worcester MA<br />Sep 2023 - Present (Work Study)</li>
          <li><span><b>Game Programmer & Designer</b></span><br />Studio Blue Jay, Worcester MA<br />Jan 2024 - May 2024</li>
          <li><span><b>AP Computer Science A Tutor</b></span><br />Online / Remote<br />Oct 2021 - May 2024 (Self-Employed)</li>
          <li><span><b>Cashier / Barista</b></span><br />Paris Baguette, Cambridge MA<br />Mar 2022 - Aug 2023 (Seasonal)</li>
        </ul>
      </div>

      <div className={`tab-contents ${activeTab === 'education' ? 'active-tab education-tab' : ''}`} id="education">
        <ul className="grid-content-education">
          <li><span><b>2023 - 2026 Clark University</b></span><br />B.A. in Interactive Media<br />B.S. in Data Science</li>
          <li><span><b>2021 - 2023 Bunker Hill Community College</b></span><br />Dual Enrollment Program</li>
          <li><span><b>2019 - 2023 Malden High School</b></span><br />High School Diploma</li>
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
