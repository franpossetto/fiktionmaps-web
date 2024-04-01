import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useFictionService } from "../../../../services/useFictionService";
import { Fiction } from "../../../../types/Fiction";
import { usePlaceController } from "../../../../contexts/PlaceContext";

interface FictionSelectorProps {
  fiction?: string;
}

export const PlaceFictionSelector: React.FC<FictionSelectorProps> = ({
  fiction,
}) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const [query, setQuery] = useState("");
  const [selectedFiction, setSelectedFiction] = useState<Fiction>();
  const { setFiction } = usePlaceController();
  const { getFictions, getFictionById } = useFictionService();
  const { loading, data, error } = getFictions();
  const [fictions, setFictions] = useState<Fiction[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (data) {
      const sortedFictions: Fiction[] = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFictions(sortedFictions);
    }
  }, [data]);

  useEffect(() => {
    console.log(fiction);
    if (fiction) {
      setIsDisabled(true);
    }
  }, [fiction]);

  const handleFictionChange = (fiction: Fiction) => {
    setSelectedFiction(fiction);
    setFiction(fiction);
  };

  const filteredFiction: Fiction[] =
    query === ""
      ? fictions
      : fictions.filter((fiction) => {
          return fiction.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedFiction}
      onChange={handleFictionChange}
      disabled={isDisabled}
    >
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">
        Select a Fiction
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-gray-100 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-400"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(f: Fiction) => f?.name}
          placeholder={fiction ? fiction : "Select a fiction"}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredFiction.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-900">
            {filteredFiction.map((fiction) => (
              <Combobox.Option
                key={fiction.id}
                value={fiction}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 dark:text-gray-300"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {fiction.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};
