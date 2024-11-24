import { useState } from "react";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import { PlaceCoordinatesRequestDTO } from "../types/dto/PlaceCoordinatesRequestDTO";
import { PlaceCoordinatesResponseDTO } from "../types/dto/PlaceCoordinatesResponseDTO";
import { Place } from "../types/Place";

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

  const getPlaceById = (
    place_id: string
  ): useAxiosResponse<Place> => {
    const url = `/places/${place_id}`;
  
    return useAxios({
      url,
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  return {
    getPlacesByCoordinates,
    getPlaceById,
  };
};

export default usePlaceService;
