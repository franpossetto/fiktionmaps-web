import { useQuery } from "@tanstack/react-query";
import { PlaceCoordinatesRequestDTO, PlaceCoordinatesResponseDTO } from "./useFetchPlaces.types";
import expandCoordinates from "../../../helpers/expandCoordinates";
import { axiosWithoutToken } from "../../../config/axios";

const fetchPlaces = async (params: PlaceCoordinatesRequestDTO): Promise<PlaceCoordinatesResponseDTO[]> => {
  const adjustedParams = expandCoordinates(params);

  const url = `/places/map?upperLat=${adjustedParams.upperLat}&lowerLat=${adjustedParams.lowerLat}&rightLng=${adjustedParams.rightLng}&leftLng=${adjustedParams.leftLng}&fictionId=${adjustedParams.fictionId}`;
  
  try {
    const response = await axiosWithoutToken.get(url);
    const data: PlaceCoordinatesResponseDTO[] = response.data;
    return data;

  } catch (error) {
    console.error('Error fetching places by coordinates:', error);
    throw error;
  }
};

export const useFetchPlaces = (params: PlaceCoordinatesRequestDTO) => {

  const queryKey = ['fetchPlacesByCoordinates', params];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchPlaces(params),
    enabled: !!params && !!params.upperLat && !!params.lowerLat && !!params.rightLng && !!params.leftLng,
  });
  
  
  return { data, isLoading, error, refetch };
};
