import ReactDOM from "react-dom";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";
import { useMapController } from "../../../contexts/MapContext";
import PlaceView from "../../../components/places/placeView/PlaceView";
import { Fiction } from "../../../types/Fiction";
import { Place } from "../../../types/Place";
import { IMapScreen } from "../../../types/IMapScreen";
import pin from "../../../../src/assets/pin.png";
import { useMapStyle } from "../../../contexts/MapStyleContext";

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

  const { style } = useMapStyle();

  useEffect(() => {
    const loadMap = async () => { // Define una función asincrónica dentro de useEffect
      const google = await loader.load(); // Espera a que el Loader cargue la API de Google Maps
  
      if (mapRef.current) {
        // Utiliza import() para cargar dinámicamente el archivo de estilos
        const mapStyles = style === 'dark' 
          ? (await import("../../../assets/map/dark_styles.json")).default 
          : (await import("../../../assets/map/light_style.json")).default;
  
        // Configura el mapa con los estilos cargados
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
          styles: mapStyles, // Aplica los estilos cargados
          gestureHandling: "greedy",
          streetViewControl: false,
        });
  
        setMapInstance(map);
      }
    };
  
    loadMap(); // Llama a la función asincrónica
  }, [city, style]); // Asegúrate de incluir 'style' en las dependencias de useEffect
  

  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (mapInstance && fictionsSelected) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      const markerIcon = {
        url: pin,
        scaledSize: new google.maps.Size(46, 46),
      };

      const normalIcon = {
        url: pin,
        scaledSize: new google.maps.Size(39, 39),
      };

      let currentSelectedMarker: any = null;

      mapInstance.addListener("click", () => {
        if (currentSelectedMarker) {
          currentSelectedMarker.setIcon(normalIcon);
          currentSelectedMarker = null;
        }
      });

      mapInstance.addListener("zoom_changed", () => {
        const newZoomLevel = mapInstance.getZoom();
        const bounds = mapInstance.getBounds();
        const screen: IMapScreen = {
          latLeft: bounds?.getNorthEast().lat(),
          latRight: bounds?.getSouthWest().lat(),
          lngTop: bounds?.getNorthEast().lng(),
          lngBottom: bounds?.getSouthWest().lng(),
        };
        // console.log(screen);
      });

      fictionsSelected?.forEach((fiction: Fiction) => {
        if (fiction?.places?.length && fiction.places.length > 0) {
          fiction.places.forEach((place: Place) => {
            const marker = new google.maps.Marker({
              position: {
                lat: place.location.latitude,
                lng: place.location.longitude,
              },
              icon: markerIcon,
              title: place.description,
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
                <>
                  <PlaceView fiction={fiction} place={place} />
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

  return <div ref={mapRef} className="absolute w-full h-full z-1" />;
}
