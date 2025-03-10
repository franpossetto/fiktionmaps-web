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
    <div className="relative h-screen w-full">
      {city && <MapView onLoad={() => setIsMapLoaded(true)} />}
      {isMapLoaded && (
        <>
          <div className="absolute top-0 left-0 w-full z-10 flex justify-between">
            <FictionSelector />
            <SearchInThisArea />
            <CitySelector />
          </div> 
        </>
      )}
    </div>
  );
  
};


