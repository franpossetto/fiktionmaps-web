import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import { Cluster } from "@googlemaps/markerclusterer";
import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";
import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import { storage } from '@/config/firebase';
import { useEffect, useState, useRef } from "react";

interface MarkerWithData extends google.maps.marker.AdvancedMarkerElement {
  data?: PlaceCoordinatesResponseDTO;
}

export interface SquareClusterV2Props {
  imageUrl: string;
  places: PlaceCoordinatesResponseDTO[];
}

// Imágenes de prueba para testing
const TEST_IMAGES = [
  "https://picsum.photos/200/200?random=1",
  "https://picsum.photos/200/200?random=2",
  "https://picsum.photos/200/200?random=3",
  "https://picsum.photos/200/200?random=4"
];

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Si no hay imágenes, usamos un color gris
  const displayItems = images.length > 0 ? images : ["#E5E7EB"];

  useEffect(() => {
    // Solo iniciamos el carrusel si hay más de una imagen
    if (displayItems.length <= 1) return;

    const updateIndex = () => {
      setPrevIndex(currentIndex);
      const next = (currentIndex + 1) % displayItems.length;
      setCurrentIndex(next);
      setTimeout(() => setPrevIndex(null), 500);

      // Nuevo rango de 3-7 segundos
      const randomInterval = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
      timeoutRef.current = setTimeout(updateIndex, randomInterval);
    };

    // Inicial delay aleatorio para cada cluster
    const initialDelay = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
    timeoutRef.current = setTimeout(updateIndex, initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, displayItems.length]);

  const isImage = (item: string) => item.startsWith("http");

  return (
    <div className="w-full h-full overflow-hidden rounded-xl relative">
      {prevIndex !== null && (
        isImage(displayItems[prevIndex]) ? (
          <motion.img
            key={`prev-${prevIndex}`}
            src={displayItems[prevIndex]}
            alt="carousel"
            className="w-full h-full object-cover absolute rounded-xl"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            key={`prev-${prevIndex}`}
            className="w-full h-full absolute rounded-xl"
            initial={{ opacity: 1, backgroundColor: displayItems[prevIndex] }}
            animate={{ opacity: 0, backgroundColor: displayItems[prevIndex] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )
      )}
      {isImage(displayItems[currentIndex]) ? (
        <motion.img
          key={`current-${currentIndex}`}
          src={displayItems[currentIndex]}
          alt="carousel"
          className="w-full h-full object-cover absolute rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      ) : (
        <motion.div
          key={`current-${currentIndex}`}
          className="w-full h-full absolute rounded-xl"
          initial={{ opacity: 0, backgroundColor: displayItems[currentIndex] }}
          animate={{ opacity: 1, backgroundColor: displayItems[currentIndex] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export class SquareClusterV2 {
  props: SquareClusterV2Props;
  private previousCount: number = 0;

  constructor(props: SquareClusterV2Props) {
    this.props = props;
  }

  private async fetchImage(place: PlaceCoordinatesResponseDTO): Promise<string | null> {
    if (!place.screenshot) return null;

    try {
      const imageRef: StorageReference = ref(storage, place.screenshot);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  }

  render(cluster: Cluster): google.maps.marker.AdvancedMarkerElement {
    const container = document.createElement("div");
    const root = createRoot(container);

    const places = this.props.places;

    const renderCluster = (images: string[]) => {
      const shouldAnimate = cluster.count !== this.previousCount;
      this.previousCount = cluster.count;

      const initialProps = shouldAnimate ? { opacity: 0, scale: 0.5 } : {};
      const animateProps = shouldAnimate ? { opacity: 1, scale: 1 } : {};

      root.render(
        <motion.section
          key={cluster.position.toString()}
          initial={initialProps}
          animate={animateProps}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center rounded-xl w-[2.8em] h-[2.8em] relative dark:bg-gray-200 bg-white text-black text-2xl font-bold p-[.1em]"
        >
          <div className="absolute -top-4 -right-1 z-50 bg-[#fa1f52] text-white text-xs font-bold 
              flex items-center justify-center w-6 h-6 rounded-full">
            {cluster.count}
          </div>
          <ImageCarousel images={images} />
          <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
              border-r-[.4em] border-r-transparent border-b-[.4em] dark:border-b-gray-200 border-b-white shadow-2xl"></div>
        </motion.section>
      );
    };

    // Inicialmente mostramos el gris
    renderCluster([]);

    // Cargamos las imágenes una por una
    if (places.length > 0) {
      const loadImages = async () => {
        const newImages: string[] = [];
        
        // Cargamos hasta 2 imágenes
        for (let i = 0; i < Math.min(places.length, 2); i++) {
          const place = places[i];
          const url = await this.fetchImage(place);
          if (url) {
            newImages.push(url);
            // Actualizamos el componente cada vez que tenemos una nueva imagen
            renderCluster(newImages);
          }
        }
      };

      loadImages();
    }

    return new google.maps.marker.AdvancedMarkerElement({
      position: cluster.position,
      content: container,
    });
  }
} 