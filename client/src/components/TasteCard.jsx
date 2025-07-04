import React from 'react';

const TasteCard = ({ title, description, image, tags }) => {
  return (
    <div className="taste-card">
      {image && (
        <div className="taste-card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="taste-card-content">
        <h3 className="taste-card-title">{title}</h3>
        <p className="taste-card-description">{description}</p>
        {tags && tags.length > 0 && (
          <div className="taste-card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="taste-card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasteCard;
