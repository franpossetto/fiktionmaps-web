import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { Cluster, Renderer } from "@googlemaps/markerclusterer";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { storage } from "../../../config/firebase";

export const CustomClusterRendererCoursel = ({
    imageUrls,
    shouldAnimate,
}: {
    imageUrls: string[];
    shouldAnimate: boolean;
}): Renderer => ({
    render: ({ count, position, markers }: Cluster) => {
        const container = document.createElement("div");
        const root = createRoot(container);

        const screenshots: string[] = (markers as any[])
            .map((marker) => marker.screenshot)
            .filter((s: string | undefined): s is string => Boolean(s));

        const fetchAllImages = async () => {
            const fetchedImages: string[] = [];
            await Promise.all(
                screenshots.map(async (s) => {
                    const imageRef: StorageReference = ref(storage, s);
                    try {
                        const url = await getDownloadURL(imageRef);
                        fetchedImages.push(url);
                    } catch (error) {
                        console.error("Error fetching image:", error);
                    }
                })
            );
            return fetchedImages;
        };

        const renderCluster = (images: string[]) => {
            const initialProps = shouldAnimate ? { opacity: 0, scale: 0.5 } : {};
            const animateProps = shouldAnimate ? { opacity: 1, scale: 1 } : {};
            root.render(
                <motion.section
                    key={position.toString()}
                    initial={initialProps}
                    animate={animateProps}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center rounded-xl w-[2.5em] h-[2.5em] relative bg-gray-200 text-black text-2xl font-bold p-[.1em]"
                >
                    <div className="absolute -top-4 -right-1 z-50 bg-blue-700 text-white text-xs font-bold 
                        flex items-center justify-center w-6 h-6 rounded-full">
                        {count}
                    </div>
                    <ImageCarousel images={images.length > 0 ? images : imageUrls} />
                    <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
                        border-r-[.4em] border-r-transparent border-b-[.4em] border-b-gray-200"></div>
                </motion.section>
            );
        };

        renderCluster(screenshots);

        if (screenshots.length > 0) {
            fetchAllImages().then((fetchedImages) => {
                renderCluster(fetchedImages);
            });
        }

        return new google.maps.marker.AdvancedMarkerElement({
            position,
            content: container,
        });
    },
});

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  // Si no hay imágenes, usamos estos colores de respaldo.
  const defaultColors = ["#FF0000", "#00FF00", "#0000FF", "#FFA500"];
  const displayItems = images.length > 0 ? images : defaultColors;

  // Determina si el item es una URL de imagen o un color.
  const isImage = (item: string) => item.startsWith("http");

  // Actualiza el índice de forma recursiva con intervalo aleatorio.
  useEffect(() => {
    let timeoutId: any = null;

    const updateIndex = () => {
      setPrevIndex(currentIndex);
      const next = (currentIndex + 1) % displayItems.length;
      setCurrentIndex(next);
      setTimeout(() => setPrevIndex(null), 500);

      const randomInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
      timeoutId = setTimeout(updateIndex, randomInterval);
    };

    const randomInitialInterval = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    timeoutId = setTimeout(updateIndex, randomInitialInterval);

    return () => clearTimeout(timeoutId);
  }, [currentIndex, displayItems.length]);

  // Función que renderiza la "diapositiva" (slide) dependiendo del tipo de contenido.
  const renderSlide = (
    index: number,
    key: string,
    initialX: string,
    animateX: string,
    zIndex: number
  ) => {
    const item = displayItems[index];

    if (isImage(item)) {
      return (
        <motion.img
          key={key}
          src={item}
          alt="carousel"
          className="w-full h-full object-cover absolute"
          initial={{ x: initialX, opacity: 0 }}
          animate={{ x: animateX, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ zIndex }}
        />
      );
    } else {
      return (
        <motion.div
          key={key}
          className="w-full h-full absolute"
          // En este caso animamos directamente el backgroundColor
          initial={{ x: initialX, opacity: 0, backgroundColor: item }}
          animate={{ x: animateX, opacity: 1, backgroundColor: item }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ zIndex }}
        />
      );
    }
  };

  return (
    <div className="w-full h-full overflow-hidden rounded-xl relative">
      {prevIndex !== null && renderSlide(prevIndex, `prev-${prevIndex}`, "0%", "-100%", 1)}
      {renderSlide(currentIndex, `current-${currentIndex}`, "100%", "0%", 0)}
    </div>
  );
};

export default ImageCarousel;