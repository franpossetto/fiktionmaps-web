import axios from 'axios';
import { UserDTO } from './dto/UserDTO';

export class UserService {
    baseUrl: string = 'http://localhost:8081/api/v1';

    async create(data: UserDTO): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/users`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}