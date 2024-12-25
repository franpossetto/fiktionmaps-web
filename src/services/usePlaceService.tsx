import { useState } from "react";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import { PlaceCoordinatesRequestDTO } from "../types/dto/PlaceCoordinatesRequestDTO";
import { PlaceCoordinatesResponseDTO } from "../types/dto/PlaceCoordinatesResponseDTO";
import { Place } from "../types/Place";

const usePlaceService = () => {
  const getPlacesByCoordinates = (
    params: PlaceCoordinatesRequestDTO
  ): useAxiosResponse<PlaceCoordinatesResponseDTO[]> => {

  const expansionLat = 50 / 111;
  const x1= params.upperLat + expansionLat;
  const x2= params.lowerLat - expansionLat;
  const x3= params.rightLng + expansionLat;
  const x4= params.leftLng - expansionLat;

  const url = `/places/map?upperLat=${x1}&lowerLat=${x2}&rightLng=${x3}&leftLng=${x4}&fictionId=${params.fictionId}`;
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
