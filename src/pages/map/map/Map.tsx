import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "https://cdn.skypack.dev/@googlemaps/markerclusterer@2.3.1";
import { CustomClusterRenderer } from "./CustomClusterRenderer";
import { useEffect, useRef, useState } from "react";
import { useMapController } from "../../../contexts/MapContext";
import PlaceView from "../../../components/places/placeView/PlaceView";
import { Fiction } from "../../../types/Fiction";
import { Place } from "../../../types/Place";
import CustomMarker from "./CustomMarker";

// Define una interfaz para las propiedades que el componente Map aceptará
interface MapProps {
  onLoad?: () => void; // Prop onLoad opcional
}

export default function Map({ onLoad }: MapProps) {
  // Agregar MapProps como tipo de las props
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const openInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { style } = useMapController();
  const clusterRef = useRef<MarkerClusterer | null>(null); // Referencia al clúster
  const { setMapBounds } = useMapController();

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

  const createMap = async (
    mapId: string,
    center: google.maps.LatLngLiteral,
    zoom: number
  ) => {
    const google = await loader.load();
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current as HTMLElement, {
        center: center,
        zoom: zoom,
        minZoom: 10,
        mapId: mapId,
        disableDefaultUI: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        streetViewControl: false,
      });
      setMapInstance(map);

      // Llamar a onLoad cuando el mapa esté listo
      map.addListener("tilesloaded", () => {
        console.log("Map tiles loaded"); // Log para confirmar cuándo se cargan los tiles
        if (onLoad) {
          onLoad(); // Llamar onLoad después de que se carguen los tiles del mapa
        }
      });

      return map;
    }
    return null;
  };

  const initializeMap = async () => {
    const darkMapId = "c27c253257b98758";
    const lightMapId = "a1d2d30389460d42";
    const mapId = style === "dark" ? darkMapId : lightMapId;

    let center = { lat: city?.latitude || 0, lng: city?.longitude || 0 };
    let zoom = 15;

    console.log("Map ID:", mapId);

    if (mapInstance) {
      center = mapInstance.getCenter()?.toJSON() || center;
      zoom = mapInstance.getZoom() || zoom;

      google.maps.event.clearInstanceListeners(mapInstance);
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      if (clusterRef.current) {
        clusterRef.current.clearMarkers();
      }
    }

    createMap(mapId, center, zoom);
  };

  const updateMapCenter = () => {
    if (mapInstance && city) {
      const newCenter = { lat: city.latitude, lng: city.longitude };
      mapInstance.setCenter(newCenter);
    }
  };

  const updateMapBounds = () => {
    if (mapInstance) {
      const bounds = mapInstance.getBounds();
      if (bounds) {
        const northEast = bounds.getNorthEast();
        const southWest = bounds.getSouthWest();

        // Actualizar las coordenadas en el contexto
        setMapBounds({
          topRight: { lat: northEast.lat(), lng: northEast.lng() },
          bottomLeft: { lat: southWest.lat(), lng: southWest.lng() },
        });
      }
    }
  };

  useEffect(() => {
    if (mapInstance) {
      // Escuchar el evento "idle" para actualizar las coordenadas cuando el usuario se mueve o hace zoom
      google.maps.event.addListener(mapInstance, "idle", updateMapBounds);

      return () => {
        google.maps.event.clearListeners(mapInstance, "idle");
      };
    }
  }, [mapInstance]);

  useEffect(() => {
    initializeMap();
  }, [style]);

  useEffect(() => {
    updateMapCenter();
  }, [city]);

  useEffect(() => {
    if (mapInstance && fictionsSelected) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      if (clusterRef.current) {
        clusterRef.current.clearMarkers();
      }

      const markers =
        fictionsSelected?.flatMap((fiction: Fiction) => {
          return fiction.places?.map((place: Place) => {
            const markerContent = document.createElement("div");
            const root = createRoot(markerContent);
            root.render(<CustomMarker text={place.name} />);

            const marker = new google.maps.marker.AdvancedMarkerElement({
              map: mapInstance,
              position: {
                lat: place.location.latitude,
                lng: place.location.longitude,
              },
              content: markerContent,
              title: place.description,
            });

            markersRef.current.push(marker);
            marker.addListener("click", () => {
              if (openInfoWindowRef.current) {
                openInfoWindowRef.current.close();
                openInfoWindowRef.current = null;
              }

              const div = document.createElement("div");
              const infoWindow = new google.maps.InfoWindow();
              const placeViewRoot = createRoot(div);
              placeViewRoot.render(
                <PlaceView fiction={fiction} place={place} />
              );

              infoWindow.setContent(div);
              openInfoWindowRef.current = infoWindow;
              mapInstance.panTo(markerAdapter.getPosition());
            });

            return marker;
          });
        }) || [];

      clusterRef.current = new MarkerClusterer({
        map: mapInstance,
        markers: markers,
        renderer: new CustomClusterRenderer(),
      });
    }
  }, [mapInstance, fictionsSelected]);

  return <div ref={mapRef} className="absolute w-full h-full z-1" />;
}
