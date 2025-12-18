import { useQuery } from "@tanstack/react-query";
import { Place } from "../../../types/Place";
import { axiosWithoutToken } from "../../../config/axios";
import { PlaceResponseDTO } from "./usePlaceFetchById.types";

const fetchPlaceById = async (placeId: string): Promise<PlaceResponseDTO> => {
  const url = `/places/${placeId}`;
  try {
    const response = await axiosWithoutToken.get(url);
    return response.data as Place;
  } catch (error) {
    console.error("Error fetching place by ID:", error);
    throw error;
  }
};

export const useFetchPlaceById = (placeId: string) => {
  const queryKey = ["fetchPlaceById", placeId];

  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchPlaceById(placeId),
    enabled: !!placeId,
  });

  return { data, isLoading, error, refetch };
};
