import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";

import { City } from "../types/City";
const noop = () => Promise.resolve();

type MapContext = {
  fictions?: Fiction[];
  fictionsSelected?: Fiction[];
  city?: City;
  loading: boolean;
  setFictions: (f: any) => void;
  setFictionsSelected: (f: any) => void;
  setLoading: (ldg: boolean) => void;
  setCity: (ldg: any) => void;
};

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

export const MapController = ({ children }: { children: React.ReactNode }) => {

  const [fictions, setFictions] = useState<Fiction[]>();
  const [fictionsSelected, setFictionsSelected] = useState<Fiction[]>();
  const [city, setCity] = useState<City>();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <MapControllerContext.Provider
      value={{
        fictions,
        fictionsSelected,
        loading,
        city,
        setFictions,
        setFictionsSelected,
        setLoading,
        setCity,
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};

export const useMapController = () => useContext(MapControllerContext);
