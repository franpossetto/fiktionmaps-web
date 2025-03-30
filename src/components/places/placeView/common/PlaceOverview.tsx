import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../../../../config/firebase";
import { Fiction } from "../../../../types/Fiction";
import { Place } from "../../../../types/Place";
import { FictionResponse } from "@/hooks/fictions/useFetchFictionById/useFetchFictionById.types";

interface PlaceOverviewProps {
  fiction: FictionResponse | undefined;
  place: Place;
}

export const PlaceOverview: React.FC<PlaceOverviewProps> = ({
  fiction,
  place,
}) => {
  const [imageFictionUrl, setFictionImageUrl] = useState<string | undefined>();

  useEffect(() => {
    const fetchImage = () => {
      if (!fiction?.imgUrl) {
        console.error("fiction.imgUrl is undefined");
        return;
      }

      try {
        const sceneImg = fiction.imgUrl.replace("/img/", "");
        const imageRef: StorageReference = ref(storage, sceneImg);

        getDownloadURL(imageRef)
          .then((url) => {
            setFictionImageUrl(url);
          })
          .catch((error) => {
            console.error("Failed to fetch image URL:", error);
          });
      } catch (error) {
        console.error("Error in fetchImage:", error);
      }
    };

    fetchImage();
  }, [fiction]);

  return (
    <div className="m-5 sm:flex sm:items-end">
      <div className="sm:flex-1">
        <div className="flex flex-col">
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {fiction?.name || "Unknown Fiction"}, {fiction?.year || "Unknown Year"}
          </p>
          <h3 className="text-xl font-bold sm:text-2xl text-neutral-900 dark:text-white">
            {place?.name || "Unknown Place"}
          </h3>
          <p className="text-sm font-medium mt-3 dark:text-gray-300">
            {place?.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};
