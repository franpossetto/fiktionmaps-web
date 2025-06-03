import { useCallback, useRef, useState, useEffect } from 'react';
import { PlaceCoordinatesResponseDTO } from '@/hooks/places/useFetchPlaces/useFetchPlaces.types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useMapController } from '@/contexts/MapContext';
import { useMap } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaceCarouselProps {
    places: PlaceCoordinatesResponseDTO[];
    imageUrls: (string | null)[];
}

export const PlaceCarousel = ({ places, imageUrls }: PlaceCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const map = useMap('map-view');
    const { setMapZoom } = useMapController();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Mostrar el carrusel inmediatamente
        setIsVisible(true);
    }, []);

    const scrollToPlace = useCallback((index: number) => {
        if (!carouselRef.current) return;
        
        const itemWidth = 70; // Ancho aproximado de cada item (60px + 10px de gap)
        const containerWidth = carouselRef.current.offsetWidth;
        const itemsVisible = Math.min(6, places.length);
        const scrollPosition = Math.max(0, (index * itemWidth) - (containerWidth / 2) + (itemWidth / 2));
        
        carouselRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        setCurrentIndex(index);
    }, [places.length]);

    const handlePrevious = useCallback(() => {
        if (currentIndex === null) return;
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            scrollToPlace(newIndex);
            
            // Centrar el mapa en el lugar seleccionado
            const place = places[newIndex];
            if (map && place) {
                const position = {
                    lat: place.latitude ?? 0,
                    lng: place.longitude ?? 0
                };
                map.panTo(position);
            }
        }
    }, [currentIndex, scrollToPlace, places, map]);

    const handleNext = useCallback(() => {
        if (currentIndex === null) return;
        if (currentIndex < places.length - 1) {
            const newIndex = currentIndex + 1;
            scrollToPlace(newIndex);
            
            // Centrar el mapa en el lugar seleccionado
            const place = places[newIndex];
            if (map && place) {
                const position = {
                    lat: place.latitude ?? 0,
                    lng: place.longitude ?? 0
                };
                map.panTo(position);
            }
        }
    }, [currentIndex, places.length, scrollToPlace, places, map]);

    const handlePlaceClick = useCallback((place: PlaceCoordinatesResponseDTO, index: number) => {
        if (!map) return;
        
        const position = {
            lat: place.latitude ?? 0,
            lng: place.longitude ?? 0
        };
        
        map.panTo(position);
        scrollToPlace(index);
    }, [map, scrollToPlace]);

    // Ajustar el scroll cuando cambia el índice actual
    useEffect(() => {
        if (currentIndex !== null) {
            scrollToPlace(currentIndex);
        }
    }, [currentIndex, scrollToPlace]);

    // Manejar las teclas de flecha y enter
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Solo manejar las teclas si el carrusel está visible
            if (!places?.length || places.length < 2) return;

            // Prevenir el comportamiento predeterminado de la barra espaciadora
            if (event.code === 'Space') {
                event.preventDefault();
                return;
            }

            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault(); // Prevenir el scroll de la página
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    event.preventDefault(); // Prevenir el scroll de la página
                    handleNext();
                    break;
                case 'Enter':
                    event.preventDefault();
                    // Simular click en el marcador actual
                    if (currentIndex !== null) {
                        const currentPlace = places[currentIndex];
                        if (currentPlace?.placeId) {
                            // Disparar un evento de click en el marcador
                            const markerElement = document.querySelector(`[title="${currentPlace.placeId}"]`);
                            if (markerElement) {
                                markerElement.dispatchEvent(new MouseEvent('click', {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window
                                }));
                            }
                        }
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrevious, handleNext, places, currentIndex]);

    if (!places?.length || places.length < 2) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-4 left-24 z-50 bg-white/80 dark:bg-black/60 rounded-lg shadow-lg p-2 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-2">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={handlePrevious}
                            disabled={currentIndex === null || currentIndex === 0}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-50"
                        >
                            <ChevronLeftIcon className="w-4 h-4 text-gray-700 dark:text-white" />
                        </motion.button>
                        
                        <div 
                            ref={carouselRef}
                            className={`flex gap-2 overflow-x-hidden ${
                                places.length <= 6 
                                    ? `w-[calc(70px*${places.length})]` 
                                    : 'w-[calc(70px*6)]'
                            }`}
                        >
                            {places.map((place, index) => (
                                <motion.div
                                    key={place.placeId}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ 
                                        delay: index * 0.05,
                                        duration: 0.2
                                    }}
                                    onClick={() => handlePlaceClick(place, index)}
                                    className={`flex-shrink-0 w-[60px] h-[60px] rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                                        currentIndex === index 
                                            ? 'ring-2 ring-blue-500' 
                                            : ''
                                    }`}
                                >
                                    <img
                                        src={imageUrls[index] ?? "/not_found_images/404_not_found_tokio.png"}
                                        alt={`Place ${index + 1}`}
                                        className={`w-full h-full object-cover rounded-lg transition-opacity duration-200 ${
                                            currentIndex === index 
                                                ? 'opacity-100' 
                                                : 'opacity-40 hover:opacity-60'
                                        }`}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleNext}
                            disabled={currentIndex === null || currentIndex === places.length - 1}
                            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 disabled:opacity-50"
                        >
                            <ChevronRightIcon className="w-4 h-4 text-gray-700 dark:text-white" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}; 