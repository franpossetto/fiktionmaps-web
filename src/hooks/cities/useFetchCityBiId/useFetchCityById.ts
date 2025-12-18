import { useQuery } from '@tanstack/react-query';
import { axiosWithoutToken } from '../../../config/axios';

const fetchCityById = async (cityId = 1) => {
  const { data } = await axiosWithoutToken.get(`/cities/${cityId}`);
  return data;
};

export const useFetchCityById = (cityId = 1) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['city', cityId],
    queryFn: () => fetchCityById(cityId),
    enabled: Boolean(cityId),
  });

  return { data, error, isLoading, refetch };
};
