import { UserDTO } from "../../../types/dto/UserDTO";

export interface UseUpdateUserReturn {
  updateUser: (user: UserDTO) => Promise<void>;
  isPending: boolean;
  error: Error | null;
} 