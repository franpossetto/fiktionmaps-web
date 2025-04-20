import { memo } from 'react';
import { useMapController } from '../../../contexts/MapContext';
import { RedMarker } from './RedMarker';
import { motion } from 'framer-motion';
interface SquareMarkerProps {
  imageUrl?: string | null;
}

export const SquareMarker = memo<SquareMarkerProps>(({ imageUrl }) => {
  const { mapZoom } = useMapController();



  if (!mapZoom) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="custom-marker"
      >
        <RedMarker />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center rounded-xl w-[2.3em] h-[2.3em] relative bg-wite dark:bg-gray-200 bg-white border-b-white shadow-2xl text-black text-2xl font-bold p-[.1em]"
    >
      <img
        src={imageUrl ?? "/not_found_images/404_not_found_tokio.png"}
        alt="Place screenshot"
        className="w-full h-full object-cover rounded-xl"
      />
      <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
        border-r-[.4em] border-r-transparent border-b-[.4em] dark:border-b-gray-200 border-b-white shadow-2xl"></div>
    </motion.div>
  );
});