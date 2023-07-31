import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const manhattanCoordinates = { lat: 40.7831, lng: -73.9712 };

  const markersData = [
    { position: { lat: 40.7831, lng: -73.9643 }, title: "Marker 1" },
    { position: { lat: 40.7794, lng: -73.9631 }, title: "Marker 2" },
    { position: { lat: 40.7681, lng: -73.9558 }, title: "Marker 3" },
    { position: { lat: 40.7597, lng: -73.9727 }, title: "Marker 4" },
  ];

  useEffect(() => {
    loader.load().then((google) => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: manhattanCoordinates,
          zoom: 15,
          disableDefaultUI: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#8ec3b9",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1a3646",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#4b6878",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#64779e",
                },
              ],
            },
            {
              featureType: "administrative.province",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#4b6878",
                },
              ],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#334e87",
                },
              ],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [
                {
                  color: "#023e58",
                },
              ],
            },
            {
              featureType: "poi",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#283d6a",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#6f9ba5",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#023e58",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#3C7680",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#304a7d",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#98a5be",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#2c6675",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#255763",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#b0d5ce",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#023e58",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#98a5be",
                },
              ],
            },
            {
              featureType: "transit",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#1d2c4d",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#283d6a",
                },
              ],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [
                {
                  color: "#3a4762",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#0e1626",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#4e6d70",
                },
              ],
            },
          ],
        });
        setMapInstance(map);
      }
    });
  }, []);

  useEffect(() => {
    if (mapInstance) {
      markersData.forEach((markerData) => {
        new google.maps.Marker({
          position: markerData.position,
          title: markerData.title,
          map: mapInstance,
        });
      });
    }
  }, [mapInstance]);

  return (
    <div className="absolute h-[100%] w-[100%]">
      {/* <div className="absolute ml-0 mr-0 h-16 bg-transparent z-10">
        <input
          className="w-80 h-12 border-solid rounded outline-none ring-4 ring-blue-800 ring-opacity-40 font-sm flex-grow bg-black font-white mt-8 ml-8"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="absolute w-80 mr-0 ml-8 h-28 bg-black"></div>
      </div> */}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};
