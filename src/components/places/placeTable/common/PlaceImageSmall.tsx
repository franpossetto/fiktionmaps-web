import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../config/firebase";

interface Place {
  screenshot?: string;
}

interface PlaceImageSmallProps {
  place: Place;
}

export const PlaceImageSmall: React.FC<PlaceImageSmallProps> = ({ place }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchImage = () => {
      if (place.screenshot) {
        const sceneImg = place.screenshot;
        const imageRef: StorageReference = ref(storage, sceneImg);

        getDownloadURL(ref(imageRef))
          .then((url) => {
            setImageUrl(url);
          })
          .catch(() => {
            setImageUrl(undefined);
          });
      }
    };

    if (place) {
      fetchImage();
    }
  }, []);

  const imgDivSideStyle = "relative h-8 w-8";
  const imgSideStyle = imageUrl
    ? "absolute h-8 w-auto object-cover rounded-md"
    : "absolute h-8 w-8 bg-gray-200 rounded-md";

  return (
    <>
      <div className="relative">
        <div className={imgDivSideStyle}>
          {imageUrl ? (
            <img className={imgSideStyle} src={imageUrl} alt="" />
          ) : (
            <div className={imgSideStyle}></div>
          )}
        </div>
      </div>
    </>
  );
};
