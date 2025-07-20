import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { AddInterestParams } from "./useAddInterest.types";

const addInterestToFiction = async ({ fictionId }: AddInterestParams): Promise<any> => {
  try {
    const response = await axiosWithToken.post(`/interests/fictions/${fictionId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding interest:", error);
    throw error;
  }
};

export const useAddInterest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addInterestToFiction,
    onSuccess: () => {
      // Invalidate interests queries
      queryClient.invalidateQueries({ queryKey: ["interests"] });
    },
  });
}; 