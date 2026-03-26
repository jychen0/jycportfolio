import React from 'react';

const ContributionDetail = ({ contribution, index }) => {
  return (
    <div id={`contribution-${index}`} className="contribution-detail">
      <hr className="contribution-divider" />
      <div className="contribution-header-row">
        <h3 className="contribution-component-title">{contribution.title}</h3>
      </div>
      <div className="contribution-content">
        {contribution.media && contribution.media.length > 0 && (
          <div className="contribution-media">
            {contribution.media.map((item, mediaIndex) => (
              <div key={mediaIndex} className="contribution-media-item">
                {item.type === 'image' ? (
                  <img src={item.src} alt={contribution.title || `media-${mediaIndex}`} />
                ) : (
                  <video src={item.src} controls muted />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="contribution-text">
          <p className="contribution-detail-text">{contribution.detail}</p>
        </div>
      </div>
    </div>
  );
};

export default ContributionDetail;
