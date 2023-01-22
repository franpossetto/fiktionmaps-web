import axios from 'axios';

class Map2FictionService {
    // Define the base URL for the API
    baseUrl: string = 'http://localhost:8080';

    // Define a method for making a GET request
    async get(url: string): Promise<any> {
        try {
            const response = await axios.get(`${this.baseUrl}/${url}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Define a method for making a POST request
    async post(url: string, city: string): Promise<any> {
        try {
            const response = await axios.post(`${this.baseUrl}/${url}`, {name: city});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Define a method for making a PUT request
    async put(url: string, data: any): Promise<any> {
        try {
            const response = await axios.put(`${this.baseUrl}/${url}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Define a method for making a DELETE request
    async delete(url: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.baseUrl}/${url}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new Map2FictionService();
