import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import darkMapStyles from "./dark_styles.json";
import lightMapStyles from "./light_styles.json";
import { useMapController } from "../../contexts/MapContext";
import { Fiction } from "../../types/Fiction";
import { Scene } from "../../types/Scene";
import FictionInfoSide from "./FictionInfoSide";
import pin from '../../../src/assets/pin.png';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const openInfoWindowRef = useRef<google.maps.InfoWindow | null>(null); 
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
          styles: darkMapStyles,
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
      
    
      // const svgMarker = {
      //   path: "M 0, 0 m -7.5, 0 a 7.5,7.5 0 1,0 15,0 a 7.5,7.5 0 1,0 -15,0",
      //   fillColor: "black",  
      //   fillOpacity: 0.7,  
      //   strokeWeight: 2,
      //   strokeColor: "white",  // Borde blanco
      //   scale: 1.1,
      //   anchor: new google.maps.Point(0, 7.5),
      // };

      const markerIcon = {
        url: pin,
        scaledSize: new google.maps.Size(46, 46), // ancho y alto en píxeles
      }
          
      const normalIcon = {
        url: pin,
        scaledSize: new google.maps.Size(39, 39), // Tamaño normal
      };

      let currentSelectedMarker: any = null;

      mapInstance.addListener("click", () => {
        if (currentSelectedMarker) {
          console.log(currentSelectedMarker)
          currentSelectedMarker.setIcon(normalIcon);
          currentSelectedMarker = null;
        }
      });

      fictionsSelected?.forEach((fiction: Fiction) => {
        if (fiction?.scenes?.length && fiction.scenes.length > 0) {
          fiction.scenes.forEach((scene: Scene) => {
            const marker = new google.maps.Marker({
              position: {
                lat: scene.location.latitude,
                lng: scene.location.longitude,
              },
              icon: markerIcon,
              title: scene.description,
              map: mapInstance,
            });
            markersRef.current.push(marker);
            // marker.addListener("mouseover", () => {
            //   if (openInfoWindowRef.current) {
            //     openInfoWindowRef.current.close();
            //     openInfoWindowRef.current = null;
            //   }

            //   const div = document.createElement("div");
            //   const infoWindow = new google.maps.InfoWindow();
            //   ReactDOM.render(
            //     <>
            //       <style>{`
            //                 .gm-style .gm-style-iw-c button {
            //                   top: 2px !important;
            //                   right: 2px !important;
            //                 }
            //               `}</style>
            //       <FictionInfoComponent fiction={fiction} scene={scene} />
            //     </>,
            //     div
            //   );

            //   infoWindow.setContent(div);
            //   openInfoWindowRef.current = infoWindow;
            //   infoWindow.open(mapInstance, marker);
            //   const markerPosition = marker.getPosition();
            //   if (markerPosition) {
            //     mapInstance.panTo(markerPosition);
            //   }

            // }); 
            
            marker.addListener("click", () => {
              if (openInfoWindowRef.current) {
                openInfoWindowRef.current.close();
                openInfoWindowRef.current = null;
              }


              const div = document.createElement("div");
              const infoWindow = new google.maps.InfoWindow();
              ReactDOM.render(
                <>
                 
                    <FictionInfoSide fiction={fiction} scene={scene} />
                </>,
                div
              );

              infoWindow.setContent(div);
              openInfoWindowRef.current = infoWindow;
              const markerPosition = marker.getPosition();
              if (markerPosition) {
                mapInstance.panTo(markerPosition);
              }

            });

          });
        }
      });
      
    }
  }, [mapInstance, fictionsSelected]);

  return(

    <div ref={mapRef} className="absolute w-full h-full z-1" />

  ); 
}
