import { useQuery } from '@tanstack/react-query';
import { axiosWithoutToken } from '../../../config/axios';
import { FictionByCityResponse } from './useFetchFictionsByCity.types';

const GetFictionsByCoordinates = async (places: any): Promise<FictionByCityResponse[]> => {
  try {
    const response = await axiosWithoutToken.get(`/fictions/map`, {
      params: {  // 👈 Agregar aquí
        upperLat: places.upperLat,
        lowerLat: places.lowerLat,
        rightLng: places.rightLng,
        leftLng: places.leftLng,
        fictionId: places.fictionId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fictions by city:', error);
    throw error;
  }
};

export const useFictionsByCity = (place: number = 1) => {
  console.log('useFictionsByCity', place);
  const queryKey = ['GetFictionsByCoordinates', place];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => GetFictionsByCoordinates(place),
    enabled: !!place,
  });

  return { data, isLoading, error, refetch };
};
