// src/utils/geo.ts

export interface Coordinates {
    lat: number;
    lng: number;
  }
  
  export interface ExpandedArea {
    topRight: Coordinates;
    bottomLeft: Coordinates;
  }
  
  /**
   * Expande un punto central para crear un área de 10 km en cada dirección.
   *
   * @param center - Punto central con latitud y longitud.
   * @param distanceKm - Distancia en kilómetros (por defecto 10 km).
   * @returns Objeto con topRight y bottomLeft.
   */
  export function expandFromCenter(center: Coordinates, distanceKm: number = 10): ExpandedArea {
    const { lat, lng } = center;
    const latRad = (lat * Math.PI) / 180;
  
    const deltaLat = distanceKm / 111; // Aprox. 0.09 grados por 10 km
    const deltaLng = distanceKm / (111 * Math.cos(latRad));
  
    return {
      topRight: { lat: lat + deltaLat, lng: lng + deltaLng },
      bottomLeft: { lat: lat - deltaLat, lng: lng - deltaLng },
    };
  }