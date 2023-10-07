import { useEffect, useState } from "react";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";

interface FictionImageProps {
  imgUrl: string;
}

export const FictionImage = ({ imgUrl }: FictionImageProps) => {
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

    fetchImage();
  }, []);

  return imageUrl !== undefined ? (
    <img
      src={imageUrl}
      alt=""
      className="h-14 w-auto"
      style={{ backgroundColor: "black" }}
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = "src/assets/fm_v.png";
      }}
    />
  ) : (
    <img
      src="src/assets/fm_v.png"
      alt=""
      className="h-14 w-auto"
      style={{ backgroundColor: "black" }}
    />
  );
};
