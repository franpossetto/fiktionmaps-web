import { useEffect, useState } from "react";
import Map from "./map/Map";
import { useMapController } from "../../contexts/MapContext";
import { useFetchCityById } from "../../hooks/cities/useFetchCityById";
import { FictionSelector } from "./select/FictionSelector";
import { CitySelector } from "./select/CitySelector";
import { SearchInThisArea } from "./select/SearchInThisArea";

export const MapView = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { city, setCity } = useMapController();
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
            <FictionSelector/>
            <SearchInThisArea/>
            <CitySelector/>
        </div>
      )}
      {city && <Map onLoad={() => setIsMapLoaded(true)}/>}
    </div>
  );
};


