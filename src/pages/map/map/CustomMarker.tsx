import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../../../config/firebase';
import { useMapController } from '../../../contexts/MapContext';

interface CustomMarkerProps {
  text: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ place }) => {
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
    <section className="relative flex items-center justify-center">
      <article className="bg-white border border-gray-800
        rounded-t-full rounded-bl-full p-[.05em]
        text-lg shadow-md cursor-pointer flex items-center justify-center  
        overflow-hidden w-12 h-12 rotate-45">
        <article className="marker-content flex items-center justify-center">
          <img 
            src={imageUrl} 
            className="w-full h-full object-cover rounded-full -rotate-45 transition-all duration-300"
          />
        </article>
      </article>
      <div className="absolute -bottom-[1.1rem] left-1/2 transform -translate-x-1/2 w-[.5em] h-[.5em] bg-white border border-gray-800 rounded-full"></div>
    </section>
  ) : (
    <div className="custom-marker">
      <div className="marker-content">
        <span className="marker-text"></span>
      </div>
    </div>
  );
  
};

export default CustomMarker;


