import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { Cluster, Renderer } from "@googlemaps/markerclusterer";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, StorageReference } from "firebase/storage";
import { storage } from "../../../config/firebase";

export const CustomClusterRenderer = ({ imageUrls }: { imageUrls: string[] }): Renderer => ({
  render: ({ count, position, markers }: Cluster) => {
    const container = document.createElement("div");
    const root = createRoot(container);

    const screenshots: string[] = (markers as any[])
      .map((marker) => marker.screenshot)
      .filter((s: string | undefined): s is string => Boolean(s));

    console.log("Cluster count:", count);
    console.log("Screenshots array:", screenshots);

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

    root.render(
      <motion.section
        key={position.toString()}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-center rounded-xl w-[2.5em] h-[2.5em] relative bg-gray-200 text-black text-2xl font-bold p-[.1em]"
      >
        <div className="absolute -top-4 -right-1 z-50 bg-blue-700 text-white text-xs font-bold 
          flex items-center justify-center w-6 h-6 rounded-full">
          {count}
        </div>
        <ImageCarousel images={screenshots.length > 0 ? screenshots : imageUrls} />
        <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
          border-r-[.4em] border-r-transparent border-b-[.4em] border-b-gray-200"></div>
      </motion.section>
    );

    if (screenshots.length > 0) {
      fetchAllImages().then((fetchedImages) => {
        console.log("Fetched image URLs:", fetchedImages);
        root.render(
          <motion.section
            key={position.toString()}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center rounded-xl w-[2.5em] h-[2.5em] relative bg-gray-200 text-black text-2xl font-bold p-[.1em]"
          >
            <div className="absolute -top-4 -right-1 z-50 bg-blue-700 text-white text-xs font-bold 
              flex items-center justify-center w-6 h-6 rounded-full">
              {count}
            </div>
            <ImageCarousel images={fetchedImages} />
            <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
              border-r-[.4em] border-r-transparent border-b-[.4em] border-b-gray-200"></div>
          </motion.section>
        );
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

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      const next = (currentIndex + 1) % images.length;
      setCurrentIndex(next);
      setTimeout(() => setPrevIndex(null), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="w-full h-full overflow-hidden rounded-xl relative">
      {prevIndex !== null && (
        <motion.img
          key={`prev-${prevIndex}`}
          src={images[prevIndex]}
          alt="carousel"
          className="w-full h-full object-cover absolute"
          initial={{ x: "0%", opacity: 1 }}
          animate={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ zIndex: 1 }}
        />
      )}
      <motion.img
        key={`current-${currentIndex}`}
        src={images[currentIndex]}
        alt="carousel"
        className="w-full h-full object-cover absolute"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ zIndex: 0 }}
      />
    </div>
  );
};
