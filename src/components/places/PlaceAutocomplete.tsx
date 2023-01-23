import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const PlaceAutoComplete = ({ setPlace }: any) => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["street_address"],
  };

  let autocomplete: any;
  let isAutocompleteLoaded = false;

  useEffect(() => {
    loader
      .load()
      .then((google) => {
        autocomplete = new google.maps.places.Autocomplete(
          inputRef.current,
          options
        );
        autocomplete.addListener("place_changed", handlePlaceChanged);
        isAutocompleteLoaded = true;
      })
      .catch((e) => {});
    return () => {
      if (isAutocompleteLoaded) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, []);

  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const inputRef: any = useRef();

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (place) {
      setAutoCompleteValue(place.formatted_address);
      setPlace(place.formatted_address);
    }
  };
  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Location"
        ref={(ref) => (inputRef.current = ref)}
      />
    </>
  );
};
