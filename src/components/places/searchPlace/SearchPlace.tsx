import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { LocationDTO } from "../../../types/dto/LocationDTO";
import { MapsProvider } from "../../../types/providers/MapsProvider";
import { usePlaceController } from "../../../contexts/PlaceContext";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Place } from "../../../types/Place";
import placeholder from "../placeTable/common/Placeholder";

interface SearchPlaceProps {
  selectedPlace?: Place;
}

export const SearchPlace = ({ selectedPlace }: SearchPlaceProps) => {
  const { place: plc, setPlace: setPlc } = usePlaceController();
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
    if (selectedPlace) setPlc(selectedPlace);
  }, []);

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

  const inputRef: any = useRef();

  const handlePlaceChanged = () => {
    const placeAutoComplete = autocomplete.getPlace();

    if (!placeAutoComplete || !placeAutoComplete.geometry) {
      inputRef.current.value = "";
      return;
    }

    const newLocation = GetDataFromAutoComplete(placeAutoComplete);

    setPlc((prevPlc: Place) => {
      return {
        ...prevPlc,
        location: newLocation,
      };
    });
    setIsDisabled(true);
  };

  const handleReset = () => {
    setPlc(null);
    setIsDisabled(false);
    inputRef.current.value = null;
  };

  return (
    <div className="relative block w-full">
      <input
        type="text"
        className="w-full rounded-md border-0 bg-white dark:bg-gray-950 py-1.5 pl-3 pr-10 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={
          selectedPlace
            ? selectedPlace?.location.formattedAddress
            : placeholder.location
        }
        ref={inputRef}
        disabled={isDisabled}
      />

      {isDisabled && (
        <button
          onClick={handleReset}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
        >
          <LockClosedIcon className="h-5 w-5 text-gray-400 dark:text-gray-600" />
        </button>
      )}
    </div>
  );
};

// Get Data from AutoComplete
const GetDataFromAutoComplete = (placeAutoComplete: any) => {
  let locality = "",
    country = "";

  placeAutoComplete.address_components.forEach((component: any) => {
    if (component.types.includes("locality")) {
      locality = component.long_name;
    }
    if (component.types.includes("country")) {
      country = component.long_name;
    }
  });

  const location: LocationDTO = {
    formattedAddress: placeAutoComplete.formatted_address,
    latitude: placeAutoComplete.geometry.location.lat(),
    longitude: placeAutoComplete.geometry.location.lng(),
    placeId: placeAutoComplete.place_id,
    provider: MapsProvider.GOOGLE_MAPS,
    country: country,
    cityId: null,
  };

  return location;
};
