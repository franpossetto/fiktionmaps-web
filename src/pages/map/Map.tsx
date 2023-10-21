import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import mapStyles from "./styles.json";
import FictionInfoComponent from "./FictionInfo";
import { useMapController } from "../../contexts/MapContext";
import { Fiction } from "../../types/Fiction";
import { Scene } from "../../types/Scene";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const openInfoWindowRef = useRef<google.maps.InfoWindow | null>(null); //reemplazable por un react dialog
  const {
    fictions,
    loading: ldg,
    fictionsSelected,
    city,
    setCity,
  } = useMapController();

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  useEffect(() => {
    loader.load().then((google) => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: city?.latitude || 0, 
            lng: city?.longitude || 0, 
          }, 
          zoom: 15,
          disableDefaultUI: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: mapStyles,
        });
        setMapInstance(map);
      }
    });
  }, [city]);

  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (mapInstance && fictionsSelected) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      fictionsSelected?.forEach((fiction: Fiction) => {
        if (fiction.scenes.length > 0) {
          fiction.scenes.forEach((scene: Scene) => {
            const marker = new google.maps.Marker({
              position: {
                lat: scene.location.latitude,
                lng: scene.location.longitude,
              },
              title: scene.description,
              map: mapInstance,
            });
            markersRef.current.push(marker);
            marker.addListener("click", () => {
              if (openInfoWindowRef.current) {
                openInfoWindowRef.current.close();
                openInfoWindowRef.current = null;
              }

              const div = document.createElement("div");
              const infoWindow = new google.maps.InfoWindow();
              ReactDOM.render(
                //reemplazable por un react dialog
                <>
                  <style>{`
                            .gm-style .gm-style-iw-c button {
                              top: 2px !important;
                              right: 2px !important;
                            }
                          `}</style>
                  <FictionInfoComponent fiction={fiction} scene={scene} />
                </>,
                div
              );

              infoWindow.setContent(div);
              openInfoWindowRef.current = infoWindow;
              infoWindow.open(mapInstance, marker);
            });
          });
        }
      });
    }
  }, [mapInstance, fictionsSelected]);

  return <div ref={mapRef} className="absolute w-full h-full z-1" />;
}
