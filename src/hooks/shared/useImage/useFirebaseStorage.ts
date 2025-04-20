import { getDownloadURL, ref } from 'firebase/storage';
import { useQuery } from '@tanstack/react-query';
import { storage } from '@/config/firebase';

const fetchDownloadUrl = async (path: string | null) => {
  if (!path) return null;
  const imageRef = ref(storage, path);
  return await getDownloadURL(imageRef);
};

/**
 * Fetches and caches a public download URL from a Firebase Storage path using react-query.
 */
export const useFirebaseStorage = (path: string | null) => {
  const { data: url, isLoading, error } = useQuery({
    queryKey: ['firebase-storage-url', path],
    queryFn: () => fetchDownloadUrl(path),
    enabled: !!path,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    retry: (count: number, error: unknown) =>
      error instanceof Error && error.message.includes('not found') ? false : count < 2,
    retryDelay: (i: number) => Math.min(1000 * 2 ** i, 30000),
  });

  return { url, isLoading, error };
};
