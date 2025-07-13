// useAddPlace.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { AddPlaceParams } from "./useAddPlace.types";

const addPlaceToFiction = async ({
  fictionId,
  place,
}: AddPlaceParams): Promise<any> => {
  const url = `/fictions/${fictionId}/places`;
  try {
    const response = await axiosWithToken.post(url, place);
    return response.data;
  } catch (error) {
    console.error("Error adding place to fiction:", error);
    throw error;
  }
};


export const useAddPlaceMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({ 
      mutationFn: addPlaceToFiction,
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