import { useEffect, useState } from "react";
import { useMapController } from "../../contexts/MapContext";
import { FictionSelector } from "./select/FictionSelector";
import { CitySelector } from "./select/CitySelector";
import { SearchInThisArea } from "./select/SearchInThisArea";
import MapView from "./map/MapView";
import { useFetchCityById } from "../../hooks/cities/useFetchCityBiId/useFetchCityById";
import { motion, AnimatePresence } from "framer-motion";
import { AppVersion } from "../../components/common/AppVersion";

export const Home = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const { city, setCity } = useMapController();
  const { data: cityById, isLoading: loadingCity } = useFetchCityById(city?.id);

  useEffect(() => {
    if (!loadingCity && cityById) {
      setCity(cityById);
    }
  }, [cityById, loadingCity, setCity]);

  useEffect(() => {
    if (isMapLoaded) {
      const timer = setTimeout(() => {
        setShowControls(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMapLoaded]);

  return (
    <div className="relative h-screen w-full">
      {city && <MapView onLoad={() => setIsMapLoaded(true)} />}
      {isMapLoaded && (
        <AnimatePresence>
          {showControls && (
            <motion.div 
              className="absolute top-0 left-0 w-full z-10 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FictionSelector />
              <SearchInThisArea />
              <CitySelector />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <AppVersion />
    </div>
  );
};


