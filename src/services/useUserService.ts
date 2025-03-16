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

      // Asegúrate de que el rol esté incluido en el objeto de respuesta
    return {
      ...response.data,
      role: response.data.role || UserRole.USER, // Asignar un rol por defecto si no está presente
    };
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        const user: UserDTO = {
          name: "",
          email: auth.currentUser?.email || "",
          externalUserId: auth.currentUser?.uid,
          role: UserRole.USER,
        };

        await createUser(user); // Esperar la creación del usuario para manejar promesas correctamente
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
