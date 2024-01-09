import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";
import { Place } from "../types/Place";

const noop = () => Promise.resolve();

type PlaceContext = {
  fiction?: Fiction;
  place?: Place;
  scene?: any;
  loading: boolean;
  setFiction: (f: Fiction) => void;
  setPlace: (p: any) => void;
  setScene: (s: any) => void;
  setLoading: (ldg: boolean) => void;
};

const PlaceControllerContext = React.createContext<PlaceContext>({
  fiction: undefined,
  place: undefined,
  scene: undefined,
  loading: true,
  setFiction: noop,
  setPlace: noop,
  setScene: noop,
  setLoading: noop,
});

export const PlaceController = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fiction, setFiction] = useState<Fiction>();
  const [place, setPlace] = useState<Place>();
  const [scene, setScene] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <PlaceControllerContext.Provider
      value={{
        fiction,
        place,
        scene,
        loading,
        setFiction,
        setPlace,
        setScene,
        setLoading,
      }}
    >
      {children}
    </PlaceControllerContext.Provider>
  );
};
export const usePlaceController = () => useContext(PlaceControllerContext);
