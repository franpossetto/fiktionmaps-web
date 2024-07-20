import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.3.1";
import { CustomClusterRenderer } from './CustomClusterRenderer';
import { useEffect, useRef, useState } from "react";
import { useMapController } from "../../../contexts/MapContext";
import PlaceView from "../../../components/places/placeView/PlaceView";
import { Fiction } from "../../../types/Fiction";
import { Place } from "../../../types/Place";
import CustomMarker from "./CustomMarker";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const openInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { style } = useMapController();

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
    libraries: ["places", "marker"],
  });

  useEffect(() => {
    const loadMap = async () => {
      const google = await loader.load();

      if (mapRef.current && !mapInstance) {
        const map = new google.maps.Map(mapRef.current, {
          center: {
            lat: city?.latitude || 0,
            lng: city?.longitude || 0,
          },
          zoom: 15,
          minZoom: 9,
          mapId: '4504f8b37365c3d0',
          disableDefaultUI: false,
          mapTypeControl: false,
          zoomControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
          streetViewControl: false,
        });
        setMapInstance(map);
      } else if (mapInstance) {
        mapInstance.setCenter({
          lat: city?.latitude || 0,
          lng: city?.longitude || 0,
        });
      }
    };
  
    loadMap();
  }, [city]);
  
  useEffect(() => {
    const updateMapStyle = async () => {
      if (mapInstance) {
        const mapStyles =
          style === "dark"
            ? (await import("../../../assets/map/dark_styles.json")).default
            : (await import("../../../assets/map/light_style.json")).default;
        mapInstance.setOptions({ styles: mapStyles });
      }
    };
  
    updateMapStyle();
  }, [style, mapInstance]);
  useEffect(() => {
    if (mapInstance && fictionsSelected) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      const markers = [];
      fictionsSelected?.forEach((fiction: Fiction) => {
        if (fiction?.places?.length && fiction.places.length > 0) {
          fiction.places.forEach((place: Place) => {

            const markerContent = document.createElement("div");
            const root = createRoot(markerContent);

            root.render(
              <CustomMarker
                text={place.name}
              />
            );

            const marker = new google.maps.marker.AdvancedMarkerElement({
              map: mapInstance,
              position: {
                lat: place.location.latitude,
                lng: place.location.longitude,
              },
              content: markerContent,
              title: place.description,
            });

            const markerAdapter = {
              getPosition: () => new google.maps.LatLng(place.location.latitude, place.location.longitude),
              marker,
            };

            markersRef.current.push(marker);
            markers.push(markerAdapter);

            marker.addListener("click", () => {
              if (openInfoWindowRef.current) {
                openInfoWindowRef.current.close();
                openInfoWindowRef.current = null;
              }

              const div = document.createElement("div");
              const infoWindow = new google.maps.InfoWindow();
              const placeViewRoot = createRoot(div);
              placeViewRoot.render(<PlaceView fiction={fiction} place={place} />);

              infoWindow.setContent(div);
              openInfoWindowRef.current = infoWindow;
              mapInstance.panTo(markerAdapter.getPosition());
            });
          });
        }
      });
     

      new MarkerClusterer({ 
        map: mapInstance, 
        markers: markers.map(m => m.marker),
        renderer: new CustomClusterRenderer(),
      });
    
    }
    
  }, [mapInstance, fictionsSelected]);

  return <div ref={mapRef} className="absolute w-full h-full z-1" />;

}