import { useState, useMemo, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useMapController } from "../../../contexts/MapContext";
import { Fiction } from "../../../types/Fiction";
import { SelectNoResults } from "../../../components/common/SelectNoResults";
import { debounce } from "lodash";
import classNames from "../../../helpers/classNames";
import { useFetchFictionsByCoordinates } from "@/hooks/fictions/useFetchFictionsByCoordinates/useFetchFictionsByCoordinates";
import { FictionByCoordinatesResponse } from "@/hooks/fictions/useFetchFictionsByCoordinates/useFetchFictionsByCoordinates.types";
import { useFirebaseStorageMultiple } from "@/hooks/shared/useImage/useFirebaseStorageMultiple";
import { FictionImage } from "@/components/fiction/FictionImage";
import { ModalCenterAnimateWrapper } from "@/components/common/ModalCenterAnimateWrapper";

interface FictionSelectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FictionSelect: React.FC<FictionSelectProps> = ({
  open,
  setOpen,
}) => {
  const MOVIE_COVERS_PATH = "movie_covers/";

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { city, placeSearchParameters} = useMapController();
  const {data: fictionsByCoordinates} = useFetchFictionsByCoordinates({
    upperLat: placeSearchParameters?.upperLat,
    lowerLat: placeSearchParameters?.lowerLat,
    rightLng: placeSearchParameters?.rightLng,
    leftLng: placeSearchParameters?.leftLng,
  });

  const {
    setSelectedFiction,
  } = useMapController();

  useEffect(() => {
    const handler = debounce((value: string) => {
      setDebouncedQuery(value);
    }, 300);

    handler(query);

    return () => {
      handler.cancel();
    };
  }, [query]);

  const filteredItems = useMemo(() => {
    return debouncedQuery === ""
      ? fictionsByCoordinates
      : fictionsByCoordinates?.filter((item: FictionByCoordinatesResponse) =>
        item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
  }, [debouncedQuery, fictionsByCoordinates]);

  const setFictionAndClose = (selectedFiction: FictionByCoordinatesResponse) => {
    const transformedFiction: Fiction = {
      id: selectedFiction.fictionId,
      name: selectedFiction.name,
      imgUrl: selectedFiction.imgUrl,
      type: selectedFiction.type,
      duration: selectedFiction.duration,
      year: selectedFiction.year?.toString() || "",
      externalId: "", // ToDo: add this in the backend
      overview: "", // ToDo: add this to backend.
    };
    setSelectedFiction(transformedFiction);
    setOpen(false);
  };

  const imagePaths = useMemo(
    () => filteredItems?.map(f => f.imgUrl ? MOVIE_COVERS_PATH + f.imgUrl : null) || [],
    [filteredItems]
  );
  
  const { urls: imageUrls } = useFirebaseStorageMultiple(imagePaths);
  
  return (
    <ModalCenterAnimateWrapper open={open} setOpen={() => setOpen(false)}>
      <Combobox
        onChange={(selectedFiction: FictionByCoordinatesResponse) =>
          setFictionAndClose(selectedFiction)
        }
      >
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm dark:text-white"
            placeholder="Search..."
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {!!filteredItems?.length && (
          <Combobox.Options
            static
            className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
          >
            {filteredItems?.map((item, index) => (
              <Combobox.Option
                key={item.fictionId}
                value={item}
                className={({ active }) =>
                  classNames(
                    "flex cursor-default select-none rounded-xl p-3",
                    active && "bg-gray-100 dark:bg-gray-800"
                  )
                }
              >
                {({ active }) => (
                  <>
                    <FictionImage imgUrl={imageUrls[index]} />
                    <div className="ml-4 flex-auto">
                      <p
                        className={classNames(
                          "text-sm font-medium",
                          active
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-400"
                        )}
                      >
                        {item.name}
                      </p>
                      <p
                        className={classNames(
                          "text-sm",
                          active
                            ? "text-gray-700 dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                        )}
                      >
                        {item.type}
                      </p>
                    </div>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}

        {debouncedQuery !== "" && filteredItems?.length === 0 && (
          <SelectNoResults />
        )}
      </Combobox>
    </ModalCenterAnimateWrapper>
  );
};
