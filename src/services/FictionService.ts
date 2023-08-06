import _axios from '../config/axios';

export class FictionService {

    async getFictionsByCity(fictionId: number): Promise<any> {
        try {
            const response = await _axios.get(`/fictions?cityId=${fictionId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    
}