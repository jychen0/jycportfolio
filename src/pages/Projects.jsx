import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/styles.css';

const Projects = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetSection = document.getElementById(location.state.scrollTo);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="projects-container">
        <div className="game-projects-container" id="game-projects">
          <h1>Game Projects</h1>
          <div className="game-projects-grid">

            <div className="project">
              <Link to="/projects/bellicose">
                <h2><u>Bellicose</u></h2>
                <img src="src/assets/images/Bellicose/Bellicose_Start.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/duckGame">
                <h2><u>Don't Feed The Duck</u></h2>
                <img src="src/assets/images/DontFeedTheDuck/Duck_Game_Start.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/snoozeOrLooze">
                <h2><u>Snooze Or Looze</u></h2>
                <img src="src/assets/images/SnoozeOrLooze/SnoozeOrLoozeTitle.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/condemned">
                <h2><u>Condemned</u></h2>
                <img src="src/assets/images/Condemned/Condemned_Title.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/alexBank">
                <h2><u>Escape Alex Bank</u></h2>
                <img src="src/assets/images/EscapeAlexBank/Escape_Alex_Bank_Start.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/starboundWanderers">
                <h2><u>Starbound Wanderers</u></h2>
                <img src="src/assets/images/StarboundWanderers/starbound_wanderers.png"></img>
              </Link>
            </div>
          </div>
        </div>
        <div className="software-projects-container" id="software-projects">
          <h1>Software Projects</h1>
          <div className="software-projects-grid">

            <div className="project">
              <Link to="/projects/customBingo">
                <h2><u>Custom Bingo</u></h2>
                <img src="src/assets/images/CustomBingo/bingo main page.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/leagueStatTracking">
                <h2><u>LoL Stats Tracking Tool</u></h2>
                <img src="src/assets/images/RiotDataProject/riot_api_data_sheet.png"></img>
              </Link>
            </div>

            <div className="project">
              <Link to="/projects/ticTacToe">
                <h2><u>Tic-Tac-Toe Variants</u></h2>
                <img src="src/assets/images/TicTacToeGamemodes/tictactoeMenu.png"></img>
              </Link>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
