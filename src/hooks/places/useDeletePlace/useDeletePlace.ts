import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";

interface DeletePlaceParams {
  placeId: number;
}

const deletePlace = async ({ placeId }: DeletePlaceParams) => {
  const response = await axiosWithToken.delete(`/places/${placeId}`);
  return response.data;
};

export const useDeletePlace = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeletePlaceParams, unknown>({
    mutationFn: deletePlace,
    onSuccess: () => {
      // Invalidate and refetch places queries
      queryClient.invalidateQueries({ queryKey: ["places"] });
      queryClient.invalidateQueries({ queryKey: ["places", "approved"] });
      queryClient.invalidateQueries({ queryKey: ["places", "user"] });
      queryClient.invalidateQueries({ queryKey: ["places", "byCoordinates"] });
      queryClient.invalidateQueries({ queryKey: ["places", "byId"] });
    },
  });
}; 