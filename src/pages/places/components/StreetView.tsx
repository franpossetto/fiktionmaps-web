import React, { useEffect, useRef } from 'react';

const StreetView = () => {
    const streetViewRef = useRef<HTMLDivElement>(null);
    const url = "https://www.google.com/maps/place/Danfe+Nails/@40.7745037,-73.948233,3a,47.2y,250.49h,89.81t/data=!3m6!1e1!3m4!1sHZITFWdSaQ9G6u18o-mglQ!2e0!7i16384!8i8192!4m7!3m6!1s0x89c258b9efc9919d:0xd553600a9747b6c4!8m2!3d40.7742384!4d-73.9486798!10e5!16s%2Fg%2F1tcwmgpq?entry=ttu";

    useEffect(() => {
      const objData = extractDataFromURL(url)
      console.log(objData)
      if (streetViewRef.current && objData != null) {
        const location = { lat: objData?.latitude, lng: objData?.longitude }; 
        const panorama = new google.maps.StreetViewPanorama(
          streetViewRef.current, {
            position: location,
            pov: { heading: objData.heading-90, pitch: objData.pitch-90 },
            zoom: 1,
            disableDefaultUI: true,
            enableCloseButton: false,
            showRoadLabels: false
          }
        );
      }
    }, []);
  
    const handleStreetViewDoubleClick = () => {
      window.open(url);
    };

    const extractDataFromURL = (url:string) => {
      const parts = url.split('@');
      if (parts.length < 2) return null; 
    
      const latLongPart = parts[1].split(',');
      if (latLongPart.length < 3) return null; 
    
      const latitude = parseFloat(latLongPart[0]);
      const longitude = parseFloat(latLongPart[1]);
    
      const headingPitchPart = latLongPart.slice(2).join(',').split(/h|t/);
      if (headingPitchPart.length < 3) return null;
    
      const heading = parseFloat(headingPitchPart[0].replace(/[^\d.]/g, ''));
      const pitch = parseFloat(headingPitchPart[1].replace(/[^\d.]/g, ''));
    
      return { latitude, longitude, heading, pitch };
    };
    
    return (
      <div
        ref={streetViewRef}
        onDoubleClick={handleStreetViewDoubleClick} 
        style={{ width: '100%' }}
        className="h-96"
      ></div>
    );
};

export default StreetView;
