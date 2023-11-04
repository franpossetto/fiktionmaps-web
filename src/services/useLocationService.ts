import { axiosWithToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";

export const useLocationService = () => {
  const getLocations = (): useAxiosResponse<any> => {
    return useAxios({
      url: `/locations`,
      config: { method: "get" },
    });

  };
  
  return {
    getLocations
  };
};
