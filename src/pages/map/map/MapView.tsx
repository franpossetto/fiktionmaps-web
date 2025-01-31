"use client";

import { useEffect, useRef, useState } from "react";
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

import { useMapController } from "../../../contexts/MapContext";
import { STYLE_DARK, DARK_MAP_ID, LIGHT_MAP_ID, NYC_MAP_BOUNDS, FICTION_EMPTY } from "../../../contants";
import CustomMarker from "./CustomMarker";
import { createSearchParametersOverride, MapBounds } from "../../../types/dto/MapBoundsDTO";
import PlaceView from "../../../components/places/placeView/PlaceView";
import { CustomClusterRenderer } from "./CustomClusterRenderer";
import { useFetchPlaces } from "../../../hooks/places/useFetchPlaces/useFetchPlaces";

interface MapProps {
  onLoad?: () => void;
}

export default function MapView({ onLoad }: MapProps) {

  const { selectedFiction, setSelectedFiction, city, style, placeSearchParameters, setPlaceSearchParameters } = useMapController();
  const [localBounds, setLocalBounds] = useState<MapBounds>(NYC_MAP_BOUNDS)
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

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
  console.log("ejecucion")

  }, [city])

  useEffect(() => {

    const searchParametersOverride = createSearchParametersOverride(
      localBounds, selectedFiction?.id || FICTION_EMPTY
    );

    setPlaceSearchParameters(searchParametersOverride);

  }, [selectedFiction])

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

          {isMapLoaded && <Markers points={places} />}

          <MapViewSettings city={city} setLocalBounds={setLocalBounds} />
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


const Markers = ({ points }: any) => {
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

    clusterer.current = new MarkerClusterer({
      map,
      renderer: new CustomClusterRenderer(),
    });

    clusterer.current.addMarkers(Object.values(markers));
  }, [map]);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        renderer: new CustomClusterRenderer(),
      });
    }
  }, [map]);

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
      {points && points.map((place: any) => (
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
          <CustomMarker text={place.name} />
        </AdvancedMarker>
      ))}
      {clickedPlaceId && (
        <PlaceView id={clickedPlaceId} open={isOpen} setOpen={handleClose} />
      )}
    </>
  );
};
