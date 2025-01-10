import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/styles.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero-container">
        <div className="hero" id="home-page">
          <div className="home-col-1">
            <h1>Hi, I'm Jason Chen</h1>
            <p>
              Game Designer. Game Programmer. Software Engineer. Data Analyst.
            </p>
            <p>Here are some of my projects!</p>
            <div className="featured-projects">
              <Link to="/projects/snoozeOrLooze">
                <img src={`${process.env.PUBLIC_URL}/assets/images/SnoozeOrLooze/SnoozeOrLoozeTitle.png`} alt="Snooze Or Looze Title Screen"></img>
                <p>Snooze Or Looze</p>
              </Link>
              <Link to="/projects/duckGame">
                <img src={`${process.env.PUBLIC_URL}/assets/images/DontFeedTheDuck/Duck_Game_Start.png`} alt="DontFeedTheDuck Title Screen"></img>
                <p>Don't Feed The Duck</p>
              </Link>
              <Link to="/projects/bellicose">
                <img src={`${process.env.PUBLIC_URL}/assets/images/Bellicose/Bellicose_Start.png`} alt="Bellicose Title Screen"></img>
                <p>Bellicose</p>
              </Link>

              {/* <Link to="/projects/bellicose">
                <img src="/src/assets/images/Bellicose/Bellicose_Start.png" alt="Bellicose Title Screen"></img>
                <p>Bellicose</p>
              </Link>

              <Link to="/projects/bellicose">
                <img src="/src/assets/images/Bellicose/Bellicose_Start.png" alt="Bellicose Title Screen"></img>
                <p>Bellicose</p>
              </Link>

              <Link to="/projects/bellicose">
                <img src="/src/assets/images/Bellicose/Bellicose_Start.png" alt="Bellicose Title Screen"></img>
                <p>Bellicose</p>
              </Link> */}
            </div>
            <Link to="/projects">
              <button>More Projects</button>
            </Link>
          </div>
          <div className="home-col-2">
            <img src={`${process.env.PUBLIC_URL}/assets/images/Me/user-2.jpg`} />
          </div>
        </div>
      </div>

      <div className="contact-section" id="contact">
        <h2>Contact Me</h2>
        <p><i className="fa-regular fa-envelope"></i> chenjason417@gmail.com</p>
        <p><i className="fa-solid fa-phone"></i> +1 617-785-4712</p>
        <p><i className="fa-brands fa-discord"></i> legendarybanana</p> 
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/jason-chen-8850a0289/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/jychen0" target="_blank"><i className="fa-brands fa-github"></i></a>
        </div>
        <a href={`${process.env.PUBLIC_URL}/assets/OtherFiles/JasonChenResume.pdf`} download className="btn">Download Resume</a>
      </div>
      <Footer />
    </>
  );
};

export default Home;
