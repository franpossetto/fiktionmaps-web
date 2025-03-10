import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";
import { City } from "../types/City";

const noop = () => Promise.resolve();

type LatLng = { lat: number; lng: number };

export interface MapBounds {
  topRight: LatLng;
  bottomLeft: LatLng;
}

type MapContext = {
  selectedFiction: Fiction | undefined;
  city?: City;
  style: string;
  mapBounds?: MapBounds;
  toggleStyle: () => void;
  setSelectedFiction: (f: Fiction | undefined) => void;
  setCity: (city: City) => void;
  setMapBounds: (bounds: { topRight: LatLng; bottomLeft: LatLng }) => void;
  renderMap: boolean;
  setRenderMap: (value: boolean) => void; 
  placeSearchParameters: any;
  setPlaceSearchParameters: (value: any) => any;
  mapZoom: any;
  setMapZoom: (value: any) => any,
  toggleMarkerMode: () => void;
};

const MapControllerContext = React.createContext<MapContext>({
  selectedFiction: undefined,
  city: undefined,
  style: "light",
  mapBounds: undefined,
  toggleStyle: noop,
  setSelectedFiction: noop,
  setCity: noop,
  setMapBounds: noop,
  renderMap: false,
  setRenderMap: noop,
  placeSearchParameters: null,
  setPlaceSearchParameters: noop,
  mapZoom: true,
  setMapZoom: noop,
  toggleMarkerMode: noop
});

export const MapController = ({ children }: { children: React.ReactNode }) => {
  const [selectedFiction, setSelectedFiction] = useState<Fiction | undefined>();

  const [placeSearchParameters, setPlaceSearchParameters] = useState<any>(null);
  const [mapZoom, setMapZoom] = useState<boolean>(
    () => localStorage.getItem("mapZoom") === "true"
  );
  const [renderMap, setRenderMap] = useState<boolean>(false)
  const [city, setCity] = useState<City>();
  const [style, setStyle] = useState<string>(
    () => localStorage.getItem("themeStyle") || "light"
  );

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

  const toggleMarkerMode = () => {
    setMapZoom((prevMapZoom: boolean) => {
      const newMapZoom = !prevMapZoom;
      localStorage.setItem("mapZoom", newMapZoom.toString());
      return newMapZoom;
    });
  };

  return (
    <MapControllerContext.Provider
      value={{
        selectedFiction,
        city,
        style,
        mapBounds,
        toggleStyle,
        setSelectedFiction,
        setCity,
        setMapBounds,
        renderMap,
        setRenderMap,
        placeSearchParameters,
        setPlaceSearchParameters,
        mapZoom, 
        setMapZoom,
        toggleMarkerMode
      }}
    >
      {children}
    </MapControllerContext.Provider>
  );
};

export const useMapController = () => useContext(MapControllerContext);
