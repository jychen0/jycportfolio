import React, { useState, useRef, } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import projectData from '../assets/projectData.json'
import '../assets/styles.css';


const ProjectDetail = () => {
    const { projectId } = useParams();
    const project = projectData[projectId];
    const [dropdownStates, setDropdownStates] = useState([false, false, false, false]);
    const galleryRef = useRef(null);
    const [isScrolling, setIsScrolling] = useState(false);

    if (!project) {
        return <h2>Project not found!</h2>;
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const toggleDropdown = (index) => {
        setDropdownStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const scrollImages = (direction) => {
        if (isScrolling) return;

        setIsScrolling(true);

        if (galleryRef.current) {
            const scrollAmount = direction * galleryRef.current.offsetWidth; 
            galleryRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });

            setCurrentImageIndex((prevIndex) => {
                const newIndex = prevIndex + direction;
                if (newIndex < 0) return 0; 
                if (newIndex >= project.images.length) return project.images.length - 1;
                return newIndex;
            });

            setTimeout(() => {
                setIsScrolling(false);
            }, 400);
        }
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
            <Navbar />
            {/* Mobile Project Details*/}
            <div className="mobile-project-detail-container">
                <h1>{project.title}</h1>
                <div className="image-gallery-container">
                        <button 
                            className={`scroll-btn prev ${currentImageIndex === 0 ? 'disabled' : ''}`}
                            onClick={handlePrevImage}
                            disabled={currentImageIndex === 0}>
                            &#10094;
                        </button>
                        <div className="gallery-wrapper" ref={galleryRef}>
                            {project.images.map((image, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={project.images[currentImageIndex]} alt={`Project Image ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <button 
                            className={`scroll-btn next ${currentImageIndex === project.images.length - 1 ? 'disabled' : ''}`}
                            onClick={handleNextImage}
                            disabled={currentImageIndex === project.images.length - 1}>
                            &#10095;
                        </button>
                    </div>
                <div className="dropdown-section">
                    <div
                        className="dropdown-header"
                        onClick={() => toggleDropdown(0)}
                    >
                        <h3>Description</h3>
                        <span className={`dropdown-arrow ${dropdownStates[0] ? 'active' : ''}`}>&#9660;</span>
                    </div>
                    {dropdownStates[0] && (
                        <div className="dropdown-content">
                            <p>{project.description}</p>
                            <br />
                            {project.reason && (<p>{project.reason}</p>)}
                        </div>
                    )}
                </div>

                <div className="dropdown-section">
                    <div
                        className="dropdown-header"
                        onClick={() => toggleDropdown(1)}
                    >
                        <h3>Contributions</h3>
                        <span className={`dropdown-arrow ${dropdownStates[1]? 'active' : ''}`}>&#9660;</span>
                    </div>
                    {dropdownStates[1] && (
                        <div className="dropdown-content">
                            <ul>
                                {project.contributions.map((item) => (
                                    <li key={`contribution-${item}`}>
                                        {'- '}{item}<br />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="dropdown-section">
                    <div
                        className="dropdown-header"
                        onClick={() => toggleDropdown(2)}
                    >
                        <h3>Extra Info</h3>
                        <span className={`dropdown-arrow ${dropdownStates[2] ? 'active' : ''}`}>&#9660;</span>
                    </div>
                    {dropdownStates[2] && (
                        <div className="dropdown-content">
                            {project.link && project.link.site?.length > 0 && project.link.url?.length > 0 && project.link.site.some((site, index) => project.link.url[index]) && (
                            <>
                                <h3>Links:</h3>
                                <ul>
                                    {project.link.site.map((site, index) => {
                                        const url = project.link.url[index];
                                        const type = project.link.type?.[index]; 

                                        if (type === 'internal') {
                                            return (
                                                <li key={`link-${index}`}>
                                                    <Link to={url}><p>{site}</p></Link>
                                                </li>
                                                );
                                        } else {
                                            return (
                                                <li key={`link-${index}`}>
                                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                                        <p>{site}</p>
                                                    </a>
                                                </li>
                                            );
                                        }
                                        
                                    })}
                                </ul>
                            </>
                            )}
                            <h3>Role(s):</h3>
                            <ul>
                                {project.role.map((role, index) => (
                                    <span key={index}>
                                        {role}
                                        {index < project.role.length - 1 && ', '}
                                    </span>
                                ))}
                            </ul>
                            <h3>Team:</h3>
                            <ul>
                                {project.team.map((team, index) => (
                                    <span key={index}>
                                        {team}
                                        {index < project.team.length - 1 && ', '}
                                    </span>
                                ))}
                            </ul>
                            <h3>Technologies Used:</h3>
                            <ul>
                                {project.technologies.map((tech, index) => (
                                    <span key={index}>
                                        {tech}
                                        {index < project.technologies.length - 1 && ', '}
                                    </span>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {project.video && (
                <div className="dropdown-section">
                    <div
                        className="dropdown-header"
                        onClick={() => toggleDropdown(3)}
                    >
                        <h3>Video</h3>
                        <span className={`dropdown-arrow ${dropdownStates[3] ? 'active' : ''}`}>&#9660;</span>
                    </div>
                    {dropdownStates[3] && (
                        <div className="dropdown-content">
                            <ul>
                                {project.technologies.map((tech, index) => (
                                    <li key={index}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                )}
            </div>

            <div className="project-detail-container">
                <div className="project-detail-col-1">
                    <h1>{project.title}</h1>
                    <div className="image-gallery-container">
                        <button 
                            className={`scroll-btn prev ${currentImageIndex === 0 ? 'disabled' : ''}`}
                            onClick={() => scrollImages(-1)}
                            disabled={currentImageIndex === 0}>
                            &#10094;
                        </button>
                        <div className="gallery-wrapper" ref={galleryRef}>
                            {project.images.map((image, index) => (
                                <div key={index} className="gallery-item">
                                    <img src={image} alt={`Project Image ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                        <button 
                            className={`scroll-btn next ${currentImageIndex === project.images.length - 1 ? 'disabled' : ''}`}
                            onClick={() => scrollImages(1)}
                            disabled={currentImageIndex === project.images.length - 1}>
                            &#10095;
                        </button>
                    </div>
                    {project.reason && (<p>{project.reason}</p>)}
                    {project.link && project.link.site?.length > 0
                        && project.link.url?.length > 0 && project.link.site.some((site, index) => project.link.url[index]) && (
                            <>
                                <h3>Links:</h3>
                                <ul>
                                    {project.link.site.map((site, index) => {
                                        const url = project.link.url[index];
                                        const type = project.link.type?.[index]; 

                                        if (type === 'internal') {
                                            return (
                                                <li key={`link-${index}`}>
                                                    <Link to={url}><p>{site}</p></Link>
                                                </li>
                                                );
                                        } else {
                                            return (
                                                <li key={`link-${index}`}>
                                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                                        <p>{site}</p>
                                                    </a>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </>
                        )}
                    <h3>Role(s):</h3>
                    <ul>
                        {project.role.map((role, index) => (
                            <span key={index}>
                                {role}
                                {index < project.role.length - 1 && ', '}
                            </span>
                        ))}
                    </ul>
                    <h3>Team:</h3>
                    <ul>
                        {project.team.map((team, index) => (
                            <span key={index}>
                                {team}
                                {index < project.team.length - 1 && ', '}
                            </span>
                        ))}
                    </ul>
                    <h3>Technologies Used:</h3>
                    <ul>
                        {project.technologies.map((tech, index) => (
                            <span key={index}>
                                {tech}
                                {index < project.role.length - 1 && ', '}
                            </span>
                        ))}
                    </ul>
                </div>
                <div className="project-detail-col-2">
                    <h3>Description:</h3>
                    <p>{project.description}</p>

                    <h3>Contributions:</h3>
                    <ul>
                        {project.contributions.map((item) => (
                            <li key={`contribution-${item}`}>
                                {'- '}{item}<br />
                            </li>
                        ))}
                    </ul>

                    {project.video && (
                        <div className="media-video">
                            <h4>Project Video:</h4>
                            <video controls width="100%">
                                <source src={project.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetail;
