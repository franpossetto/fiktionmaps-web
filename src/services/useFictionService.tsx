import { axiosWithToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";

export const useFictionService = () => {
  
  const getFictionsByCity = (cityId: number): useAxiosResponse<any> => {
    return useAxios({
      url: `/fictions?cityId=${cityId}`,
      config: { method: "get" },
    });
  };

  const getFictions = (): useAxiosResponse<any> => {
    return useAxios({ url: "/fictions", config: { method: "get" } });
  };

  const createFiction = (fiction: any) => {
    return axiosWithToken.post("/fictions", fiction);
  };

  const deleteFiction = (fictionId: any) => {
    return axiosWithToken.delete(`/fictions/${fictionId}`);
  };

  const getScenes = (): useAxiosResponse<any> => {
    return useAxios({ url: "/fictions/scenes", config: { method: "get" } });
  };

  const getTotals = (): useAxiosResponse<any> => {
    return useAxios({ url: "/fictions/totals", config: { method: "get" } });
  };

  return {
    getFictionsByCity,
    getFictions,
    createFiction,
    deleteFiction,
    getScenes,
    getTotals,
  };
};
