import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { PlaceCoordinatesResponseDTO } from "@/hooks/places/useFetchPlaces/useFetchPlaces.types";
import { Cluster } from "@googlemaps/markerclusterer";

export interface SquareClusterV2Props {
  imageUrls: (string | null)[];
  places: PlaceCoordinatesResponseDTO[];
}

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const displayItems = images.length > 0 ? images : ["#E5E7EB"];

  useEffect(() => {
    if (displayItems.length <= 1) return;

    const updateIndex = () => {
      setPrevIndex(currentIndex);
      const next = (currentIndex + 1) % displayItems.length;
      setCurrentIndex(next);
      setTimeout(() => setPrevIndex(null), 500);

      const randomInterval = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
      timeoutRef.current = setTimeout(updateIndex, randomInterval);
    };

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
      {prevIndex !== null && isImage(displayItems[prevIndex]) && (
        <motion.img
          key={`prev-${prevIndex}`}
          src={displayItems[prevIndex]}
          alt="carousel"
          className="w-full h-full object-cover absolute rounded-xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
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
  private previousCount = 0;

  constructor(props: SquareClusterV2Props) {
    this.props = props;
  }

  render(cluster: Cluster): google.maps.marker.AdvancedMarkerElement {
    const container = document.createElement("div");
    const root = createRoot(container);

    const shouldAnimate = cluster.count !== this.previousCount;
    this.previousCount = cluster.count;

    const initialProps = shouldAnimate ? { opacity: 0, scale: 0.5 } : {};
    const animateProps = shouldAnimate ? { opacity: 1, scale: 1 } : {};

    const validImages = this.props.imageUrls.filter(Boolean) as string[];

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
        <ImageCarousel images={validImages.slice(0, 2)} />
        <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
            border-r-[.4em] border-r-transparent border-b-[.4em] dark:border-b-gray-200 border-b-white shadow-2xl"></div>
      </motion.section>
    );

    return new google.maps.marker.AdvancedMarkerElement({
      position: cluster.position,
      content: container,
    });
  }
}
