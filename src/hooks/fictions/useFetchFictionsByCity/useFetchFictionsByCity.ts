import { useQuery } from '@tanstack/react-query';
import { axiosWithoutToken } from '../../../config/axios';
import { FictionByCityResponse } from './useFetchFictionsByCity.types';

const fetchFictionsByCity = async (cityId: number): Promise<FictionByCityResponse[]> => {
  try {
    const response = await axiosWithoutToken.get(`/fictions/cities/${cityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fictions by city:', error);
    throw error;
  }
};

export const useFetchFictionsByCity = (cityId: number) => {
  const queryKey = ['fictions', 'byCity', cityId];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchFictionsByCity(cityId),
    enabled: !!cityId,
  });

  return { data, isLoading, error, refetch };
};
