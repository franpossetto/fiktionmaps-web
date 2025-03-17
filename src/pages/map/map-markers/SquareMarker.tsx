import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase';
import { useMapController } from '../../../contexts/MapContext';
import { AnimatePresence, motion } from "framer-motion";
import { PlaceResponseDTO } from '../../../hooks/places/useFetchPlaceById/usePlaceFetchById.types';
import { RedMarker } from './RedMarker';

interface SquareMarkerProps {
  place: PlaceResponseDTO;
}

export const SquareMarker: React.FC<SquareMarkerProps> = ({ place }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const {mapZoom} = useMapController();
  const [show, setShow] = useState(mapZoom);

  useEffect(() => {
    const fetchImage = () => {
      if (place.screenshot) {
        let sceneImg = place.screenshot;
        const imageRef: StorageReference = ref(storage, sceneImg);

        getDownloadURL(ref(imageRef))
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            setImageUrl(undefined);
          });
      }
    };

    if (place) {
      fetchImage();
    }
  }, []);

  useEffect(() => {
    if (!mapZoom) {
      setTimeout(() => setShow(false), 100);
    } else {
      setShow(true);
    }
  }, [mapZoom]);

  return (
    <AnimatePresence
      mode="wait" // Espera a que se desmonte antes de renderizar el siguiente
    >
      {show && mapZoom && (
        <motion.section
          key="marker"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center
            rounded-xl w-[2.3em] h-[2.3em] relative bg-white
            dark:bg-gray-200 border-b-white shadow-2xl text-black text-2xl font-bold p-[.1em]"
        >
          <img
            src={imageUrl}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
            border-r-[.4em] border-r-transparent border-b-[.4em] dark:border-b-gray-200 border-b-white shadow-2xl"></div>
        </motion.section>
      )}

      {!mapZoom && (
        <motion.div
          key="redMarker"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="custom-marker"
        >
          <RedMarker />
        </motion.div>
      )}
    </AnimatePresence>
  );
};