import React, { useContext, useState } from "react";
import { Fiction } from "../types/Fiction";
const noop = () => Promise.resolve();

type SceneContext = {
  fiction?: Fiction;
  place?: any;
  scene?: any;
  loading: boolean;
  setFiction: (f: Fiction) => void;
  setPlace: (p: any) => void;
  setScene: (s: any) => void;
  setLoading: (ldg: boolean) => void;
};

const SceneControllerContext = React.createContext<SceneContext>({
  fiction: undefined,
  place: undefined,
  scene: undefined,
  loading: true,
  setFiction: noop,
  setPlace: noop,
  setScene: noop,
  setLoading: noop,
});

export const SceneController = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fiction, setFiction] = useState<Fiction>();
  const [place, setPlace] = useState<any>();
  const [scene, setScene] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <SceneControllerContext.Provider
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
    </SceneControllerContext.Provider>
  );
};
export const useSceneController = () => useContext(SceneControllerContext);
