import { useEffect, useRef, useState, useCallback } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const placesLibrary = useMapsLibrary("places");

  const options = {
    strictBounds: false,
    types: ["address"] as const,
  };

  useEffect(() => {
    if (selectedPlace) setPlc(selectedPlace);
  }, [selectedPlace, setPlc]);

  const handlePlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) return;

    const placeAutoComplete = autocompleteRef.current.getPlace();

    if (!placeAutoComplete || !placeAutoComplete.geometry) {
      if (inputRef.current) inputRef.current.value = "";
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
  }, [setPlc]);

  useEffect(() => {
    if (!placesLibrary || !inputRef.current) return;

    if (autocompleteRef.current) {
      google.maps.event.clearInstanceListeners(autocompleteRef.current);
    }

    autocompleteRef.current = new placesLibrary.Autocomplete(
      inputRef.current,
      options
    );

    autocompleteRef.current.addListener("place_changed", handlePlaceChanged);

    let rafId: number | null = null;
    const fixDropdownPosition = () => {
      const pacContainer = document.querySelector('.pac-container') as HTMLElement;
      if (pacContainer && inputRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        pacContainer.style.position = 'fixed';
        pacContainer.style.top = `${inputRect.bottom}px`;
        pacContainer.style.left = `${inputRect.left}px`;
        pacContainer.style.width = `${inputRect.width}px`;
        pacContainer.style.zIndex = '9999';
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && (node as Element).classList?.contains('pac-container')) {
              fixDropdownPosition();
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    const scrollHandler = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          fixDropdownPosition();
          rafId = null;
        });
      }
    };
    
    const resizeHandler = () => {
      fixDropdownPosition();
    };

    window.addEventListener('scroll', scrollHandler, true);
    window.addEventListener('resize', resizeHandler);
    
    const modalContainer = inputRef.current?.closest('[role="dialog"]') || 
                           inputRef.current?.closest('.overflow-y-auto') ||
                           inputRef.current?.closest('[class*="overflow"]');
    if (modalContainer) {
      modalContainer.addEventListener('scroll', scrollHandler, true);
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scrollHandler, true);
      window.removeEventListener('resize', resizeHandler);
      if (modalContainer) {
        modalContainer.removeEventListener('scroll', scrollHandler, true);
      }
    };
  }, [placesLibrary, handlePlaceChanged]);

  const handleReset = () => {
    setPlc(null);
    setIsDisabled(false);
    if (inputRef.current) inputRef.current.value = "";
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
