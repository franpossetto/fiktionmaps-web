import { axiosWithToken, axiosWithoutToken } from "../config/axios";
import { auth } from "../config/firebase";
import { UserDTO, UserRole } from "../types/dto/UserDTO";

export class UserService {
  baseUrl: string = import.meta.env.VITE_BASE_URL + "/api/v1";

  async create(data: UserDTO): Promise<any> {
    try {
      const response = await axiosWithoutToken.post(
        `${this.baseUrl}/users`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async update(data: UserDTO): Promise<any> {
    try {
      const response = await axiosWithToken.put(
        `${this.baseUrl}/users/${data.id}`,
        data
      );
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
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        const user: UserDTO = {
          name: "",
          email: auth.currentUser?.email || "",
          externalUserId: auth.currentUser?.uid,
          role: UserRole.USER,
        };
        this.create(user);
      }
      throw error;
    }
  }
}
