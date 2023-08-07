import { useAxios, useAxiosResponse } from '../config/useAxios';

export const useFictionService = () => {

    const getFictionsByCity = (fictionId: number): useAxiosResponse<any> => {
        return useAxios({ url: `/fictions?cityId=${fictionId}`, config: { method: "get" } });
    }

    return {getFictionsByCity};
}