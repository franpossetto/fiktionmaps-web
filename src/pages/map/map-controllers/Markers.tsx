import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { SquareMarker } from "../map-markers/SquareMarker";
import PlaceView from "../../../components/places/placeView/PlaceView";
import { Marker, MarkerClusterer } from "@googlemaps/markerclusterer";
import { CustomClusterRenderer } from "../map/CustomClusterRenderer";
import { useEffect, useRef, useState } from "react";

export const Markers = ({ points }: any) => {
  const map = useMap("map-view");
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  const [clickedPlaceId, setClickedPlaceId] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!map) return;
    if (clusterer.current) {
      clusterer.current.clearMarkers();
      clusterer.current.setMap(null);
      clusterer.current = null;
    }
  
    console.log("Creating new clusterer", points);
    clusterer.current = new MarkerClusterer({
      map,
      renderer: CustomClusterRenderer({ imageUrls: ["https://github.com/shadcn.png", "https://i.pravatar.cc/150?u=a04258114e29026302d"] }),
    });
  
    clusterer.current.addMarkers(Object.values(markers));
  }, [map]);
  

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        renderer: CustomClusterRenderer({ imageUrls: ["https://github.com/shadcn.png", "https://i.pravatar.cc/150?u=a04258114e29026302d"]  }),
      });
    }
  }, [map]);

  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string, screenshot: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;
    if (marker == null) {
      setMarkers({});
    }
    
    (marker as any).screenshot = screenshot;

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
      {points && points.map((place: any) => (
        <AdvancedMarker
          key={place.placeId?.toString()}
          position={{
            lat: place?.latitude,
            lng: place?.longitude
          }}
          ref={(marker) => {
            setMarkerRef(marker, place.placeId?.toString(), place.screenshot)
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
