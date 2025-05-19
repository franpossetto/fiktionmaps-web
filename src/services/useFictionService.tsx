import { axiosWithToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import { Fiction } from "../types/Fiction";
import { Place } from "../types/Place";
import { Scene } from "../types/Scene";

export const useFictionService = () => {

  const getFictions = (): useAxiosResponse<any> => {
    return useAxios({
      url: "/fictions",
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  const getPlaces = (
    published?: boolean,
    page?: number,
    size?: number
  ): useAxiosResponse<any> => {
    let url = "/places";
    if (published !== undefined) {
      url += `?approved=${published}`;
    }

    url += `&page=${page}&size=${size}`;

    return useAxios({
      tokenRequired: false,
      url: url,
      config: { method: "get" },
    });
  };

  const getPlacesByUser = (
    page?: number,
    size?: number
  ): useAxiosResponse<any> => {
    return useAxios({
      tokenRequired: true,
      url: `places/user?page=${page}&size=${size}`,
      config: { method: "get" },
    });
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
    getFictions,
    getPlaces,
    getPlacesByUser,
    addPlaceToFiction,
    deletePlaceFromFiction,
    updatePlaceFromFiction,
    approvePlace,
  };
};
