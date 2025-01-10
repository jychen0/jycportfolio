import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [submenuActive, setSubmenuActive] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    setSubmenuActive(false);
  };

  const toggleSubmenu = (e) => {
    e.stopPropagation();
    setSubmenuActive(!submenuActive); 
  };

  const handleContactClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    setMenuActive(false);
  };

  const handleGameProjectClick = () => {
    navigate('/projects', { state: {scrollTo: 'game-projects '} });
    setMenuActive(false);
  };

  const handleSoftwareProjectClick = () => {
    navigate('/projects', { state: { scrollTo: 'software-projects' } });
    setMenuActive(false);
  };

  return (
    <nav>
      <img src="/src/assets/images/Others/BANANAS.png" alt="Logo"  className="logo" />

      <div className={`nav-toggle ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Nav Menu*/}
      <div className={`mobile-nav ${menuActive ? 'active' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li className="submenu">
            <div className="submenu-header" onClick={toggleSubmenu}>
              <a href="/projects">Projects</a>
              <span className={`submenu-arrow ${submenuActive ? 'active' : ''}`}>&#9660;</span>
            </div>
            <ul className={`submenu-list ${submenuActive ? 'active' : ''}`}>
              <li><a onClick={handleGameProjectClick}>Game Projects</a></li>
              <li><a onClick={handleSoftwareProjectClick}>Software Projects</a></li>
            </ul>
          </li>
          <li><a href="/src/assets/OtherFiles/JasonChenResume.pdf" target="_blank">Resume</a></li>
          <li><a onClick={handleContactClick} className="nav-btn">Contact</a></li>
        </ul>
      </div>

      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li className="dropdown">
          <a href="/projects">Projects</a>
          <ul className="dropdown-menu">
            <li><a onClick={handleGameProjectClick} className="nav-btn">Game Development</a></li>
            <li><a onClick={handleSoftwareProjectClick} className="nav-btn">Software Development</a></li>
          </ul>
        </li>
        <li><a href="/src/assets/OtherFiles/JasonChenResume.pdf" target="_blank">Resume</a></li>
        <li>
          <a onClick={handleContactClick} className="nav-btn">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
