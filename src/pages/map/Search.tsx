import { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Combobox } from "@headlessui/react";
import { useMapController } from "../../contexts/MapContext";
import { FictionImage } from "./FictionImage";
import { Fiction } from "../../types/Fiction";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  const {
    fictions,
    loading: ldg,
    setLoading,
    fictionsSelected,
    setFictionsSelected: sendFictionsToMap,
  } = useMapController();

  const [inputSearchValue, setInputSearchValue] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<Fiction>();
  const [filteredFictionsInInput, setFilteredFictionsInInput] =
    useState<Fiction[]>();

  useEffect(() => {
    setInputSearchValue(null);
  }, []);

  useEffect(() => {
    if (!inputSearchValue) {
      setFilteredFictionsInInput([]);
      return;
    }
    const _fictionsFiltered = fictions?.filter((f: any) => {
      return f.name.toLowerCase().includes(inputSearchValue?.toLowerCase());
    });

    setFilteredFictionsInInput(_fictionsFiltered);
  }, [inputSearchValue]);

  const selectFiction = (fiction: Fiction) => {
    setSelectedItem(fiction);
    sendFictionsToMap([fiction]);
  };

  const unSelectFiction = () => {
    sendFictionsToMap(fictions);
    setSelectedItem(undefined);
    setInputSearchValue("");
  };

  return (
    <>
      <Combobox
        onChange={(fiction: Fiction) => {
          selectFiction(fiction);
        }}
      >
        <button className="mt-4 ml-24 h-10 flex items-center text-xs font-semibold w-[360px] border-0 bg-slate-950 border-b-[1px] border-y-zinc-900 px-4 text-white focus:ring-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          New York City
        </button>
        <Combobox.Input
          className="ml-24 w-[360px] border-0 bg-slate-950 px-4 py-2.5 text-white focus:ring-0 sm:text-sm"
          placeholder="Search a Fiction..."
          onChange={(event) => setInputSearchValue(event.target.value)}
        ></Combobox.Input>

        {filteredFictionsInInput && (
          <Combobox.Options
            static
            className="ml-24 w-[360px] mb-2 h-auto max-h-80 scroll-py-2 bg-slate-900 overflow-y-auto text-sm text-white"
          >
            {filteredFictionsInInput?.map((fiction: Fiction) => (
              <Combobox.Option
                key={fiction.id}
                value={fiction}
                className={({ active }) =>
                  classNames(
                    "cursor-default select-none rounded-md px-4 py-2 flex flex-row w-full justify-items'start",
                    active && "bg-slate-900 text-white"
                  )
                }
              >
                <FictionImage imgUrl={fiction.imgUrl} />
                <div className="flex flex-col flex-1">
                  <h1 className="px-2 font-semibold mb-1">{fiction.name}</h1>
                  <p className="px-2 text-slate-500">{fiction.type}</p>
                </div>
                {selectedItem && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={(event) => {
                      event.stopPropagation();
                      unSelectFiction();
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </>
  );
}
