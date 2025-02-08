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
    <section className="relative flex items-center justify-center mb-4">
      <article className="bg-white border relative
        p-[.05em] shadow-zinc-500 shadow-sm rounded-full
        text-lg cursor-pointer flex items-center justify-center  
        overflow-hidden w-12 h-12 rotate-45">
        <article className="marker-content flex items-center justify-center">
          <img 
            src={'https://i.pravatar.cc/150?u=a042581f4e29026024d'} 
            className="w-full h-full object-cover rounded-full -rotate-45 transition-all duration-300"
          />
        </article>
      </article>
        <article className="border-l-[1em]  border-l-transparent rotate-180 absolute -bottom-[.4em] 
           border-r-[1em] border-r-transparent border-b-[.6em] border-b-gray-200"></article>
      <article className="absolute -bottom-[.7rem] left-1/2 transform
       -translate-x-1/2 w-[.5em] h-[.5em] bg-white border
        shadow-zinc-500 shadow-sm rounded-full"></article>
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


