import React, { useEffect, useRef, useState } from "react";
import { usePlaceController } from "../../../../contexts/PlaceContext";
import { Loader } from "@googlemaps/js-api-loader";
import DefaultPlace from "./DefaultPlace";
import { useMapController } from "../../../../contexts/MapContext";

const PlaceDetails = () => {
  const { place, setPlace: setPlc } = usePlaceController();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [initialCenter, setInitialCenter] = useState<any>();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const { style } = useMapController();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setInitialCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      setInitialCenter({
        lat: DefaultPlace.location.latitude,
        lng: DefaultPlace.location.longitude,
      });
    }
  }, []);

  useEffect(() => {
    console.log(initialCenter);
    loader.load().then((google) => {
      if (mapRef.current && !map && initialCenter) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: initialCenter,
          zoom: 11,
          disableDefaultUI: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          gestureHandling: "greedy",
        });
        setMap(mapInstance);

        const markerInstance = new google.maps.Marker({
          position: initialCenter,
          map: mapInstance,
        });
        setMarker(markerInstance);
      }
    });
  }, [place, initialCenter]);

  useEffect(() => {
    const updateMapStyle = async () => {
      if (map) { 
        const mapStyles = style === 'dark' 
          ? (await import("../../../../assets/map/dark_styles.json")).default 
          : (await import("../../../../assets/map/light_style.json")).default;
        
          map.setOptions({styles: mapStyles});
      }
    };  
    updateMapStyle();
    if (place && map) {
      const newCenter = {
        lat: place?.location.latitude,
        lng: place?.location.longitude,
      };
      marker?.setPosition(newCenter);
      map.setCenter(newCenter);
    }
  }, [place, map, marker]);

  return (
    <div className="h-60 mt-5">
      <div ref={mapRef} className="h-full w-full rounded-md mb-5" />
    </div>
  );
};

export default PlaceDetails;
