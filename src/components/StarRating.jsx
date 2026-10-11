import React, { useState } from 'react';

/**
 * Machine Coding Pattern: Star Rating Component
 * Key features:
 * - Controlled / Uncontrolled support with default rating
 * - Interactive hover states (previewing selection)
 * - Accessibility with keyboard support (Enter/Space)
 * - Dynamic star count
 */
export default function StarRating({ totalStars = 5, onRate = () => {} }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    setRating(index);
    onRate(index);
  };

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(index);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={starsContainerStyle}>
        {Array.from({ length: totalStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= (hoverRating || rating);

          return (
            <span
              key={starValue}
              role="button"
              tabIndex={0}
              aria-label={`${starValue} out of ${totalStars} stars`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              style={{
                ...starStyle,
                color: isFilled ? '#fbbf24' : '#d1d5db',
                transform: starValue <= hoverRating ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              ★
            </span>
          );
        })}
      </div>
      <div style={labelStyle}>
        {rating > 0 ? (
          <span>
            You selected: <strong>{rating} / {totalStars}</strong>
          </span>
        ) : (
          <span>Please select a rating</span>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  borderRadius: '12px',
  background: '#ffffff',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  gap: '12px',
};

const starsContainerStyle = {
  display: 'flex',
  gap: '8px',
  cursor: 'pointer',
};

const starStyle = {
  fontSize: '36px',
  userSelect: 'none',
  transition: 'transform 0.15s ease, color 0.15s ease',
  outline: 'none',
  lineHeight: 1,
};

const labelStyle = {
  fontSize: '15px',
  color: '#4b5563',
  fontFamily: 'system-ui, sans-serif',
};
