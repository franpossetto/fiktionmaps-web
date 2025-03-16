import { useState } from "react";
import { useMapController } from "../../../contexts/MapContext";
import { FictionSelect } from "./FictionSelect";
import { FictionDisplayStatus } from "../../../types/enum/FictionSelectorStatus";
import { XCircleIcon } from "@heroicons/react/24/outline";

export const FictionSelector = () => {
    const [fictionIsOpen, setFictionIsOpen] = useState(false);

    const {
        selectedFiction,
        setSelectedFiction,
    } = useMapController();

    const resetFictions = () => {
        setSelectedFiction(undefined)
    };


    return (
        <div className="bg-transparent font-semibold">
            <button
                type="button"
                className="rounded-md whitespace-nowrap py-2 px-3 text-sm font-semibold shadow-sm mt-6 h-10 ml-3 lg:ml-28 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
                onClick={() => setFictionIsOpen(!fictionIsOpen)}>
                {fictionIsOpen && (
                    <FictionSelect open={fictionIsOpen} setOpen={setFictionIsOpen} />
                )}
                {selectedFiction ? selectedFiction.name : FictionDisplayStatus.ALL_FICTIONS}
            </button>

            {selectedFiction != undefined && (
                <button
                    className="absolute rounded-md whitespace-nowrap bg-transparent py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 ml-1"
                    onClick={() => resetFictions()}
                >
                    <XCircleIcon className="h-auto w-6 text-white" />
                </button>
            )}
        </div>
    )
}