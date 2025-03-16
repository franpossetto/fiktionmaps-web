import { useMapController } from "../../../contexts/MapContext";

import { useEffect, useState } from "react";
import { createSearchParametersOverride } from "../../../types/dto/MapBoundsDTO";
import { FICTION_EMPTY } from "../../../contants";

export const SearchInThisArea = () => {

    const { mapBounds, renderMap, setRenderMap, setPlaceSearchParameters } = useMapController();

    useEffect(() => {
        if (!renderMap) return;
        searchInThisArea();
    }, [mapBounds]); 

    const searchInThisArea = async () => {
        const searchParametersOverride = createSearchParametersOverride(mapBounds, FICTION_EMPTY);
        setPlaceSearchParameters(searchParametersOverride);
        setRenderMap(false);
    };

    return (
        <>
            {(mapBounds) && (
                <button
                    type="button"
                    className="rounded-md whitespace-nowrap px-3 py-2 
                    text-sm font-semibold shadow-sm mt-6 h-10 mr-6 bg-white/80
                     text-black hover:bg-white/20 dark:bg-black/60 dark:text-white
                      dark:hover:bg-white/20"
                      onClick={() => setRenderMap(true)}
                >
                    Search in this area
                </button>

            )}
        </>
    )
}