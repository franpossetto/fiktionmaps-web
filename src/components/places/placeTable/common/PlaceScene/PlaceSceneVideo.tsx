import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../../config/firebase";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

interface PlaceSceneVideoProps {
  imgUrl?: string;
}

export const PlaceSceneVideo: React.FC<PlaceSceneVideoProps> = ({ imgUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const [showVideo, setShowVideo] = useState(false);

  const handleVideoOpen = () => {
    setShowVideo(true);
  };

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  useEffect(() => {
    const fetchImage = () => {
      const imageRef: StorageReference = ref(storage, imgUrl);
      getDownloadURL(ref(imageRef))
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {});
    };

    if (imgUrl) {
      fetchImage();
    }
  }, []);

  return (
    <div className="relative flex flex-row h-28 w-44 overflow-hidden shadow-sm">
      <img className="object-cover w-full h-full" src={imageUrl} alt="" />
      <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-transparent hover:scale-110 hover:shadow-lg transition-all">
        <PlayCircleIcon className="h-8 w-8 text-white/70" />
      </button>
    </div>
  );
};
