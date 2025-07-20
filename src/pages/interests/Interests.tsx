import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const MOVIE_COVERS_PATH = "movie_covers/";

  // Separar ficciones likeadas de las no likeadas  
  const likedFictionsData = fictions?.filter((fiction: FictionResponse) =>
    likedFictions.has(fiction.id)
  ) || [];

  // TODAS las ficciones aparecen abajo (likeadas y no likeadas)
  // Filtrar TODAS las ficciones basándose en el término de búsqueda
  const filteredAllFictions = fictions?.filter((fiction: FictionResponse) =>
    fiction.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Interests
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your fiction preferences to personalize your experience
          </p>
        </div>

        {/* Your Interests Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Your Interests ({likedFictionsData.length})
          </h2>
          
          {likedFictionsData.length > 0 ? (
            <div className="relative h-48 mb-6 w-full max-w-2xl">
              {likedFictionsData.map((fiction: FictionResponse, index: number) => {
                const maxVisible = 8; // Más cards para ocupar más espacio
                const shouldShow = index < maxVisible;
                
                // Mayor expansión horizontal ajustada para cartas más grandes
                const horizontalOffset = Math.min(index, maxVisible - 1) * 40; // Ajustado para cartas más grandes
                const verticalOffset = (index * 8) % 25; // Mayor variación vertical
                const zIndex = maxVisible - Math.min(index, maxVisible - 1);
                
                // Rotaciones más variadas para más cards
                const rotations = [-15, -8, -3, 2, 7, -10, 4, 12]; // Array de rotaciones para 8 cards
                const rotation = rotations[index % rotations.length];
                
                return shouldShow ? (
                  <div
                    key={fiction.id}
                    className="absolute w-24 h-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden hover:scale-110 hover:rotate-0 transition-all duration-300 border-2 border-white dark:border-gray-600"
                    style={{
                      left: `${horizontalOffset}px`,
                      top: `${verticalOffset}px`,
                      zIndex: zIndex,
                      transform: `rotate(${rotation}deg)`
                    }}
                    title={fiction.name}
                  >
                    <div className="relative w-full h-full bg-gray-200 dark:bg-gray-700">
                      <FictionCardImage 
                        imgUrl={MOVIE_COVERS_PATH + fiction.imgUrl} 
                        fictionName={fiction.name}
                      />
                      {/* Heart icon overlay */}
                      <div className="absolute top-1.5 right-1.5 bg-black/70 rounded-full p-1">
                        <HeartIconSolid className="h-3.5 w-3.5 text-red-500" />
                      </div>
                      {/* Indicator if there are more */}
                      {index === maxVisible - 1 && likedFictionsData.length > maxVisible && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <span className="text-white text-sm font-bold">
                            +{likedFictionsData.length - maxVisible}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <div className="text-center py-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 h-48 flex flex-col justify-center">
              <HeartIcon className="mx-auto h-10 w-10 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No interests yet
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Start exploring fictions below to add them to your interests.
              </p>
            </div>
          )}
        </div>

        {/* Find New Interests Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Find New Interests
          </h2>
          
          {/* Search Bar */}
          <div className="mb-6 space-y-3">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search fictions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-800 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            
            {/* Results counter */}
            {!loadingFictions && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? `Showing ${filteredAllFictions.length} of ${fictions?.length || 0} fictions`
                  : `${fictions?.length || 0} fictions to explore`
                }
              </p>
            )}
          </div>

          {/* Grid of fictions to discover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredAllFictions.map((fiction: FictionResponse) => {
              const isProcessing = processingLikes.has(fiction.id);
              // Ahora pueden mostrar corazón lleno o vacío según el estado
              const isLiked = likedFictions.has(fiction.id);
              
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

          {filteredAllFictions.length === 0 && !loadingFictions && (
            <div className="text-center py-12">
              <HeartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                {searchTerm ? `No fictions found for "${searchTerm}"` : "No fictions available"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchTerm ? "Try a different search term." : "Check back later for new content."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 