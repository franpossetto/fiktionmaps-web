import React, { createContext, useContext, useState } from 'react';

interface MapStyleContextType {
  style: string; // 'light' o 'dark'
  toggleStyle: () => void; // Función para cambiar el estilo
}

const MapStyleContext = createContext<MapStyleContextType | undefined>(undefined);

export const useMapStyle = (): MapStyleContextType => {
  const context = useContext(MapStyleContext);
  if (!context) {
    throw new Error('useMapStyle must be used within a MapStyleProvider');
  }
  return context;
};


export const MapStyleProvider = ({ children }: { children: React.ReactNode }) => {
  const [style, setStyle] = useState<string>('light');

  const toggleStyle = () => {
    setStyle((prevStyle) => (prevStyle === 'light' ? 'dark' : 'light'));
  };

  return (
    <MapStyleContext.Provider value={{ style, toggleStyle }}>
      {children}
    </MapStyleContext.Provider>
  );
};


