import { useQuery } from '@tanstack/react-query';
import { axiosWithoutToken } from '../../../config/axios';
import { FictionByCoordinatesResponse, UseFictionsByCoordinatesRequest } from './useFetchFictionsByCoordinates.types';
import expandCoords from '@/helpers/expandCoords';

const fetchFictionsByCoordinates = async (params:UseFictionsByCoordinatesRequest ): Promise<FictionByCoordinatesResponse[]> => {
    const adjustedParams = expandCoords(params);

    try {
    const response = await axiosWithoutToken.get(`/fictions/map`, {
      params: {
      upperLat: adjustedParams.upperLat,
      lowerLat: adjustedParams.lowerLat,
      rightLng: adjustedParams.rightLng,
      leftLng: adjustedParams.leftLng,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fictions by coordinates:', error);
    throw error;
  }
};

export const useFictionsByCoordinates = (params: UseFictionsByCoordinatesRequest) => {
  const queryKey = ['fetchFictionsByCoordinates', params];
  const { data, error, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: () => fetchFictionsByCoordinates(params),
    enabled: !!params && !!params.upperLat && !!params.lowerLat && !!params.rightLng && !!params.leftLng,
  });

  console.log(data)

  return { data, isLoading, error, refetch };
};