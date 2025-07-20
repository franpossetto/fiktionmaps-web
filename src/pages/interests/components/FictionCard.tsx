import { useEffect, useState } from "react";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../config/firebase";

interface FictionCardImageProps {
  imgUrl: string;
  fictionName: string;
}

export const FictionCardImage = ({ imgUrl, fictionName }: FictionCardImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchImage = () => {
      const imageRef: StorageReference = ref(storage, imgUrl);
      const downloadedImage = getDownloadURL(ref(imageRef));
      if (downloadedImage) {
        downloadedImage
          .then((url) => {
            setImageUrl(url);
          })
          .catch((error) => {
            switch (error.code) {
              case "storage/object-not-found":
                break;
              case "storage/unauthorized":
                break;
              case "storage/canceled":
                break;
              case "storage/unknown":
                break;
            }
          });
      }
    };

    if (imgUrl != null) {
      fetchImage();
    }
  }, [imgUrl]);

  return imageUrl !== undefined ? (
    <img
      src={imageUrl}
      alt={fictionName}
      className="absolute inset-0 w-full h-full object-cover"
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.style.display = 'none';
      }}
    />
  ) : (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center">
      <span className="text-sm text-gray-600 dark:text-gray-300 text-center px-2">
        {fictionName}
      </span>
    </div>
  );
}; 