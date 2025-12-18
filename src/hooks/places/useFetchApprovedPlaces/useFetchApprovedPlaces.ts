import { useQuery } from "@tanstack/react-query";
import { axiosWithoutToken } from "../../../config/axios";
import {
  ApprovedPlacesRequestDTO,
  ApprovedPlacesResponseDTO,
} from "./useFetchApprovedPlaces.types";

const fetchApprovedPlaces = async (
  params: ApprovedPlacesRequestDTO
): Promise<ApprovedPlacesResponseDTO> => {
  const { data } = await axiosWithoutToken.get<ApprovedPlacesResponseDTO>(
    `/places?approved=${params.approved}&page=${params.page}&size=${params.size}`
  );
  return {
    ...data,
    currentPage: data.number + 1,
  };
};

export const useFetchApprovedPlaces = (params: ApprovedPlacesRequestDTO) => {
  return useQuery({
    queryKey: ["places", "approved", params],
    queryFn: () => fetchApprovedPlaces(params),
  });
};
