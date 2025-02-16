import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase';
import { useMapController } from '../../../contexts/MapContext';
import { motion } from "framer-motion";
import { PlaceResponseDTO } from '../../../hooks/places/useFetchPlaceById/usePlaceFetchById.types';

interface SquareMarkerProps {
  place: PlaceResponseDTO;
}

const SquareMarker: React.FC<SquareMarkerProps> = ({ place }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const {setMapZoom, mapZoom} = useMapController();
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
  return mapZoom ? (
    <motion.section
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="flex items-center justify-center rounded-xl w-[2.5em] h-[2.5em] relative bg-gray-200 text-black text-2xl font-bold p-[.1em]"
  >
    {/* Usa this.props para cambiar dinámicamente la imagen */}
    <img
      src={"https://github.com/shadcn.png"}
      alt="@shadcn"
      className="w-full h-full object-cover rounded-xl"
    />

    <div className="border-l-[.4em] border-l-transparent rotate-180 absolute -bottom-2
    border-r-[.4em] border-r-transparent border-b-[.4em] border-b-gray-200"></div>
 </motion.section>

  ) : (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.4 }}
      className="custom-marker"
    >
      <div className="marker-content">
        <span className="marker-text"></span>
      </div>
    </motion.div>
  );  
};

export default SquareMarker;
