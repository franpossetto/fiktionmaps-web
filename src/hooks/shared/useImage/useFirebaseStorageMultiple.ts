import { getDownloadURL, ref } from 'firebase/storage';
import { useQueries } from '@tanstack/react-query';
import { storage } from '@/config/firebase';

const fetchDownloadUrl = async (path: string | null) => {
  if (!path) return null;
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
};

/**
 * Fetches and caches public download URLs from Firebase Storage paths using react-query.
 */
export const useFirebaseStorageMultiple = (paths: (string | null)[]) => {
  const results = useQueries({
    queries: paths.map((path) => ({
      queryKey: ['firebase-storage-url', 'multiple', path],
      queryFn: () => fetchDownloadUrl(path),
      enabled: !!path,
      staleTime: 1000 * 60 * 60,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: (count: number, error: unknown) =>
        error instanceof Error && error.message.includes('not found') ? false : count < 2,
      retryDelay: (i: number) => Math.min(1000 * 2 ** i, 30000),
    })),
  });

  const urls = results.map(r => r.data || null);
  const loading = results.some(r => r.isLoading);
  const errors = results.map(r => r.error as Error | null);  
  const totalImages = paths.filter(path => path !== null).length;
  const loadedImages = urls.filter(url => url !== null).length;
  const progress = totalImages > 0 ? (loadedImages / totalImages) * 100 : 0;

  return { urls, loading, errors, progress, loadedImages, totalImages };
};
