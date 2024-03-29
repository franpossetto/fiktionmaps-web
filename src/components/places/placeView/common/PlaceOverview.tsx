import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../config/firebase";
import { Fiction } from "../../../types/entities/fiction";
import { Place } from "../../../types/entities/place";

interface PlaceOverviewProps {
  fiction: Fiction;
  place: Place;
}

export const PlaceOverview: React.FC<PlaceOverviewProps> = ({
  fiction,
  place,
}) => {
  const [imageFictionUrl, setFictionImageUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchImage = () => {
      console.log(fiction.imgUrl);
      const sceneImg = fiction.imgUrl.replace("/img/", "");
      const imageRef: StorageReference = ref(storage, sceneImg);

      getDownloadURL(ref(imageRef))
        .then((url) => {
          setFictionImageUrl(url);
        })
        .catch((error) => {});
    };
    fetchImage();
  }, []);

  return (
    <div className="m-5 sm:flex sm:items-end">
      <div className="sm:flex-1">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {fiction.name.toUpperCase()}, {fiction.year}
          </p>
          <h3 className="text-xl font-bold sm:text-2xl text-neutral-900 dark:text-white">
            {place.name}
          </h3>
          <p className="text-sm font-medium mt-3 dark:text-gray-300">{place.description}</p>
        </div>
      </div>
    </div>
  );
};
