import { useQuery } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { FictionResponse } from "./useFetchFictionById.types";

const fetchFictionById = async (id: number): Promise<FictionResponse> => {
  try {
    const response = await axiosWithToken.get(`/fictions/${id}`);
    return response.data as FictionResponse;
  } catch (error) {
    console.error("Error fetching fiction by id:", error);
    throw error;
  }
};

export const useFetchFictionById = (id: number) => {
  const queryKey = ["fictions", "byId", id];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchFictionById(Number(id)),
    enabled: !!id, // Solo se ejecuta si hay un ID
  });

  return { data, isLoading, error, refetch };
};
