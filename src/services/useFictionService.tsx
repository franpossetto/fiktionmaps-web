import { axiosWithToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import { Place } from "../types/Place";
import { Scene } from "../types/Scene";

export const useFictionService = () => {
  const getFictionsByCity = (cityId: number): useAxiosResponse<any> => {
    return useAxios({
      url: `/fictions/${cityId}`,
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
    return useAxios({ url: "/scenes", config: { method: "get" } });
  };

  const getPlaces = (): useAxiosResponse<any> => {
    return useAxios({ url: "/places", config: { method: "get" } });
  };

  const getTotals = (): useAxiosResponse<any> => {
    return useAxios({ url: "/fictions/totals", config: { method: "get" } });
  };

  const addSceneToFiction = (fictionId: any, scene: Scene) => {
    return axiosWithToken.post(`/fictions/${fictionId}/scenes`, scene);
  };

  const addPlaceToFiction = (fictionId: any, place: Place) => {
    return axiosWithToken.post(`/fictions/${fictionId}/places`, place);
  };

  const deletePlaceFromFiction = (placeId: any) => {
    return axiosWithToken.delete(`/places/${placeId}`);
  };

  return {
    getFictionsByCity,
    getFictions,
    createFiction,
    deleteFiction,
    getScenes,
    getPlaces,
    getTotals,
    addSceneToFiction,
    addPlaceToFiction,
    deletePlaceFromFiction,
  };
};
