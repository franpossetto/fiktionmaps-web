import { useEffect, useState } from "react";
import { useMapController } from "../../contexts/MapContext";
import { useFictionService } from "../../services/useFictionService";
import Search from "./Search";
import Map from "./Map";
import { CitySelect } from "./CitySelect";
import { useCityService } from "../../services/useCityService";
import { FictionSelect } from "./FictionSelect";
import { FictionDisplayStatus } from "../../types/enum/FictionSelectorStatus";
import { XCircleIcon } from "@heroicons/react/24/solid";

export const MapView = () => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isFictionOpen, setFictionIsOpen] = useState(false);
  const [selectedFiction, setSelectedFiction] = useState<string>(
    FictionDisplayStatus.ALL_FICTIONS
  );

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
  const { data: fictionsByCity, refetch } = getFictionsByCity(city?.id || 1);

  const { getCityById } = useCityService();
  const { loading, data: selectedCity } = getCityById(city?.id || 1);

  const fictionSelectedOrNot =
    fictionsByCity != null &&
    fictionsByCity?.length > 1 &&
    selectedFiction != FictionDisplayStatus.ALL_FICTIONS;

  useEffect(() => {
    if (fictionsByCity) {
      setFictions(fictionsByCity);
      setFictionsSelected(fictionsByCity);
    }
  }, [fictionsByCity]);

  useEffect(() => {
    setCity(selectedCity);
  }, [loading]);

  useEffect(() => {
    refetch();
  }, [city]);

  useEffect(() => {
    if (fictionsSelected != undefined) {
      setSelectedFiction(
        fictionsSelected?.length > 1
          ? FictionDisplayStatus.ALL_FICTIONS
          : fictionsSelected?.length === 1
          ? fictionsSelected[0].name
          : FictionDisplayStatus.NO_FICTIONS
      );
    }
  }, [fictionsSelected]);

  const resetFictions = () => {
    refetch();
    setSelectedFiction(FictionDisplayStatus.ALL_FICTIONS);
  };

  return (
    <div className="h-[100%] w-[100%] flex">
      <div className="flex w-[100%] justify-between z-10">
        <div className="w-[480px] bg-transparent font-semibold">
          <button
            type="button"
            className="rounded-md whitespace-nowrap bg-black/60 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 ml-3 lg:ml-28"
            onClick={() => setFictionIsOpen(!isFictionOpen)}
          >
            {selectedFiction}
          </button>
          {isFictionOpen && (
            <FictionSelect onClose={() => setFictionIsOpen(false)} />
          )}
          {fictionSelectedOrNot && (
            <button
              className="absolute rounded-md whitespace-nowrap bg-transparent py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 ml-1"
              onClick={() => resetFictions()}
            >
              <XCircleIcon className="h-auto w-6 text-white" />
            </button>
          )}
        </div>

        <button
          type="button"
          className="rounded-md bg-black/60 whitespace-nowrap px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 mt-6 h-10 mr-6"
          onClick={() => setIsCityOpen(!isCityOpen)}
        >
          {city?.name}
        </button>
        {isCityOpen && <CitySelect onClose={() => setIsCityOpen(false)} />}
      </div>

      {city && <Map />}
    </div>
  );
};
