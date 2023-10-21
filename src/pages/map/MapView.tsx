import { useEffect, useState } from "react";
import { useMapController } from "../../contexts/MapContext";
import { useFictionService } from "../../services/useFictionService";
import Search from "./Search";
import Map from "./Map";
import { CitySelect } from "./CitySelect";
import { useCityService } from "../../services/useCityService";
import { FictionSelect } from "./FictionSelect";
import { FictionDisplayStatus } from "../../types/enum/FictionSelectorStatus";

export const MapView = () => {
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [isFictionOpen, setFictionIsOpen] = useState(false);
  const [selectedFiction, setSelectedFiction] = useState<string>(FictionDisplayStatus.ALL_FICTIONS);

  
  const {
    fictions,
    setFictions,
    loading: ldg,
    setLoading,
    fictionsSelected,
    setFictionsSelected,
    city,
    setCity,
  } = useMapController();

    const { getFictionsByCity } = useFictionService();
    const { data:fictionsByCity,refetch } = getFictionsByCity(city?.id || 1); 

    const { getCityById } = useCityService();
    const { loading, data:selectedCity } = getCityById(city?.id || 1);

  useEffect(() => {
    if (fictionsByCity) {
      setFictions(fictionsByCity);
      setFictionsSelected(fictionsByCity);
    }
    
  }, [fictionsByCity]);


  useEffect(()=>{
    setCity(selectedCity);
  },[loading])

  
  useEffect(()=>{
   refetch();
  },[city])
  
  useEffect(() => {
    if(fictionsSelected!=undefined){
      setSelectedFiction(
        fictionsSelected?.length > 1
        ? FictionDisplayStatus.ALL_FICTIONS
        : fictionsSelected?.length === 1
        ? fictionsSelected[0].name
        : FictionDisplayStatus.NO_FICTIONS
        );
      }
  }, [fictionsSelected]);

  return (
    <div className="h-[100%] w-[100%] flex ">
      <div className="flex w-[100%] justify-between z-10">
        <div className="w-[480px] bg-transparent font-semibold">
        <button
          type="button"
          className="rounded-md bg-black/60 py-2 px-6 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 mx-28"
          onClick={() => setFictionIsOpen(!isFictionOpen)}
          >
         {selectedFiction}
        </button>
          {isFictionOpen && <FictionSelect onClose={() => setFictionIsOpen(false)} />}
        </div>
        <button
          type="button"
          className="rounded-md bg-black/60 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 mr-6"
          onClick={() => setIsOpen(!isOpen)}
          >
         {city?.name}
        </button>
        {isOpen && <CitySelect onClose={() => setIsOpen(false)} />}

      </div>      
   
      {city && <Map />}
    </div>
  );
};
