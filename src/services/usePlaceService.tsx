import { useState } from "react";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import { PlaceCoordinatesRequestDTO } from "../types/dto/PlaceCoordinatesRequestDTO";
import { PlaceCoordinatesResponseDTO } from "../types/dto/PlaceCoordinatesResponseDTO";

const usePlaceService = () => {
  const getPlacesByCoordinates = (
    params: PlaceCoordinatesRequestDTO
  ): useAxiosResponse<PlaceCoordinatesResponseDTO[]> => {
    const url = `/places/map?upperLat=${params.upperLat}&lowerLat=${params.lowerLat}&rightLng=${params.rightLng}&leftLng=${params.leftLng}&fictionId=${params.fictionId}`;

    return useAxios({
      url: url,
      config: { method: "get" },
      tokenRequired: false,
    });
  };
  return {
    getPlacesByCoordinates,
  };
};

export default usePlaceService;
