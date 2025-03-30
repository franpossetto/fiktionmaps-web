import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { SquareMarker } from "../map-markers/SquareMarker";
import PlaceView from "../../../components/places/placeView/PlaceView";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { CustomClusterRenderer } from "../map/CustomClusterRenderer";
import { useEffect, useRef, useState } from "react";

export const Markers = ({ points, onClusterClick }: any) => {
  const map = useMap("map-view");
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [clickedPlaceId, setClickedPlaceId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAnimate, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        onClusterClick: (event, cluster, map) => {
          const clusterCenter = cluster.position;
          if (clusterCenter) {
            map.panTo(clusterCenter);
            // Ejemplo de zoom animado
            let currentZoom = map.getZoom() || 13;
            const targetZoom = Math.min(currentZoom + 4.5, 19);
            const animateZoom = (zoom: number) => {
              if (zoom >= targetZoom) return;
              map.setZoom(zoom + 1);
              setTimeout(() => animateZoom(zoom + 1), 200);
            };
            animateZoom(currentZoom);
          }
        },
        renderer: CustomClusterRenderer({
          imageUrls: [
            "https://github.com/shadcn.png",
            "https://i.pravatar.cc/150?u=a04258114e29026302d",
          ],
          shouldAnimate,
        }),
      });
  
      clusterer.current.addListener("clusterclick", (cluster: any) => {
        onClusterClick(cluster);
      });
    }
  
    // Actualizamos los marcadores cada vez que cambien
    clusterer.current.clearMarkers();
    clusterer.current.addMarkers(Object.values(markers));
  }, [map, markers, onClusterClick, shouldAnimate]);
  

  const setMarkerRef = (marker: Marker | null, key: string, screenshot: string) => {
    // Si marker existe y ya se registró ese marker, no hacemos nada.
    if (marker && markers[key]) return;
    
    // Si marker es null y no existe un marker registrado con esa key, no hacemos nada.
    if (!marker && !markers[key]) return;
  
    // Si marker es null, eliminamos el marker existente y salimos de la función.
    if (marker == null) {
      setMarkers((prev) => {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      });
      return; // Salimos para evitar seguir con marker null.
    }
    
    // Aquí marker es seguro (no es null), asignamos la propiedad screenshot.
    (marker as any).screenshot = screenshot;
  
    // Actualizamos el estado para incluir el nuevo marker.
    setMarkers((prev) => ({
      ...prev,
      [key]: marker,
    }));
  };
  

  const handleMarkerClick = (placeId: string) => {
    setClickedPlaceId(placeId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setClickedPlaceId(undefined);
  };

  // Usamos un objeto para almacenar las referencias de los marcadores
  const markerRefs = useRef<{ [key: string]: Marker | null }>({});

  return (
    <>
      {points && points.map((place: any) => (
        <AdvancedMarker
          key={place.placeId?.toString()}
          position={{
            lat: place?.latitude,
            lng: place?.longitude,
          }}
          ref={(marker) => {
            markerRefs.current[place.placeId?.toString()] = marker;
            setMarkerRef(marker, place.placeId?.toString(), place.screenshot);
          }}
          onClick={() => handleMarkerClick(place.placeId)}
        >
          <SquareMarker place={place} />
        </AdvancedMarker>
      ))}
      {clickedPlaceId && (
        <PlaceView id={clickedPlaceId} open={isOpen} setOpen={handleClose} />
      )}
    </>
  );
};