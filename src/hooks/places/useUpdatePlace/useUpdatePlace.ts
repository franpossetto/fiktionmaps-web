import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { Place } from "../../../types/Place";

interface UpdatePlaceParams {
  placeId: number;
  place: Place;
}

const updatePlace = async ({ placeId, place }: UpdatePlaceParams) => {
  const response = await axiosWithToken.put(`/places/${placeId}`, place);
  return response.data;
};

export const useUpdatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation<Place, Error, UpdatePlaceParams, unknown>({
    mutationFn: updatePlace,
    onSuccess: () => {
      // Invalidate and refetch places queries
      queryClient.invalidateQueries({ queryKey: ["places"] });
      queryClient.invalidateQueries({ queryKey: ["places", "approved"] });
      queryClient.invalidateQueries({ queryKey: ["places", "user"] });
    },
  });
}; 