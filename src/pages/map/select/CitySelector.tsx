import { useCallback, useState } from "react";
import { CitySelect } from "./CitySelect";
import { useMapController } from "../../../contexts/MapContext";
import React from "react";

export const CitySelector = React.memo(() => {
    const [isCityOpen, setIsCityOpen] = useState(false);
    const { city } = useMapController();
    const handleToggle = useCallback(() => setIsCityOpen(prev => !prev), []);

    return (
        <>
            <button
                type="button"
                className="rounded-md whitespace-nowrap px-3 py-2 text-sm font-semibold shadow-sm mt-6 h-10 mr-6 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
                onClick={() => handleToggle()}>
                {city?.name}
            </button>
            {isCityOpen && (
                <CitySelect open={isCityOpen} setOpen={setIsCityOpen} />
            )}
        </>
    )
});