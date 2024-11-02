import { useEffect, useState } from "react";
import Map from "./map/Map";
import { useMapController } from "../../contexts/MapContext";
import { useFictionService } from "../../services/useFictionService";
import { useCityService } from "../../services/useCityService";
import { CitySelect } from "./select/CitySelect";
import { FictionSelect } from "./select/FictionSelect";
import { FictionDisplayStatus } from "../../types/enum/FictionSelectorStatus";
import { XCircleIcon } from "@heroicons/react/24/solid";
import usePlaceService from "../../services/usePlaceService";

export const MapView = () => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [fictionIsOpen, setFictionIsOpen] = useState(false);
  const [selectedFiction, setSelectedFiction] = useState<string>(
    FictionDisplayStatus.ALL_FICTIONS
  );

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const { getPlacesByCoordinates } = usePlaceService();

  const {
    fictions,
    mapBounds,
    setFictions,
    loading: ldg,
    setLoading,
    fictionsSelected,
    setFictionsSelected,
    city,
    setCity,
  } = useMapController();

  const p: any = {
    upperLat: mapBounds.topRight.lat,
    lowerLat: mapBounds.bottomLeft.lat,
    rightLng: mapBounds.topRight.lng,
    leftLng: mapBounds.bottomLeft.lng,
    fictionId:
      selectedFiction !== FictionDisplayStatus.ALL_FICTIONS
        ? selectedFiction
        : "",
  };
  const [params, setParams] = useState<any>(p);

  const {
    loading: loading,
    data: places,
    refetch: r,
  } = getPlacesByCoordinates(params);

  useEffect(() => {
    if (city && selectedFiction) {
      let ficId = "";
      if (fictionsSelected && fictionsSelected.length == 1) {
        ficId = fictionsSelected[0].id.toString();
      }

      const p = {
        upperLat: mapBounds.topRight.lat,
        lowerLat: mapBounds.bottomLeft.lat,
        rightLng: mapBounds.topRight.lng,
        leftLng: mapBounds.bottomLeft.lng,
        fictionId: ficId,
      };
      setParams(p);
      r();
    }
  }, [mapBounds, selectedFiction, city]);

  const { getFictionsByCity } = useFictionService();
  const {
    loading: loadingFictions,
    data: fictionsByCity,
    refetch,
  } = getFictionsByCity(city?.id || 0);

  const { getCityById } = useCityService();
  const { loading: loadingCity, data: selectedCity } = getCityById(city?.id);

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
    if (!loadingCity) {
      setCity(selectedCity);
    }
  }, [loadingCity]);

  useEffect(() => {
    if (city) {
      refetch();
    }
  }, [city]);

  useEffect(() => {
    if (fictionsSelected != undefined && !loadingFictions) {
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
      {isMapLoaded && (
        <div className="flex w-[100%] justify-between z-10">
          <div className="w-[480px] bg-transparent font-semibold">
            <button
              type="button"
              className="rounded-md whitespace-nowrap py-2 px-3 text-sm font-semibold shadow-sm mt-6 h-10 ml-3 lg:ml-28 bg-white/80 text-black hover:bg-white/20 dark:bg-black/60 dark:text-white dark:hover:bg-white/20"
              onClick={() => setFictionIsOpen(!fictionIsOpen)}
            >
              {selectedFiction}
            </button>
            {fictionIsOpen && (
              <FictionSelect open={fictionIsOpen} setOpen={setFictionIsOpen} />
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

      {/* Asegúrate de pasar onLoad al mapa */}
      {city && <Map onLoad={() => setIsMapLoaded(true)} />}
    </div>
  );
};
