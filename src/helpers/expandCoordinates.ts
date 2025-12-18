import { PlaceCoordinatesRequestDTO } from "../hooks/places/useFetchPlaces/useFetchPlaces.types";

/**
 * Expands the geographical coordinates by a fixed degree to increase the search area.
 * @param {PlaceCoordinatesRequestDTO} params - The original coordinates and fictionId.
 * @returns {PlaceCoordinatesRequestDTO} The expanded coordinates.
 */
function expandCoordinates(params: PlaceCoordinatesRequestDTO): PlaceCoordinatesRequestDTO {
    const expansionFactor = 70 / 111;  // Convert degrees to kilometers approximately
    return {
      upperLat: params.upperLat + expansionFactor,
      lowerLat: params.lowerLat - expansionFactor,
      rightLng: params.rightLng + expansionFactor,
      leftLng: params.leftLng - expansionFactor,
      fictionId: params.fictionId 
    };
}

export default expandCoordinates;
