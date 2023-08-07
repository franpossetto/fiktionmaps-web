import { Fragment, useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Fiction } from "./Map";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}
interface SearchProps {
  fictionList: Fiction[];
  setSelectedFiction: React.Dispatch<React.SetStateAction<Fiction[]>>;
}

export default function Search({
  fictionList: fictions,
  setSelectedFiction,
}: SearchProps) {
  const [query, setQuery] = useState("");

  let filteredFictions =
    query === ""
      ? []
      : fictions.filter((fiction: any) => {
          return fiction.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      onChange={(fiction: any) => {
        setSelectedFiction([fiction]);
        filteredFictions = [fiction];
        setQuery(fiction.name);
      }}
    >
      <Combobox.Input
        className="mt-6 ml-24 w-[360px] border-0 bg-slate-950 px-4 py-2.5 text-white focus:ring-0 sm:text-sm"
        placeholder="Search..."
        onChange={(event) => setQuery(event.target.value)}
      />

      {filteredFictions.length > 0 && (
        <Combobox.Options
          static
          className="ml-24 w-[360px] mb-2 h-auto max-h-80 scroll-py-2 bg-slate-900 overflow-y-auto py-2 text-sm text-white"
        >
          {filteredFictions.map((fiction: any) => (
            <Combobox.Option
              key={fiction.id}
              value={fiction}
              className={({ active }) =>
                classNames(
                  "cursor-default select-none rounded-md px-4 py-2 flex flex-row",
                  active && "bg-slate-900 text-white"
                )
              }
            >
              <img src={fiction.imgUrl} alt="" className="h-14 w-auto" />
              <div className="flex flex-col">
                <h1 className="px-2 font-semibold mb-1">{fiction.name}</h1>
                <p className="px-2 text-slate-500">{fiction.type}</p>
              </div>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}

      {query !== "" && filteredFictions.length === 0 && (
        <div className="px-4 py-14 text-center sm:px-14">
          <UsersIcon
            className="mx-auto h-6 w-6 text-gray-400"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm text-gray-900">
            No Fictions found using that search term.
          </p>
        </div>
      )}
    </Combobox>
  );
}
