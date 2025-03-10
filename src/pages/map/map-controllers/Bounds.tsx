import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { useMapController } from "@/contexts/MapContext";

export const Bounds = ({ city, setLocalBounds }: any) => {

  const { setMapBounds, renderMap } = useMapController();
  const map = useMap('map-view');

  useEffect(() => {
    map?.setCenter({ lat: city?.latitude, lng: city?.longitude })
    const bounds = map?.getBounds();
    if (bounds) {
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      const newBounds = {
        topRight: { lat: northEast.lat(), lng: northEast.lng() },
        bottomLeft: { lat: southWest.lat(), lng: southWest.lng() },
      };
      setLocalBounds(newBounds);
    }

  }, [city])

  useEffect(() => {
    if (!map || !renderMap) return;

    const updateBounds = () => {
      const bounds = map.getBounds();
      if (!bounds) return;

      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      const newBounds = {
        topRight: { lat: northEast.lat(), lng: northEast.lng() },
        bottomLeft: { lat: southWest.lat(), lng: southWest.lng() },
      };
      setMapBounds(newBounds);
    };

    updateBounds();
    map.addListener("bounds_changed", updateBounds);

    return () => google.maps.event.clearListeners(map, "bounds_changed");
  }, [map, renderMap]);

  return null;
};