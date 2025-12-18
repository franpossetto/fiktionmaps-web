import { useMapController } from "../../../contexts/MapContext";
import { createSearchParametersOverride } from "../../../types/dto/MapBoundsDTO";
import { FICTION_EMPTY } from "../../../contants";
import { useEffect, useState } from "react";

export const SearchInThisArea = () => {

    const { mapBounds, renderMap, setRenderMap, setPlaceSearchParameters, setSelectedFiction } = useMapController();

    useEffect(() => {
        if (!renderMap) return;
        console.log("llamado")
        searchInThisArea();
    }, [mapBounds]); 


    const searchInThisArea = async () => {
        const searchParametersOverride = createSearchParametersOverride(mapBounds, FICTION_EMPTY);
        setSelectedFiction(undefined);
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