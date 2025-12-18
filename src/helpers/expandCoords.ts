import { UseFictionsByCoordinatesRequest } from "@/hooks/fictions/useFetchFictionsByCoordinates/useFetchFictionsByCoordinates.types";

/**
 * Expands the geographical coordinates by a fixed degree to increase the search area.
 * @param {PlaceCoordinatesRequestDTO} params - The original coordinates and fictionId.
 * @returns {PlaceCoordinatesRequestDTO} The expanded coordinates.
 */
function expandCoords(params: UseFictionsByCoordinatesRequest): UseFictionsByCoordinatesRequest {
    const expansionFactor = 550 / 111;  // Convert degrees to kilometers approximately
    return {
      upperLat: params.upperLat + expansionFactor,
      lowerLat: params.lowerLat - expansionFactor,
      rightLng: params.rightLng + expansionFactor,
      leftLng: params.leftLng - expansionFactor,
    };
}

export default expandCoords;