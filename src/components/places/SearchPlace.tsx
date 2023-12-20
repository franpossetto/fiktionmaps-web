import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LocationDTO } from "../../types/dto/LocationDTO";
import { MapsProvider } from "../../types/providers/MapsProvider";
import { useSceneController } from "../../contexts/SceneContext";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Place } from "../../types/Place";

interface SearchPlaceProps {
  selectedPlace?: Place;
  placeholder?: string;
}

export const SearchPlace = ({
  selectedPlace,
  placeholder,
}: SearchPlaceProps) => {
  const { place, setPlace: setPlc } = useSceneController();
  const [isDisabled, setIsDisabled] = useState(false);

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

  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const inputRef: any = useRef();

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (!place || !place.geometry) {
      inputRef.current.value = "";
      return;
    }

    let locality = "",
      country = "";
    place.address_components.forEach((component) => {
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
    setIsDisabled(true);
  };

  const handleReset = () => {
    const defaultLocation = {
      formatted_address: "1575 York Ave, New York, NY 10028, USA",
      latitude: 40.7744823,
      longitude: -73.9484961,
      place_id: "ChIJp6aZ8LlYwokRoXWttn1Qz9c",
      provider: MapsProvider.GOOGLE_MAPS,
      city: "New York",
      country: "United States",
    };

    setPlc({ place: defaultLocation });
    setIsDisabled(false); // Volver a habilitar el campo de entrada

    // Actualizar el valor del input para mostrar la dirección de Nueva York
    inputRef.current.value = defaultLocation.formatted_address;
  };

  return (
    <div className="relative block w-full">
      <input
        type="text"
        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        ref={inputRef}
        disabled={isDisabled}
      />

      {isDisabled && (
        <button
          onClick={handleReset}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
        </button>
      )}
    </div>
  );
};
