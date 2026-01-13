import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/styles.css';
import projectData from '../assets/projectData.json';

const Projects = () => {
  const location = useLocation();
  const [showMoreGames, setShowMoreGames] = useState(false);
  const [showMoreSoftware, setShowMoreSoftware] = useState(false);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetSection = document.getElementById(location.state.scrollTo);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const gameProjects = Object.entries(projectData)
    .filter(([key, proj]) => proj.type === "Game" && proj.revealed)
    .map(([key, proj]) => ({
      path: `/projects/${key}`,
      title: proj.title,
      img: proj.media[0]?.src || "",
    }));

  const softwareProjects = Object.entries(projectData)
    .filter(([key, proj]) => proj.type === "Software" && proj.revealed)
    .map(([key, proj]) => ({
      path: `/projects/${key}`,
      title: proj.title,
      img: proj.media[0]?.src || "",
    }));

  const renderProjects = (projects, showMore, setShowMore, gridClass) => {
    const visibleProjects = showMore ? projects : projects.slice(0, 6);

    return (
      <>
        <div className={gridClass}>
          {visibleProjects.map((proj, idx) => (
            <div className="project" key={idx}>
              <Link to={proj.path}>
                <h2><u>{proj.title}</u></h2>
                <img src={proj.img} alt={proj.title} />
              </Link>
            </div>
          ))}
        </div>
        {projects.length > 6 && (
          <div className="show-button">
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <div className="projects-container">

        {/* Game Projects */}
        <div className="game-projects-container">
          <h1>Game Projects</h1>
          {renderProjects(gameProjects, showMoreGames, setShowMoreGames, "game-projects-grid")}
        </div>

        {/* Software Projects */}
        <div className="software-projects-container">
          <h1>Software Projects</h1>
          {renderProjects(softwareProjects, showMoreSoftware, setShowMoreSoftware, "software-projects-grid")}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
