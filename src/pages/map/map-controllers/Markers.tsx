import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { SquareCluster } from "../map-markers/SquareCluster";
import { SquareMarker } from "../map-markers/SquareMarker";
import PlaceView from "@/components/places/placeView/PlaceView";
import { RedCluster } from "../map-markers/RedCluster";
import { useMapController } from "@/contexts/MapContext";

interface MarkersProps {
    places: PlaceCoordinatesResponseDTO[];
  }
  
 export const Markers = ({ places }: MarkersProps) => {
    const map = useMap("map-view");
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);
    const [clickedPlaceId, setClickedPlaceId] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const {setMapZoom, mapZoom} = useMapController();
    
  
    useEffect(() => {
      if (!map) return;
      if (clusterer.current) {
        clusterer.current.clearMarkers();
        clusterer.current.setMap(null);
        clusterer.current = null;
      }
  
      const renderer = mapZoom
      ? new SquareCluster({ imageUrl: "https://github.com/shadcn.png", places })
      : new RedCluster();
      
      clusterer.current = new MarkerClusterer({
        map,
        renderer: renderer,
  
      });
  
      clusterer.current.addMarkers(Object.values(markers));
    }, [map, mapZoom]);
  
    useEffect(() => {
      if (!map) return;
      if (!clusterer.current) {
        const renderer = mapZoom
        ? new SquareCluster({ imageUrl: "https://github.com/shadcn.png", places })
        : new RedCluster();
        
        clusterer.current = new MarkerClusterer({
          map,
          renderer: renderer,
        });
      }
    }, [map, mapZoom]);
  
    useEffect(() => {
      clusterer.current?.clearMarkers();
      clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);
  
    const setMarkerRef = (marker: Marker | null, key: string) => {
      if (marker && markers[key]) return;
      if (!marker && !markers[key]) return;
      if (marker == null) {
        setMarkers({});
      }
  
      setMarkers((prev) => {
        if (marker) {
          return { ...prev, [key]: marker };
        } else {
          const newMarkers = { ...prev };
          delete newMarkers[key];
          return newMarkers;
        }
      });
    };
  
    const handleMarkerClick = (placeId: string) => {
      setClickedPlaceId(placeId);
      setIsOpen(true);
    };
  
    const handleClose = () => {
      setIsOpen(false);
      setClickedPlaceId(undefined);
    };
  
    return (
      <>
        {places && places.map((place: any) => (
          <AdvancedMarker
            key={place.placeId?.toString()}
            position={{
              lat: place?.latitude,
              lng: place?.longitude
            }}
            ref={(marker) => {
              setMarkerRef(marker, place.placeId?.toString())
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
  