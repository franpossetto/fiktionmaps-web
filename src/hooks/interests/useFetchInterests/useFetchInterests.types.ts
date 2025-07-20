export interface InterestDTO {
  id?: number;
  userId: number;
  fictionId: number;
  createdAt?: string;
}

export interface UseFetchInterestsReturn {
  data: InterestDTO[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} 