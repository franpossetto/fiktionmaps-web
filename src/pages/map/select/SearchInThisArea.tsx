import { useMapController } from "../../../contexts/MapContext";
import { useFetchPlacesByCoordinates } from "../../../hooks/places/useFetchPlaces";
import { useEffect, useState } from "react";

export const SearchInThisArea = () => {

    const [placeSearchParameters, setPlaceSearchParameters] = useState<any>(null);
    const { mapBounds, selectedFiction, setSelectedFiction } = useMapController();

    // const { data, refetch } = useFetchPlacesByCoordinates(placeSearchParameters);


    const searchInThisArea = () => {
        // refetch()
    };



    return (
        <>
            {(mapBounds) && (
                <button
                    type="button"
                    className="rounded-md whitespace-nowrap px-3 py-2 text-sm font-semibold shadow-sm mt-6 h-10 mr-6 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
                    onClick={() => searchInThisArea()}
                >
                    Search in this area
                </button>

            )}
        </>
    )
}