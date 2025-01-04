import { useQuery } from '@tanstack/react-query';
import { axiosWithoutToken } from '../../config/axios';

const fetchFictionsByCity = async (cityId: any) => {
  try {
    const response = await axiosWithoutToken.get(`/fictions/cities/${cityId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching fictions by city:', error);
    throw error;
  }
};

export const useFictionsByCity = (cityId: any) => {
  const queryKey = ['fetchFictionsByCity', cityId];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchFictionsByCity(cityId),
    enabled: !!cityId,
  });

  return { data, isLoading, error, refetch };
};
