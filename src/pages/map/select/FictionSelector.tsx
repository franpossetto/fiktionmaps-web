import React, { useEffect, useState } from "react";
import { FictionSelect } from "./FictionSelect";
import { FictionDisplayStatus } from "../../../types/enum/FictionSelectorStatus";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useMapController } from "../../../contexts/MapContext";
import { useFictionsByCity } from "../../../hooks/fictions/useFetchFictions";

export const FictionSelector = ({ }) => {
    const [fictionIsOpen, setFictionIsOpen] = useState(false);
    const [selectedFictionName, setSelectedFictionName] = useState<string>(FictionDisplayStatus.ALL_FICTIONS);
    // const [showClearFictionsButton, setShowClearFictionsButton] = useState(false)

    const {
        city,
        fictionsSelected,
        setFictionsSelected,
    } = useMapController();

    const { data: fictions, refetch: refetchFictionsByCity } = useFictionsByCity(city?.id);

    useEffect(() => {
        if (fictionsSelected != undefined) {

            const buttonLabel = fictionsSelected?.length > 1
                ? FictionDisplayStatus.ALL_FICTIONS
                : fictionsSelected?.length === 1
                    ? fictionsSelected[0].name
                    : FictionDisplayStatus.NO_FICTIONS

            setSelectedFictionName(buttonLabel);
        }

    }, [fictionsSelected]);


    //   const resetFictions = () => {
    //       setFictionsSelected(fictions)
    //       setSelectedFictionName(FictionDisplayStatus.ALL_FICTIONS);
    //       setShowClearFictionsButton(false)
    // };

    useEffect(() => {
        if (city) {
            refetchFictionsByCity();
            setFictionsSelected(fictions)
            setSelectedFictionName(FictionDisplayStatus.ALL_FICTIONS)
        }
    }, [city]);

    return (
        <>
            <button
                type="button"
                className="rounded-md whitespace-nowrap py-2 px-3 text-sm font-semibold shadow-sm mt-6 h-10 ml-3 lg:ml-28 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
                onClick={() => setFictionIsOpen(!fictionIsOpen)}
            >
                {fictionIsOpen && (
                    <FictionSelect open={fictionIsOpen} setOpen={setFictionIsOpen} />
                )}
                {selectedFictionName}
            </button>

            {/* {showClearFictionsButton && (
              <button
                className="absolute rounded-md whitespace-nowrap bg-transparent py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 ml-1"
                onClick={() => resetFictions()}
              >
                <XCircleIcon className="h-auto w-6 text-white" />
              </button>
            )} */}

        </>
    )
}