import { useMutation } from "@tanstack/react-query";
import { axiosWithToken } from "../../../config/axios";
import { UserDTO } from "../../../types/dto/UserDTO";
import { UseUpdateUserReturn } from "./useUpdateUser.types";

const updateUserMutation = async (user: UserDTO) => {
  await axiosWithToken.put(`/users/${user.id}`, user);
};

export const useUpdateUser = (): UseUpdateUserReturn => {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateUserMutation,
  });

  return {
    updateUser: mutateAsync,
    isPending,
    error: error as Error | null,
  };
}; 