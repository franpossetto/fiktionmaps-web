import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { Place } from "../../../types/Place";

interface ApprovePlaceParams {
  placeId: number;
  cityId: number;
}

const approvePlace = async ({ placeId, cityId }: ApprovePlaceParams) => {
  const response = await axiosWithToken.put(`/places/${placeId}/approve?cityId=${cityId}`);
  return response.data;
};

export const useApprovePlace = () => {
  const queryClient = useQueryClient();

  return useMutation<Place, Error, ApprovePlaceParams>({
    mutationFn: approvePlace,
    onSuccess: () => {
      // Invalidate and refetch places queries
      queryClient.invalidateQueries({ queryKey: ["places"] });
      queryClient.invalidateQueries({ queryKey: ["places", "approved"] });
      queryClient.invalidateQueries({ queryKey: ["places", "user"] });
    },
  });
}; 