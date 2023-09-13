import { useEffect } from "react";
import { useMapController } from "../../contexts/MapContext";
import { useFictionService } from "../../services/useFictionService";
import Search from "./Search";
import Map from "./Map";


export const MapView = () => {
    
    const { getFictionsByCity } = useFictionService();
    const { loading, data, error } = getFictionsByCity(1);
    const {fictions, setFictions, loading: ldg, setLoading,  fictionsSelected, setFictionsSelected, city, setCity} = useMapController();


    useEffect(() => {
        if (data) {
            setFictions(data);
            setFictionsSelected(data);
        }
      }, [data]);

    return (
        <div className="absolute h-[100%] w-[100%] flex ">
            <div className="w-[480px] bg-transparent z-10">
                {!loading && (
                    <Search/>
                )}
            </div>
            { city &&
                <Map/>
            }
        </div>
    );
  };
