import React from 'react';

interface CustomMarkerProps {
  text: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ text }) => {
  return (
    <div className="custom-marker">
      <div className="marker-content">
        <span className="marker-text">{text}</span>
      </div>
    </div>
  );
};

export default CustomMarker;
