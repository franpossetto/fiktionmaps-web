import { Fragment, useState, useMemo, useEffect } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useMapController } from "../../../contexts/MapContext";
import { Fiction } from "../../../types/Fiction";
import { FictionImage } from "../../admin/fictions/FictionImage";
import { SelectNoResults } from "../../../components/common/SelectNoResults";
import { debounce } from "lodash";
import classNames from "../../../helpers/classNames";
import { useFictionsByCoordinates } from "@/hooks/fictions/useFetchFictionsByCoordinates/useFetchFictionsByCoordinates";
import { FictionByCoordinatesResponse } from "@/hooks/fictions/useFetchFictionsByCoordinates/useFetchFictionsByCoordinates.types";
import { useFirebaseStorageMultiple } from "@/hooks/shared/useImage/useFirebaseStorageMultiple";

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
  const {data: fictionsByCoordinates} = useFictionsByCoordinates({
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
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all dark:bg-gray-900 dark:divide-gray-700">
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
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
