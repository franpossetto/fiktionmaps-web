// useAddPlace.ts
import { useMutation } from "@tanstack/react-query";
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
    return useMutation({ mutationFn: addPlaceToFiction });
  };