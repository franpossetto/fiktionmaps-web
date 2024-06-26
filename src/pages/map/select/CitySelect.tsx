import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { useCityService } from "../../../services/useCityService";
import { City } from "../../../types/City";
import { useMapController } from "../../../contexts/MapContext";
import { SelectNoResults } from "../../../components/common/SelectNoResults";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
interface CitySelectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CitySelect: React.FC<CitySelectProps> = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const { getCities } = useCityService();
  const { loading, data, error } = getCities();
  const [cities, setCities] = useState<City[]>([]);
  const { setCity } = useMapController();

  useEffect(() => {
    if (data) {
      setCities(data);
    }
  }, [data]);

  const filteredItems =
    query === ""
      ? cities
      : cities?.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const setCityAndClose = (selectedCity: City) => {
    setCity(selectedCity);
    setOpen(false);
  };

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
                onChange={(selectedCity: any) => setCityAndClose(selectedCity)}
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
                    autoComplete="off"
                  />
                </div>

                {filteredItems.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                  >
                    {filteredItems.map((item) => (
                      <Combobox.Option
                        key={item.id}
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
                            <div
                              className={classNames(
                                "flex h-10 w-10 flex-none items-center justify-center rounded-lg",
                                "bg-indigo-500"
                              )}
                            >
                              <GlobeAmericasIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </div>
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
                                {item.amountOfPlaces === 1
                                  ? "1 Place"
                                  : item.amountOfPlaces ?? 0 > 1
                                  ? `${item.amountOfPlaces} Places`
                                  : "No Places"}
                              </p>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredItems.length === 0 && (
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
