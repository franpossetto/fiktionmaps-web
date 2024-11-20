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
  mapBounds?: {
    topRight: LatLng;
    bottomLeft: LatLng;
  };
  places?:any[];
  toggleStyle: () => void;
  setFictions: (f: Fiction[]) => void;
  setFictionsSelected: (f: Fiction[]) => void;
  setCity: (city: City) => void;
  setLoading: (ldg: boolean) => void;
  setMapBounds: (bounds: { topRight: LatLng; bottomLeft: LatLng }) => void;
  setPlaces: (places: any) => void;
};

const MapControllerContext = React.createContext<MapContext>({
  fictions: undefined,
  fictionsSelected: undefined,
  city: undefined,
  loading: true,
  style: "light",
  mapBounds: undefined,
  places: undefined,
  toggleStyle: noop,
  setFictions: noop,
  setFictionsSelected: noop,
  setCity: noop,
  setLoading: noop,
  setMapBounds: noop,
  setPlaces: noop,
});

export const MapController = ({ children }: { children: React.ReactNode }) => {
  const [fictions, setFictions] = useState<Fiction[]>();
  const [fictionsSelected, setFictionsSelected] = useState<Fiction[]>();
  const [city, setCity] = useState<City>();
  const [loading, setLoading] = useState<boolean>(true);
  const [style, setStyle] = useState<string>(
    () => localStorage.getItem("themeStyle") || "light"
  );

  const [mapBounds, setMapBounds] = useState({
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  });
  const [places, setPlaces] = useState<any[]>();


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
        places,
        toggleStyle,
        setFictions,
        setFictionsSelected,
        setCity,
        setLoading,
        setMapBounds, // Función para actualizar las coordenadas
        setPlaces,
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};

export const useMapController = () => useContext(MapControllerContext);
