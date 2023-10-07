import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { useMapController } from "../../contexts/MapContext";
import { useFictionService } from "../../services/useFictionService";
import { FictionImage } from "../map/FictionImage";
import { Fiction } from "../../types/Fiction";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export const InputSearchFiction = () => {
  const { getFictions } = useFictionService();
  const { loading, data, error } = getFictions();
  const {
    fictions,
    setFictions,
    loading: ldg,
    setLoading,
    fictionsSelected,
    setFictionsSelected, // replace with component state
    city,
    setCity,
  } = useMapController();

  const [inputSearchValue, setInputSearchValue] = useState<any>();

  useEffect(() => {
    setInputSearchValue(null);
    if (data) {
      setFictions(data);
    }
  }, [data]);

  useEffect(() => {
    if (inputSearchValue == null || inputSearchValue.length == 0) {
      setFictionsSelected([]);
      return;
    }
    console.log(fictions);
    const _fictionsFiltered = fictions?.filter((f: Fiction) => {
      return f.name.toLowerCase().includes(inputSearchValue?.toLowerCase());
    });

    setFictionsSelected(_fictionsFiltered);
    if (ldg) {
      console.log(fictions);
    }
  }, [inputSearchValue]);

  const selectFiction = (fiction: Fiction) => {
    setFictionsSelected([fiction]);
  };

  const unSelectFiction = () => {
    setFictionsSelected([]);
    setInputSearchValue(null);
  };

  return (
    <Combobox
      onChange={(fiction: Fiction) => {
        selectFiction(fiction);
      }}
    >
      <Combobox.Input
        className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search..."
        onChange={(event) => setInputSearchValue(event.target.value)}
      />

      {fictionsSelected && fictionsSelected.length > 0 && (
        <Combobox.Options
          static
          className="mb-2 h-auto max-h-60 scroll-py-2 overflow-y-auto py-2 text-sm text-black bg-slate-100"
        >
          {fictionsSelected.map((fiction: Fiction) => (
            <Combobox.Option
              key={fiction.id}
              value={fiction}
              className={({ active }) =>
                classNames(
                  "cursor-default select-none rounded-md px-4 py-2 flex flex-row w-full justify-items-start",
                  active && "bg-slate-300 text-black"
                )
              }
            >
              <FictionImage imgUrl={fiction.imgUrl} />
              <div className="flex flex-col">
                <h1 className="px-2 font-semibold mb-1">{fiction.name}</h1>
                <p className="px-2 text-slate-500">{fiction.type}</p>
              </div>
              {fictionsSelected.length == 1 && (
                <div
                  className="flex"
                  onClick={(event) => {
                    event.stopPropagation();
                    unSelectFiction();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  );
};
