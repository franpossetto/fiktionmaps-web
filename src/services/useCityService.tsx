import { useState } from "react";
import { axiosWithToken, axiosWithoutToken } from "../config/axios";
import { useAxios, useAxiosResponse } from "../config/useAxios";
import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  RawAxiosRequestConfig,
} from "axios";
export const useCityService = () => {
  const getCities = (): useAxiosResponse<any> => {
    return useAxios({
      url: `/cities`,
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  const getCityById = (cityId?: number): useAxiosResponse<any> => {
    return useAxios({
      url: `/cities/${cityId || 1}`,
      config: { method: "get" },
      tokenRequired: false,
    });
  };

  const deleteCity = (cityId: number) => {
    return axiosWithToken.delete(`/cities/${cityId}`);
  };

  const getCities2 = (): Promise<AxiosResponse<any>> => {
    let axiosInstance: AxiosInstance = axiosWithoutToken;
    return axiosInstance.get(`/cities`);
  };

  const getCityById2 = (cityId?: number): Promise<AxiosResponse<any>> => {
    let axiosInstance: AxiosInstance = axiosWithoutToken;
    return axiosInstance.get(`/cities/${cityId || 1}`);
  };

  return {
    getCities,
    getCityById,
    deleteCity,
    getCities2,
    getCityById2,
  };
};
