import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import projectData from '../assets/projectData.json';
import ContributionDetail from '../components/ContributionDetail';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];
  const [dropdownStates, setDropdownStates] = useState([false, false, false]);
  const galleryRef = useRef(null); 
  const mobileGalleryRef = useRef(null); 
  const [activeContributionIndex, setActiveContributionIndex] = useState(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  if (!project) return <h2>Project not found!</h2>;

  // When page loads with a hash, scroll to that contribution and set the header
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      if (hash.startsWith('#contribution-')) {
        const idx = parseInt(hash.replace('#contribution-', ''), 10);
        if (!Number.isNaN(idx) && project.detailedContributions && project.detailedContributions[idx]) {
          setActiveContributionIndex(idx);
          setTimeout(() => {
            const el = document.getElementById(`contribution-${idx}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 60);
        }
      }
    }
  }, [project]);

  const handleContributionClick = (index) => {
    setActiveContributionIndex(index);
    const el = document.querySelector(`#contribution-${index} .contribution-divider`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - 100;
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
    try {
      window.history.replaceState(null, '', `#contribution-${index}`);
    } catch (e) {
      // ignore
    }
  };

  const toggleDropdown = (index) => {
    setDropdownStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const scrollMedia = (ref, direction) => {
    if (isScrolling) return;
    setIsScrolling(true);

    if (!ref.current) return;

    setCurrentMediaIndex((prevIndex) => {
      let newIndex = prevIndex + direction;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= project.media.length) newIndex = project.media.length - 1;

      const galleryItem = ref.current.children[newIndex];
      if (galleryItem) {
        ref.current.scrollTo({
          left: galleryItem.offsetLeft,
          behavior: 'smooth',
        });
      }

      setTimeout(() => setIsScrolling(false), 400);
      return newIndex;
    });
  };

  return (
    <>
      <Navbar />

      {/* ===== MOBILE PROJECT DETAILS ===== */}
      <div className="mobile-project-detail-container">
        <h1 className="project-title">{project.title}</h1>

        <div className="carousel">
          <button
            className={`carousel-btn prev ${currentMediaIndex === 0 ? 'disabled' : ''}`}
            onClick={() => scrollMedia(mobileGalleryRef, -1)}
            disabled={currentMediaIndex === 0}
          >
            &#10094;
          </button>

          <div className="carousel-track" ref={mobileGalleryRef}>
            {project.media.map((item, index) => (
              <div key={index} className="carousel-item">
                {item.type === 'image' ? (
                  <img src={item.src} alt={`Project Media ${index + 1}`} />
                ) : (
                  <video
                    src={item.src}
                    controls
                    muted
                    autoPlay={index === currentMediaIndex}
                    loop
                  />
                )}
              </div>
            ))}
          </div>

          <button
            className={`carousel-btn next ${currentMediaIndex === project.media.length - 1 ? 'disabled' : ''}`}
            onClick={() => scrollMedia(mobileGalleryRef, 1)}
            disabled={currentMediaIndex === project.media.length - 1}
          >
            &#10095;
          </button>
        </div>

        {/* Dropdown Sections */}
        <div className="section dropdown description-dropdown">
          <div className="dropdown-header" onClick={() => toggleDropdown(0)}>
            <h3 className="section-title">Description</h3>
            <span className={`dropdown-arrow ${dropdownStates[0] ? 'active' : ''}`}>&#9660;</span>
          </div>
          {dropdownStates[0] && (
            <ul className="list">
              <li className="list-item">{project.description}</li>
            </ul>
          )}
        </div>

        <div className="section dropdown contributions-dropdown">
          <div className="dropdown-header" onClick={() => toggleDropdown(1)}>
            <h3 className="section-title">Contributions</h3>
            <span className={`dropdown-arrow ${dropdownStates[1] ? 'active' : ''}`}>&#9660;</span>
          </div>
          {dropdownStates[1] && (
            <ul className="list">
              {project.contributions.map((item) => (
                <li className="list-item" key={`contribution-${item}`}>
                  - {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="section dropdown extra-info-dropdown">
          <div className="dropdown-header" onClick={() => toggleDropdown(2)}>
            <h3 className="section-title">Extra Info</h3>
            <span className={`dropdown-arrow ${dropdownStates[2] ? 'active' : ''}`}>&#9660;</span>
          </div>
          {dropdownStates[2] && (
            <div className="extra-info-content">
              {project.link &&
                project.link.site?.length > 0 &&
                project.link.url?.length > 0 &&
                project.link.site.some((site, index) => project.link.url[index]) && (
                  <>
                    <h3 className="small-section-title">Links</h3>
                    <ul className="list">
                      {project.link.site.map((site, index) => {
                        const url = project.link.url[index];
                        const type = project.link.type?.[index];
                        return type === 'internal' ? (
                          <li className="list-item" key={`link-${index}`}>
                            <Link to={url}>
                              <p>{site}</p>
                            </Link>
                          </li>
                        ) : (
                          <li className="list-item" key={`link-${index}`}>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              <p>{site}</p>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

              <h3 className="small-section-title">Role(s)</h3>
              <ul className="list">
                {project.role.map((r) => (
                  <li className="list-item" key={r}>
                    {r}
                  </li>
                ))}
              </ul>

              <h3 className="small-section-title">Team</h3>
              <ul className="list">
                {project.team.map((t) => (
                  <li className="list-item" key={t}>
                    {t}
                  </li>
                ))}
              </ul>

              <h3 className="section-title">Technologies Used</h3>
              <ul className="list">
                {project.technologies.map((tech) => (
                  <li className="list-item" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ===== DESKTOP VERSION ===== */}
      <div className="project-detail-container">
        <div className="project-detail-left">
          <h1 className="project-title">{project.title}</h1>

          <div className="carousel">
            <button
              className={`carousel-btn prev ${currentMediaIndex === 0 ? 'disabled' : ''}`}
              onClick={() => scrollMedia(galleryRef, -1)}
              disabled={currentMediaIndex === 0}
            >
              &#10094;
            </button>

            <div className="carousel-track" ref={galleryRef}>
              {project.media.map((item, index) => (
                <div key={index} className="carousel-item">
                  {item.type === 'image' ? (
                    <img src={item.src} alt={`Project Media ${index + 1}`} />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      muted
                      autoPlay={index === currentMediaIndex}
                      loop
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              className={`carousel-btn next ${currentMediaIndex === project.media.length - 1 ? 'disabled' : ''}`}
              onClick={() => scrollMedia(galleryRef, 1)}
              disabled={currentMediaIndex === project.media.length - 1}
            >
              &#10095;
            </button>
          </div>

          <div className="section description">
            <h3 className="section-title">Description</h3>
            <ul className="list">
              <li className="list-item">{project.description}</li>
            </ul>
          </div>
        </div>

        <div className="project-detail-right">
          <div className="section contributions">
            <h3 className="section-title">Contributions</h3>
            <ul className="list">
              {project.contributions.map((item, index) => (
                <li className="list-item" key={`contribution-${item}`}>
                  - {item}
                  {project.detailedContributions && 
                   project.detailedContributions[index]?.title && (
                    <a 
                      href={`#contribution-${index}`}
                      className="contribution-link"
                      title="View detailed explanation"
                      onClick={(e) => { e.preventDefault(); handleContributionClick(index); }}
                    >
                      <sup>[{index + 1}]</sup>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="description-section extra-info">
            {project.link &&
              project.link.site?.length > 0 &&
              project.link.url?.length > 0 &&
              project.link.site.some((site, index) => project.link.url[index]) && (
                <>
                  <h3 className="small-section-title">Links</h3>
                  <ul className="list">
                    {project.link.site.map((site, index) => {
                      const url = project.link.url[index];
                      const type = project.link.type?.[index];
                      return type === 'internal' ? (
                        <li className="small-list-item" key={`link-${index}`}>
                          <Link to={url}>
                            <p>{site}</p>
                          </Link>
                        </li>
                      ) : (
                        <li className="small-list-item" key={`link-${index}`}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            <p>{site}</p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

            <h3 className="small-section-title">Role(s)</h3>
            <ul className="list">
              {project.role.map((role, index) => (
                <li className="small-list-item" key={role}>
                  {role}
                  {index < project.role.length - 1 && ','}
                </li>
              ))}
            </ul>

            <h3 className="small-section-title">Team</h3>
            <ul className="list">
              {project.team.map((team, index) => (
                <li className="small-list-item" key={team}>
                  {team}
                  {index < project.team.length - 1 && ','}
                </li>
              ))}
            </ul>

            <h3 className="small-section-title">Technologies Used</h3>
            <ul className="list">
              {project.technologies.map((tech, index) => (
                <li className="small-list-item" key={tech}>
                  {tech}
                  {index < project.technologies.length - 1 && ','}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


      {/* ===== DETAILED CONTRIBUTIONS SECTION ===== */}
      {project.detailedContributions && project.detailedContributions.length > 0 && (
        <div className="detailed-contributions-section">
          {project.detailedContributions.map((contribution, index) => (
            <ContributionDetail key={index} contribution={contribution} index={index} />
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProjectDetail;
