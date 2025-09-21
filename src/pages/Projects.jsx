import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/styles.css';

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

  // game projects list
  const gameProjects = [
    { path: "/projects/bellicose", title: "Bellicose", img: "/images/Bellicose/Bellicose_Start.png" },
    { path: "/projects/duckGame", title: "Don't Feed The Duck", img: "/images/DontFeedTheDuck/Duck_Game_Start.png" },
    { path: "/projects/snoozeOrLooze", title: "Snooze Or Looze", img: "/images/SnoozeOrLooze/SnoozeOrLoozeTitle.png" },
    { path: "/projects/condemned", title: "Condemned", img: "/images/Condemned/Condemned_Title.png" },
    { path: "/projects/rerender", title: "Rerender", img: "/images/Rerender/Rerender_Title.jpg"},
    { path: "/projects/kamikaze", title: "KamiKaZe", img: "/images/KamiKaZe/Kamikaze_Title.jpg"},
    { path: "/projects/alexBank", title: "Escape Alex Bank", img: "/images/EscapeAlexBank/Escape_Alex_Bank_Start.png" },
    { path: "/projects/starboundWanderers", title: "Starbound Wanderers", img: "/images/StarboundWanderers/starbound_wanderers.png" }
  ];

  // software projects list
  const softwareProjects = [
    { path: "/projects/customBingo", title: "Custom Bingo", img: "/images/CustomBingo/bingo main page.png" },
    { path: "/projects/leagueStatTracking", title: "LoL Stats Tracking Tool", img: "/images/RiotDataProject/riot_api_data_sheet.png" },
    { path: "/projects/ticTacToe", title: "Tic-Tac-Toe Variants", img: "/images/TicTacToeGamemodes/tictactoeMenu.png" },
  ];

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
