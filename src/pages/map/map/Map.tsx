import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { createRoot } from "react-dom/client";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { CustomClusterRenderer } from "./CustomClusterRenderer";
import { useEffect, useRef, useState } from "react";
import { useMapController } from "../../../contexts/MapContext";
import PlaceView from "../../../components/places/placeView/PlaceView";
import CustomMarker from "./CustomMarker";

interface MapProps {
  onLoad?: () => void;
}

export default function Map({ onLoad }: MapProps) {
  console.log("Map")

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const openInfoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const { style } = useMapController();
  const clusterRef = useRef<MarkerClusterer | null>(null); // Referencia al clúster
  const { mapBounds, setMapBounds } = useMapController();

  const {
    loading: ldg,
    fictionsSelected,
    city,
    places,
  } = useMapController();

  // useEffect(()=>{
  //   updateMapBounds()
  // },[])

    useEffect(()=>{
      updateMapBounds()
    },[city])

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
        minZoom: 6,
        maxZoom:19,
        mapId: mapId,
        disableDefaultUI: false,
        mapTypeControl: false,
        zoomControl: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        streetViewControl: false,
      });
      setMapInstance(map);

      map.addListener("tilesloaded", () => {
        
        if (onLoad) {
          onLoad();
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
    updateMapBounds()
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
  
        const newBounds = {
          topRight: { lat: northEast.lat(), lng: northEast.lng() },
          bottomLeft: { lat: southWest.lat(), lng: southWest.lng() },
        };
  
        console.log("Updated mapBounds:", newBounds); // Log para verificar límites actualizados
        setMapBounds(newBounds);
      }
    }
  };

  const markerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    if (mapInstance) {
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

      const markers = places?.map((place,index) => {
        const markerContent = document.createElement("div");
        const root = createRoot(markerContent);
        root.render(
          <motion.div
            variants={markerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.05 }} // Agrega un pequeño delay para cada marcador
          >
            <CustomMarker text={`Place ID: ${place.placeId}`} />
          </motion.div>
        );
      
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: {
            lat: place.latitude,
            lng: place.longitude,
          },
          content: markerContent,
          title: `Place ID: ${place.placeId}`, // Ajusta el título si tienes descripciones
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
          
          placeViewRoot.render(<PlaceView id={place.placeId} />); // Usa PlaceView para mostrar detalles del lugar
      
          infoWindow.setContent(div);
          openInfoWindowRef.current = infoWindow;
          mapInstance.panTo(marker.getPosition());
        });
      
        return marker;
      }) || [];
  
      clusterRef.current = new MarkerClusterer({
        map: mapInstance,
        markers: markers,
        renderer: new CustomClusterRenderer(),
      });

      
    }
  }, [mapInstance, fictionsSelected, places]);

  return <div ref={mapRef} className="absolute w-full h-full z-1" />;
}
