import { useQuery } from "@tanstack/react-query";
import { Fiction } from "../../../types/Fiction";
import { axiosWithToken } from "../../../config/axios";
import { FictionResponse } from "./useFetchFictions.types";

const fetchFictions = async (): Promise<FictionResponse[]> => {
  try {
    const response = await axiosWithToken.get("/fictions");
    return response.data as FictionResponse[];
  } catch (error) {
    console.error("Error fetching fictions:", error);
    throw error;
  }
};

export const useFetchFictions = () => {
  const queryKey = ["fetchFictions"];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: fetchFictions,
  });

  return { data, isLoading, error, refetch };
};
