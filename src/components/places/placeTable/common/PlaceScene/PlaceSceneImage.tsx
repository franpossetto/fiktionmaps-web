import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../../config/firebase";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

interface PlaceImageSceneProps {
  imgUrl?: string;
}

export const PlaceSceneImage: React.FC<PlaceImageSceneProps> = ({ imgUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

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
    </div>
  );
};
