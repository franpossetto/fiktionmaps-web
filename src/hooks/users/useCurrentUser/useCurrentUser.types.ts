import { UserDTO, UserRole } from "../../../types/dto/UserDTO";

export interface CurrentUserResponse extends UserDTO {
  role: UserRole;
}

export interface UseCurrentUserReturn {
  data: CurrentUserResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} 