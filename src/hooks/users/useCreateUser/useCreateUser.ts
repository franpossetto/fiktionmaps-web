import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosWithoutToken } from "../../../config/axios";
import { UserDTO } from "../../../types/dto/UserDTO";
import { UseCreateUserReturn } from "./useCreateUser.types";

const createUserMutation = async (user: UserDTO) => {
  await axiosWithoutToken.post("/users", user);
};

export const useCreateUser = (): UseCreateUserReturn => {
  const queryClient = useQueryClient();
  
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createUserMutation,
    onSuccess: () => {
      // Invalidate current user query
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  return {
    createUser: mutateAsync,
    isPending,
    error: error as Error | null,
  };
}; 