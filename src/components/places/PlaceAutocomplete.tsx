import React, { useRef, useState } from "react";
import {
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
  useGoogleMap,
} from "@react-google-maps/api";

export const PlaceAutoComplete = ({ setPlace }: any) => {
  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const inputRef: any = useRef();
  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      setAutoCompleteValue(place.formatted_address);
      setPlace(place.formatted_address);
      console.log(place.formatted_address);
    }
  };
  console.log(import.meta.env.GMAPS_API_KEY);
  return (
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GMAPS_API_KEY || ""}
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Location"
          />
        </StandaloneSearchBox>
      </LoadScript>
    </>
  );
};
