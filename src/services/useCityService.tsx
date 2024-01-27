import { axiosWithToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";

export const useCityService = () => {
  const getCities = (): useAxiosResponse<any> => {
    return useAxios({
      url: `/cities`,
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  const getCityById = (cityId: number): useAxiosResponse<any> => {
    return useAxios({
      url: `/cities/${cityId}`,
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  const deleteCity = (cityId: number) => {
    return axiosWithToken.delete(`/cities/${cityId}`);
  };

  return {
    getCities,
    getCityById,
    deleteCity,
  };
};
