import axios from 'axios';
import { UserDTO } from './dto/UserDTO';
import {axiosWithToken, axiosWithoutToken} from '../config/axios';
import { auth } from '../config/firebase';

export class UserService {
    baseUrl: string = 'http://localhost:8080/api/v1';

    async create(data: UserDTO): Promise<any> {
        try {
            const response = await axiosWithoutToken.post(`${this.baseUrl}/users`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<any> {
        try {
            const response = await axiosWithToken.get(`/users`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(): Promise<any> {
        try {
            const uid = auth.currentUser?.uid;
            const response = await axiosWithToken.get(`/users/${uid}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}