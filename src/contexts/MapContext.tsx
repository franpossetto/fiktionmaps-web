import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";
import { City } from "../types/City";

const noop = () => Promise.resolve();

type MapContext = {
  fictions?: Fiction[];
  fictionsSelected?: Fiction[];
  city?: City;
  loading: boolean;
  style: string;
  toggleStyle: () => void;
  setFictions: (f: any) => void;
  setFictionsSelected: (f: any) => void;
  setCity: (ldg: any) => void;
  setLoading: (ldg: boolean) => void;
};

const MapControllerContext = React.createContext<MapContext>({
  fictions: undefined,
  fictionsSelected: undefined,
  city: undefined,
  loading: true,
  style: 'light',
  toggleStyle: noop,
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
  const [style, setStyle] = useState<string>('light');

  const toggleStyle = () => {
    setStyle(prevStyle => prevStyle === 'light' ? 'dark' : 'light');
  }

  return (
    <MapControllerContext.Provider
      value={{
        fictions,
        fictionsSelected,
        city,
        loading,
        style,
        toggleStyle,
        setFictions,
        setFictionsSelected,
        setCity,
        setLoading,
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};

export const useMapController = () => useContext(MapControllerContext);
