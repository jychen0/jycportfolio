import React, { useState, useRef } from 'react';

const ContributionDetail = ({ contribution, index }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToIndex = (newIndex) => {
    if (!trackRef.current) return;

    const child = trackRef.current.children[newIndex];
    if (child) {
      trackRef.current.scrollTo({
        left: child.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = (direction) => {
    if (isScrolling) return;
    setIsScrolling(true);

    setCurrentIndex((prev) => {
      let newIndex = prev + direction;

      if (newIndex < 0) newIndex = 0;
      if (newIndex >= contribution.media.length) {
        newIndex = contribution.media.length - 1;
      }

      scrollToIndex(newIndex);

      setTimeout(() => setIsScrolling(false), 400);
      return newIndex;
    });
  };

  return (
    <div id={`contribution-${index}`} className="contribution-detail">
      <hr className="contribution-divider" />

      <div className="contribution-header-row">
        <h3 className="contribution-component-title">
          {contribution.title}
        </h3>
      </div>

      <div className="contribution-content">
        {contribution.media && contribution.media.length > 0 && (
          <div className="carousel">
            <button
              className={`carousel-btn prev ${currentIndex === 0 ? 'disabled' : ''}`}
              onClick={() => handleScroll(-1)}
              disabled={currentIndex === 0}
            >
              &#10094;
            </button>

            <div className="carousel-track" ref={trackRef}>
              {contribution.media.map((item, mediaIndex) => (
                <div key={mediaIndex} className="carousel-item">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={contribution.title || `media-${mediaIndex}`}
                    />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      muted
                      autoPlay={mediaIndex === currentIndex}
                      loop
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              className={`carousel-btn next ${
                currentIndex === contribution.media.length - 1 ? 'disabled' : ''
              }`}
              onClick={() => handleScroll(1)}
              disabled={currentIndex === contribution.media.length - 1}
            >
              &#10095;
            </button>
          </div>
        )}

        <div className="contribution-text">
          <p className="contribution-detail-text">
            {contribution.detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributionDetail;