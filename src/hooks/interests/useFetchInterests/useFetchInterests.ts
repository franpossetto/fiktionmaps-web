import { useQuery } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { InterestDTO, UseFetchInterestsReturn } from "./useFetchInterests.types";

const fetchMyInterests = async (): Promise<InterestDTO[]> => {
  try {
    const response = await axiosWithToken.get("/interests/fictions");
    return response.data as InterestDTO[];
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
};

export const useFetchInterests = (): UseFetchInterestsReturn => {
  const queryKey = ["interests", "myInterests"];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: fetchMyInterests,
  });

  return { 
    data, 
    isLoading, 
    error: error as Error | null, 
    refetch: async () => {
      await refetch();
    }
  };
}; 