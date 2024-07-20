import React from 'react';

const CustomMarker = ({ text }) => {
  return (
    <div 
      className="custom-marker" 
    >
      <div className="marker-content">
        <span className="marker-text">{text}</span>
      </div>
    </div>
  );
};

export default CustomMarker;