import { MapBounds } from "../contexts/MapContext";
import { PlaceCoordinatesRequestDTO } from "../types/dto/PlaceCoordinatesRequestDTO";
import { Fiction } from "../types/Fiction";

export function preparePlaceCoordinatesRequestDTO(
    mapBounds: MapBounds,
    fictionsSelected: Fiction[]
  ): PlaceCoordinatesRequestDTO | null {
    if (mapBounds && fictionsSelected.length > 0) {
      return {
        upperLat: mapBounds.topRight.lat,
        lowerLat: mapBounds.bottomLeft.lat,
        rightLng: mapBounds.topRight.lng,
        leftLng: mapBounds.bottomLeft.lng,
        fictionId: fictionsSelected[0].id
      };
    }
    return null;
  }