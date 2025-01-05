import { useEffect, useState } from "react";
import Map from "./map/Map";
import { useMapController } from "../../contexts/MapContext";
import { CitySelect } from "./select/CitySelect";
import { useFetchCityById } from "../../hooks/cities/useFetchCityById";
import { FictionSelector } from "./select/FictionSelector";

export const MapView = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const { city, setCity,} = useMapController();
  const { data: cityById, isLoading: loadingCity } = useFetchCityById(city?.id);

  useEffect(() => {
    if (!loadingCity && cityById) {
      setCity(cityById);
    }
  }, [cityById, loadingCity, setCity]);


  return (
    <div className="h-[100%] w-[100%] flex">
      {isMapLoaded && (
        <div className="flex w-[100%] justify-between z-10">
          <div className="bg-transparent font-semibold">
            <FictionSelector/>
          </div>
          {/* {isSearchButtonVisible && (
            <button
              type="button"
              className="rounded-md whitespace-nowrap px-3 py-2 text-sm font-semibold shadow-sm mt-6 h-10 mr-6 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
              onClick={() => searchInThisArea()}
            >
              Search in this area
            </button>
          )} */}
          <button
            type="button"
            className="rounded-md whitespace-nowrap px-3 py-2 text-sm font-semibold shadow-sm mt-6 h-10 mr-6 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
            onClick={() => setIsCityOpen(!isCityOpen)}
          >
            {city?.name}
          </button>
          {isCityOpen && (
            <CitySelect open={isCityOpen} setOpen={setIsCityOpen} />
          )}
        </div>
      )}
      {city && <Map onLoad={() => setIsMapLoaded(true)}/>}
    </div>
  );
};


