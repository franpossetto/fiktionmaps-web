import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useFetchFictions } from "../../hooks/fictions/useFetchFictions/useFetchFictions";
import { FictionResponse } from "../../hooks/fictions/useFetchFictions/useFetchFictions.types";
import { useFetchInterests, useAddInterest, useRemoveInterest } from "../../hooks/interests";
import { InterestDTO } from "../../hooks/interests/useFetchInterests/useFetchInterests.types";
import { FictionCardImage } from "./components/FictionCard";

export const Interests = () => {
  const { data: fictions, isLoading: loadingFictions, error: fictionsError } = useFetchFictions();
  const { data: interests, isLoading: loadingInterests, error: interestsError, refetch: refetchInterests } = useFetchInterests();
  const addInterestMutation = useAddInterest();
  const removeInterestMutation = useRemoveInterest();
  
  const [likedFictions, setLikedFictions] = useState<Set<number>>(new Set());
  const [processingLikes, setProcessingLikes] = useState<Set<number>>(new Set());
  
  const MOVIE_COVERS_PATH = "movie_covers/";

  // Cargar interests del usuario al montar el componente
  useEffect(() => {
    if (interests) {
      const likedIds = new Set(interests.map((interest: InterestDTO) => interest.fictionId));
      setLikedFictions(likedIds);
    }
  }, [interests]);

  const handleLike = async (fictionId: number) => {
    // Evitar clicks múltiples
    if (processingLikes.has(fictionId)) return;
    
    setProcessingLikes(prev => new Set(prev).add(fictionId));
    
    try {
      const isCurrentlyLiked = likedFictions.has(fictionId);
      
      if (isCurrentlyLiked) {
        // Remover like
        await removeInterestMutation.mutateAsync({ fictionId });
        setLikedFictions(prev => {
          const newSet = new Set(prev);
          newSet.delete(fictionId);
          return newSet;
        });
      } else {
        // Agregar like
        await addInterestMutation.mutateAsync({ fictionId });
        setLikedFictions(prev => new Set(prev).add(fictionId));
      }
      
      // Refrescar datos del servidor
      await refetchInterests();
    } catch (error) {
      console.error('Error updating interest:', error);
    } finally {
      setProcessingLikes(prev => {
        const newSet = new Set(prev);
        newSet.delete(fictionId);
        return newSet;
      });
    }
  };



  if (loadingFictions || loadingInterests) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading interests...</div>
      </div>
    );
  }

  if (fictionsError || interestsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading data</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 lg:pl-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Interests
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Like the fictions that interest you to personalize your experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {fictions?.map((fiction: FictionResponse) => {
            const isLiked = likedFictions.has(fiction.id);
            const isProcessing = processingLikes.has(fiction.id);
            
            return (
              <div
                key={fiction.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <FictionCardImage 
                    imgUrl={MOVIE_COVERS_PATH + fiction.imgUrl} 
                    fictionName={fiction.name}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">
                    {fiction.name}
                  </h3>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                    {fiction.overview}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {fiction.year}
                    </span>
                    
                    <button
                      onClick={() => handleLike(fiction.id)}
                      disabled={isProcessing}
                      className={`p-2 rounded-full transition-colors duration-200 ${
                        isProcessing 
                          ? 'text-gray-300 cursor-not-allowed' 
                          : isLiked
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      {isProcessing ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-red-500"></div>
                      ) : isLiked ? (
                        <HeartIconSolid className="h-6 w-6" />
                      ) : (
                        <HeartIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {fictions?.length === 0 && (
          <div className="text-center py-12">
            <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              No fictions available
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Check back later for new content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 