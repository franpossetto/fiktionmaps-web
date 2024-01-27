import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  RawAxiosRequestConfig,
} from "axios";
import { useEffect, useState } from "react";
import { axiosWithToken, axiosWithoutToken } from "./axios";

interface UseAxiosProps<T> {
  tokenRequired?: boolean;
  url: string;
  config: RawAxiosRequestConfig<T>;
}

export interface useAxiosResponse<T> {
  loading: boolean;
  data: T | null;
  error: AxiosError | null;
  refetch: () => void;
}

export const useAxios = <T>({
  tokenRequired = true,
  url,
  config,
}: UseAxiosProps<T>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const refetch = () => {
    let axiosinstance: AxiosInstance = axiosWithToken;

    if (!tokenRequired) {
      axiosinstance = axiosWithoutToken;
    }

    axiosinstance(url, config)
      .then((response: AxiosResponse<T>) => {
        setData(response.data);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  return { loading, data, error, refetch };
};
