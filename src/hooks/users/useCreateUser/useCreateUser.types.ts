import { UserDTO } from "../../../types/dto/UserDTO";

export interface UseCreateUserReturn {
  createUser: (user: UserDTO) => Promise<void>;
  isPending: boolean;
  error: Error | null;
} 