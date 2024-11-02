import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";
import { City } from "../types/City";

const noop = () => Promise.resolve();

type LatLng = { lat: number; lng: number };

type MapContext = {
  fictions?: Fiction[];
  fictionsSelected?: Fiction[];
  city?: City;
  loading: boolean;
  style: string;
  mapBounds: {
    topRight: LatLng;
    bottomLeft: LatLng;
  };
  toggleStyle: () => void;
  setFictions: (f: any) => void;
  setFictionsSelected: (f: any) => void;
  setCity: (ldg: any) => void;
  setLoading: (ldg: boolean) => void;
  setMapBounds: (bounds: { topRight: LatLng; bottomLeft: LatLng }) => void;
};

const MapControllerContext = React.createContext<MapContext>({
  fictions: undefined,
  fictionsSelected: undefined,
  city: undefined,
  loading: true,
  style: "light",
  mapBounds: {
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  },
  toggleStyle: noop,
  setFictions: noop,
  setFictionsSelected: noop,
  setCity: noop,
  setLoading: noop,
  setMapBounds: noop,
});

export const MapController = ({ children }: { children: React.ReactNode }) => {
  const [fictions, setFictions] = useState<Fiction[]>();
  const [fictionsSelected, setFictionsSelected] = useState<Fiction[]>();
  const [city, setCity] = useState<City>();
  const [loading, setLoading] = useState<boolean>(true);
  const [style, setStyle] = useState<string>(
    () => localStorage.getItem("themeStyle") || "light"
  );

  // Estado para las coordenadas
  const [mapBounds, setMapBounds] = useState({
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  });

  const toggleStyle = () => {
    setStyle((prevStyle) => {
      const newStyle = prevStyle === "light" ? "dark" : "light";
      localStorage.setItem("themeStyle", newStyle);
      return newStyle;
    });
  };

  return (
    <MapControllerContext.Provider
      value={{
        fictions,
        fictionsSelected,
        city,
        loading,
        style,
        mapBounds, // Pasar las coordenadas
        toggleStyle,
        setFictions,
        setFictionsSelected,
        setCity,
        setLoading,
        setMapBounds, // Función para actualizar las coordenadas
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};

export const useMapController = () => useContext(MapControllerContext);
