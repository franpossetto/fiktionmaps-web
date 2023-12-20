import React, { useEffect, useRef, useState } from "react";
import { LocationDTO } from "../../types/dto/LocationDTO";
import { useSceneController } from "../../contexts/SceneContext";
import { Loader } from "@googlemaps/js-api-loader";
import lightMapStyles from "../../assets/map/actual_styles.json";
import { MapsProvider } from "../../types/providers/MapsProvider";

const PlaceDetails = () => {
  const { place, setPlace: setPlc } = useSceneController();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  useEffect(() => {
    const defaultLocation = {
      formatted_address: "1575 York Ave, New York, NY 10028, USA",
      latitude: 40.7744823,
      longitude: -73.9484961,
      place_id: "ChIJp6aZ8LlYwokRoXWttn1Qz9c",
      provider: MapsProvider.GOOGLE_MAPS,
      city: "New York",
      country: "United States",
    };
    setPlc({ place: defaultLocation });
  }, []);

  useEffect(() => {
    loader.load().then((google) => {
      if (mapRef.current && !map) {
        const initialCenter = { lat: 0, lng: 0 };
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
  }, [map]);

  useEffect(() => {
    if (place && map && marker) {
      const newCenter = {
        lat: place.place.latitude,
        lng: place.place.longitude,
      };
      marker.setPosition(newCenter);
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
