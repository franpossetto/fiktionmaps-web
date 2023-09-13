import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";

const noop = () => Promise.resolve(); 

type MapContext = {
    fictions?: Fiction[];
    fictionsSelected?: Fiction[];
    city: any;
    loading: boolean;
    setFictions: (f: any) => void;
    setFictionsSelected: (f: any) => void;
    setLoading: (ldg: boolean) => void;
    setCity: (ldg: any) => void;
}

const MapControllerContext = React.createContext<MapContext>({
    fictions: undefined,
    fictionsSelected: undefined,
    loading: true,
    city: undefined,
    setFictions: noop,
    setFictionsSelected: noop,
    setCity: noop,
    setLoading: noop,

  });

export const MapController = ({ children }: { children: React.ReactNode })  => {
    const [fictions, setFictions] = useState<Fiction[]>();
    const [fictionsSelected, setFictionsSelected] = useState<Fiction[]>();
    const [city, setCity] = useState<any>({ lat: 40.7831, lng: -73.9712 });
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <MapControllerContext.Provider value={{
            fictions,
            fictionsSelected,
            loading,
            city,
            setFictions,
            setFictionsSelected,
            setLoading,
            setCity,
        }}>
        {children}
    </MapControllerContext.Provider>
    );
};

export const useMapController = () => useContext(MapControllerContext);