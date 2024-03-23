import { axiosWithToken, axiosWithoutToken } from "../config/axios";
import { auth } from "../config/firebase";
import { UserDTO, UserRole } from "../types/dto/UserDTO";

export const useUserService = () => {
  const createUser = (user: UserDTO) => {
    return axiosWithoutToken.post("/users", user);
  };

  const updateUser = (data: UserDTO) => {
    return axiosWithToken.put(`/users/${data.id}`, data);
  };

  const getAllUsers = () => {
    return axiosWithToken.get(`/users`);
  };

  const getCurrentUser = async () => {
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

        createUser(user);
      }
      throw error;
    }
  };

  return {
    createUser,
    updateUser,
    getAllUsers,
    getCurrentUser,
  };
};
