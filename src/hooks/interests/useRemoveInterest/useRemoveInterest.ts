import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { RemoveInterestParams } from "./useRemoveInterest.types";

const removeInterestFromFiction = async ({ fictionId }: RemoveInterestParams): Promise<void> => {
  try {
    await axiosWithToken.delete(`/interests/fictions/${fictionId}`);
  } catch (error) {
    console.error("Error removing interest:", error);
    throw error;
  }
};

export const useRemoveInterest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, RemoveInterestParams, unknown>({
    mutationFn: removeInterestFromFiction,
    onSuccess: () => {
      // Invalidate interests queries
      queryClient.invalidateQueries({ queryKey: ["interests"] });
    },
  });
}; 