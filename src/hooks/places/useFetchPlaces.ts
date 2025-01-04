import { useQuery } from "@tanstack/react-query";
import { PlaceCoordinatesRequestDTO } from "../../types/dto/PlaceCoordinatesRequestDTO";
import { axiosWithoutToken } from "../../config/axios";
import expandCoordinates from "../../helpers/expandCoordinates";

const fetchPlacesByCoordinates = async (params: PlaceCoordinatesRequestDTO) => {
  const adjustedParams = expandCoordinates(params);

  const url = `/places/map?upperLat=${adjustedParams.upperLat}&lowerLat=${adjustedParams.lowerLat}&rightLng=${adjustedParams.rightLng}&leftLng=${adjustedParams.leftLng}&fictionId=${adjustedParams.fictionId}`;
  
  try {
    const response = await axiosWithoutToken.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching places by coordinates:', error);
    throw error;
  }
};

export const useFetchPlacesByCoordinates = (params: PlaceCoordinatesRequestDTO) => {
  const queryKey = ['fetchPlacesByCoordinates', params];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchPlacesByCoordinates(params),
    enabled: !!params && !!params.upperLat && !!params.lowerLat && !!params.rightLng && !!params.leftLng,
  });
  console.log(data)

  return { data, isLoading, error, refetch };
};
