import { useQuery } from '@tanstack/react-query';
import { axiosWithoutToken } from "../../../config/axios";

const fetchCities = async () => {
    try {
        const response = await axiosWithoutToken.get('/cities');
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

export const useFetchCities = () => {
    const queryKey = ['cities', 'all'];
    const { data, error, isLoading } = useQuery({
        queryKey,
        queryFn: fetchCities,
    });

    return { data, isLoading, error };
}