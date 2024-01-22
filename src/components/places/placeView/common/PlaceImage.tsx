import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../config/firebase";
import StreetView from "./StreetView";
import { FilmIcon, GlobeAmericasIcon } from "@heroicons/react/24/outline";
export const PlaceImage = ({ place }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

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

  const imgDivSideStyle = place.screenshot
    ? "relative h-36 md:h-96"
    : "relative px-3";
  const imgSideStyle = place.screenshot
    ? "absolute h-full w-full object-cover"
    : "block h-full w-full object-cover";
  const [showStreetView, setShowStreetView] = useState(false);

  return (
    <>
      <div className="relative">
        {showStreetView ? (
          <StreetView />
        ) : (
          <div className={imgDivSideStyle}>
            <img className={imgSideStyle} src={imageUrl} alt="" />
          </div>
        )}

        <button
          className="absolute top-0 right-0 mt-5 mr-7 bg-black rounded-full h-10 w-10 flex items-center justify-center text-xs text-white z-10"
          onClick={() => setShowStreetView(!showStreetView)}
        >
          {showStreetView ? (
            <FilmIcon className="transform scale-50" />
          ) : (
            <GlobeAmericasIcon className="transform scale-50" />
          )}
        </button>
      </div>
    </>
  );
};
