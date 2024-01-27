import { axiosWithToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import { Fiction } from "../types/Fiction";
import { Place } from "../types/Place";
import { Scene } from "../types/Scene";

export const useFictionService = () => {
  const getFictionsByCity = (cityId: number): useAxiosResponse<Fiction[]> => {
    return useAxios({
      url: `/fictions/cities/${cityId}`,
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  const getFictions = (): useAxiosResponse<any> => {
    return useAxios({ url: "/fictions", config: { method: "get" } });
  };

  const createFiction = (fiction: any) => {
    return axiosWithToken.post("/fictions", fiction);
  };

  const getFictionById = (fictionId: number): useAxiosResponse<any> => {
    return useAxios({
      url: `/fictions/${fictionId}`,
      config: { method: "get" },
    });
  };

  const deleteFiction = (fictionId: any) => {
    return axiosWithToken.delete(`/fictions/${fictionId}`);
  };

  const getScenes = (): useAxiosResponse<any> => {
    return useAxios({ url: "/scenes", config: { method: "get" } });
  };

  const getPlaces = (): useAxiosResponse<any> => {
    return useAxios({
      tokenRequired: true,
      url: "/places",
      config: { method: "get" },
    });
  };

  const getPlacesByUser = (): useAxiosResponse<any> => {
    return useAxios({
      tokenRequired: true,
      url: "/places/user",
      config: { method: "get" },
    });
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

  const updatePlaceFromFiction = (placeId: any, place: Place) => {
    return axiosWithToken.put(`/places/${placeId}`, place);
  };

  const approvePlace = (placeId: number, cityId: number) => {
    return axiosWithToken.put(`/places/${placeId}/approve?cityId=${cityId}`);
  };

  return {
    getFictionsByCity,
    getFictions,
    createFiction,
    getFictionById,
    deleteFiction,
    getScenes,
    getPlaces,
    getPlacesByUser,
    getTotals,
    addSceneToFiction,
    addPlaceToFiction,
    deletePlaceFromFiction,
    updatePlaceFromFiction,
    approvePlace,
  };
};
