import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MapBounds, useMapController } from "@/contexts/MapContext";
import { useFetchPlaces } from "@/hooks/places/useFetchPlaces/useFetchPlaces";
import { DARK_MAP_ID, FICTION_EMPTY, LIGHT_MAP_ID, NYC_MAP_BOUNDS, STYLE_DARK } from "@/contants";
import { createSearchParametersOverride } from "@/types/dto/MapBoundsDTO";
import { Markers } from "../map-controllers/Markers";
import { Bounds } from "../map-controllers/Bounds";

interface MapProps {
  onLoad?: () => void;
}

export default function MapView({ onLoad }: MapProps) {
  const { selectedFiction, setSelectedFiction, city, style, placeSearchParameters, setPlaceSearchParameters, setMapZoom, mapZoom } = useMapController();
  const [localBounds, setLocalBounds] = useState<MapBounds>(NYC_MAP_BOUNDS);
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
  }, [city]);

  useEffect(() => {
    if (!placeSearchParameters) return;
    const updatedParameters = {
      ...placeSearchParameters,
      fictionId: selectedFiction?.id || FICTION_EMPTY
    };

    setPlaceSearchParameters(updatedParameters);
  }, [selectedFiction]);

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
          {isMapLoaded && places && <Markers places={places} />}
          <Bounds city={city} setLocalBounds={setLocalBounds} />
        </Map>
      </div>
    </APIProvider>
  );
}