"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps'

import { useMapController } from "../../../contexts/MapContext";
import { STYLE_DARK, DARK_MAP_ID, LIGHT_MAP_ID, NYC_MAP_BOUNDS, FICTION_EMPTY } from "../../../contants";
import { createSearchParametersOverride, MapBounds } from "../../../types/dto/MapBoundsDTO";
import { useFetchPlaces } from "../../../hooks/places/useFetchPlaces/useFetchPlaces";
import { Markers } from "../map-controllers/Markers";

interface MapProps {
  onLoad?: () => void;
}

export default function MapView({ onLoad }: MapProps) {

  const { selectedFiction, setSelectedFiction, city, style, placeSearchParameters, setPlaceSearchParameters } = useMapController();
  const [localBounds, setLocalBounds] = useState<MapBounds>(NYC_MAP_BOUNDS)
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const map = useMap('map-view');
  const { data: places } = useFetchPlaces(placeSearchParameters);

  const mapId = style === STYLE_DARK ? DARK_MAP_ID : LIGHT_MAP_ID;

  const center: google.maps.LatLngLiteral = {
    lat: city?.latitude ?? 0,
    lng: city?.longitude ?? 0,
  };

  useEffect(() => {

    const searchParametersOverride = createSearchParametersOverride(
      localBounds, FICTION_EMPTY
    );

    setSelectedFiction(undefined);
    setPlaceSearchParameters(searchParametersOverride);
  }, [city])

  useEffect(() => {

    const searchParametersOverride = createSearchParametersOverride(
      localBounds, selectedFiction?.id || FICTION_EMPTY
    );

    setPlaceSearchParameters(searchParametersOverride);

  }, [selectedFiction])

  const handleClusterClick = (cluster: any) => {
    if (!map) return;

    const markers = cluster.getMarkers();
    if (markers.length === 0) return;

    const clusterPosition = markers[0].getPosition();

    if (clusterPosition) {
      let zoomLevel = map.getZoom() || 10;
      const targetZoom = Math.min(zoomLevel + 2, 19); // Limita el zoom máximo a 19

      const animateZoom = (currentZoom: number) => {
        if (currentZoom >= targetZoom) return;
        map.setZoom(currentZoom + 1);
        setTimeout(() => animateZoom(currentZoom + 1), 200); // Suaviza la animación
      };

      map.panTo(clusterPosition);
      animateZoom(zoomLevel);
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GMAPS_API_KEY}>
      <div className="absolute w-full h-full z-1">
        <Map
          id='map-view'
          defaultCenter={center}
          defaultZoom={13}
          minZoom={6}
          maxZoom={19}
          mapId={mapId}
          disableDefaultUI={true}
          mapTypeControl={false}
          zoomControl={false}
          fullscreenControl={false}
          gestureHandling={"greedy"}
          streetViewControl={false}
          scrollwheel={true}
          onTilesLoaded={() => {
            setIsMapLoaded(true);
            onLoad?.();
          }}
        >

          {isMapLoaded && places && <Markers points={places} />}

          <MapViewSettings city={city} setLocalBounds={setLocalBounds} onClusterClick={handleClusterClick} />
        </Map>
      </div>
    </APIProvider>
  );
}

const MapViewSettings = ({ city, setLocalBounds }: any) => {
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
