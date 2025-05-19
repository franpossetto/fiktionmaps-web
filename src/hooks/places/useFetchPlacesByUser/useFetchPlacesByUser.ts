import { useQuery } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import {
  PlacesByUserRequestDTO,
  PlacesByUserResponseDTO,
} from "./useFetchPlacesByUser.types";

const fetchPlacesByUser = async (
  params: PlacesByUserRequestDTO
): Promise<PlacesByUserResponseDTO> => {
  const { data } = await axiosWithToken.get<PlacesByUserResponseDTO>(
    `/places/user?page=${params.page}&size=${params.size}`
  );
  return {
    ...data,
    currentPage: data.number + 1,
  };
};

export const useFetchPlacesByUser = (params: PlacesByUserRequestDTO) => {
  return useQuery({
    queryKey: ["places", "user", params],
    queryFn: () => fetchPlacesByUser(params),
  });
};
