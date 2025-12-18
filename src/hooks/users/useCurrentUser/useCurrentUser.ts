import { useQuery } from "@tanstack/react-query";
import { auth } from "../../../config/firebase";
import { axiosWithToken, axiosWithoutToken } from "../../../config/axios";
import { UserDTO, UserRole } from "../../../types/dto/UserDTO";
import { CurrentUserResponse, UseCurrentUserReturn } from "./useCurrentUser.types";

const fetchCurrentUser = async (): Promise<CurrentUserResponse> => {
  try {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("No user is currently logged in");
    }

    const response = await axiosWithToken.get(`/users/${uid}`);
    return {
      ...response.data,
      role: response.data.role || UserRole.USER,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      const user: UserDTO = {
        name: "",
        email: auth.currentUser?.email || "",
        externalUserId: auth.currentUser?.uid,
        role: UserRole.USER,
      };

      await axiosWithoutToken.post("/users", user);
      return {
        ...user,
        role: UserRole.USER,
      };
    }
    throw error;
  }
};

export const useCurrentUser = (): UseCurrentUserReturn => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: !!auth.currentUser?.uid,
  });

  return {
    data,
    isLoading,
    error: error as Error | null,
    refetch: async () => {
      await refetch();
    },
  };
}; 