import React, { useEffect, useState } from "react";
import { usePlaceController } from "../../../../contexts/PlaceContext";
import { Map, Marker } from "@vis.gl/react-google-maps";
import DefaultPlace from "./DefaultPlace";
import { useMapController } from "../../../../contexts/MapContext";
import { DARK_MAP_ID, LIGHT_MAP_ID, STYLE_DARK } from "../../../../contants";
import { Place } from "../../../../types/Place";

interface PlaceDetailsProps {
  place: Place | undefined
}


const PlaceDetails: React.FC<PlaceDetailsProps>  = ({place}) => {
  const { style } = useMapController();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapId = style === STYLE_DARK ? DARK_MAP_ID : LIGHT_MAP_ID;

  const defaultCenter = {
    lat: place?.location.latitude ?? DefaultPlace.location.latitude,
    lng: place?.location.longitude ?? DefaultPlace.location.longitude,
  };

  console.log(place);
  return (
    <div className="h-60 mt-5">
      <div className="h-full w-full rounded-md mb-5">
        {defaultCenter && (
          <Map
            center={defaultCenter}
            zoom={15}
            mapId={mapId}
            disableDefaultUI={true}
            mapTypeControl={false}
            zoomControl={false}
            fullscreenControl={false}
            gestureHandling={"none"}
            streetViewControl={false}
            scrollwheel={false}
            draggable={false}
            onTilesLoaded={() => setIsMapLoaded(true)}
          >
            {isMapLoaded && place && (
              <Marker
                position={{
                  lat: place.location.latitude,
                  lng: place.location.longitude,
                }}
                title={place.location.formattedAddress}
              />
            )}
          </Map>
        )}
      </div>
    </div>
  );
};

export default PlaceDetails;
