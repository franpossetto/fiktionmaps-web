import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

export const SearchMap = () => {
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
          zoom: 13,
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
                  color: "#242f3e",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#746855",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#242f3e",
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "geometry.fill",
              stylers: [
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "administrative.country",
              elementType: "labels.icon",
              stylers: [
                {
                  color: "#ff0000",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563",
                },
              ],
            },
            {
              featureType: "administrative.neighborhood",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563",
                },
              ],
            },
            {
              featureType: "poi.business",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [
                {
                  color: "#263c3f",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#6b9a76",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#38414e",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#212a37",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [
                {
                  visibility: "off",
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
                  color: "#9ca5b3",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#746855",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#1f2835",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#f3d19c",
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
              elementType: "geometry",
              stylers: [
                {
                  color: "#2f3948",
                },
              ],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#d59563",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                {
                  color: "#17263c",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#000000",
                },
                {
                  visibility: "on",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text",
              stylers: [
                {
                  visibility: "off",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#515c6d",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#17263c",
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
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "60px",
          backgroundColor: "transparent",
          zIndex: 2,
        }}
      >
        <input
          style={{
            width: "400px",
            height: "45px",
            border: "1px solid #222121",
            borderRadius: "5px 5px 0px 0px",
            fontSize: "16px",
            marginTop: "30px",
            marginLeft: "30px",
            flexGrow: 1,
            color: "white",
            backgroundColor: "black",
          }}
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <div
          style={{
            width: "400px",
            position: "absolute",
            left: 0,
            right: 0,
            height: "100px",
            marginLeft: "30px",
            backgroundColor: "rgb(18 18 21)",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      </div>
    </div>
  );
};
