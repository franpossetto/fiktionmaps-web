import { useEffect, useState } from "react";
import { useMapController } from "../../contexts/MapContext";
import { FictionSelector } from "./select/FictionSelector";
import { CitySelector } from "./select/CitySelector";
import { SearchInThisArea } from "./select/SearchInThisArea";
import MapView from "./map/MapView";
import { useFetchCityById } from "../../hooks/cities/useFetchCityBiId/useFetchCityById";

export const Home = () => {
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
      {city && <MapView onLoad={() => setIsMapLoaded(true)}/>}
    </div>
  );
};


