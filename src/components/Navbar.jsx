import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
      <img src={`${process.env.PUBLIC_URL}/assets/images/Others/BANANAS.png`} alt="Logo"  className="logo" />

      <div className={`nav-toggle ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Nav Menu*/}
      <div className={`mobile-nav ${menuActive ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li className="submenu">
            <div className="submenu-header" onClick={toggleSubmenu}>
              <Link to="/projects">Projects</Link>
              <span className={`submenu-arrow ${submenuActive ? 'active' : ''}`}>&#9660;</span>
            </div>
            <ul className={`submenu-list ${submenuActive ? 'active' : ''}`}>
              <li><span onClick={handleGameProjectClick}>Game Projects</span></li>
              <li><span onClick={handleSoftwareProjectClick}>Software Projects</span></li>
            </ul>
          </li>
          <li><a href="/src/assets/OtherFiles/JasonChenResume.pdf" target="_blank">Resume</a></li>
          <li><span onClick={handleContactClick} className="nav-btn">Contact</span></li>
        </ul>
      </div>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li className="dropdown">
          <Link to="/projects">Projects</Link>
          <ul className="dropdown-menu">
            <li><span onClick={handleGameProjectClick} className="nav-btn">Game Development</span></li>
            <li><span onClick={handleSoftwareProjectClick} className="nav-btn">Software Development</span></li>
          </ul>
        </li>
        <li><a href={`${process.env.PUBLIC_URL}assets/OtherFiles/JasonChenResume.pdf`} target="_blank">Resume</a></li>
        <li>
          <span onClick={handleContactClick} className="nav-btn">
            Contact
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
