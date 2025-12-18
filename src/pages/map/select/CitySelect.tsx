import { useState, useMemo } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { City } from "../../../types/City";
import { useMapController } from "../../../contexts/MapContext";
import { SelectNoResults } from "../../../components/common/SelectNoResults";
import { useFetchCities } from "../../../hooks/cities/useFetchCities/useFetchCities";
import { ModalCenterAnimateWrapper } from "../../../components/common/ModalCenterAnimateWrapper";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface CitySelectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CitySelect: React.FC<CitySelectProps> = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");
  const { data: cities } = useFetchCities();
  const { setCity, setSelectedFiction } = useMapController();

  const filteredItems = useMemo(() => {
    return query === "" 
      ? cities ?? []  
      : cities?.filter((item: City) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        ) ?? []; 
  }, [query, cities]);

  const setCityAndClose = (selectedCity: City) => {
    setCity(selectedCity);
    setSelectedFiction(undefined)
    setOpen(false);
  };

  return (
    <ModalCenterAnimateWrapper open={open} setOpen={() => setOpen(false)}>
      <Combobox
        onChange={(selectedCity: City) => setCityAndClose(selectedCity)}
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
            {filteredItems.map((item: City) => (
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
    </ModalCenterAnimateWrapper>
  );
};
