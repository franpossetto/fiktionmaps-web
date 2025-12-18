export type PlaceCoordinatesRequestDTO = {
    upperLat: number;
    lowerLat: number;
    rightLng: number;
    leftLng: number;
    fictionId: number | null;
  };

  export type PlaceCoordinatesResponseDTO = {
    placeId: number;
    latitude: number;
    longitude: number;
    screenshot: string;
  };
  