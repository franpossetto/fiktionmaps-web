import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LocationDTO } from "../../types/dto/LocationDTO";
import { MapsProvider } from "../../types/providers/MapsProvider";
import { useSceneController } from "../../contexts/SceneContext";

export const SearchPlace = ({ reset }: any) => {
  const { place, setPlace: setPlc } = useSceneController();

  const loader = new Loader({
    apiKey: import.meta.env.VITE_GMAPS_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const options = {
    strictBounds: false,
    types: ["address"],
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

  useEffect(() => {
    inputRef.current.value = "";
  }, [reset]);

  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const inputRef: any = useRef();

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (place) {
      setAutoCompleteValue(place.formatted_address);

      let locality = "";
      let country = "";

      place.address_components?.forEach((component: any) => {
        if (component.types.includes("locality")) {
          locality = component.long_name;
        }
        if (component.types.includes("country")) {
          country = component.long_name;
        }
      });
      const location: LocationDTO = {
        formatted_address: place.formatted_address,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        place_id: place.place_id,
        provider: MapsProvider.GOOGLE_MAPS,
        city: locality,
        country: country,
      };
      setPlc({ place: location });
    }
  };

  return (
    <>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
        placeholder="Enter Location"
        ref={(ref) => (inputRef.current = ref)}
      />
    </>
  );
};
