import { useAxios, useAxiosResponse } from "../config/useAxios";

export const useCityService = () => {
  const getCities = (): useAxiosResponse<any> => {
    return useAxios({
      url: `/cities`,
      config: { method: "get" },
    });

  };
  
  const getCityById = (cityId: number): useAxiosResponse<any> => {
    return useAxios({
      url: `/cities/${cityId}`,
      config: { method: "get" },
    });
  };
  

  return {
    getCities,
    getCityById
  };
};
