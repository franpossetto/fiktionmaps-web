import { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";
import { Combobox } from "@headlessui/react";
import { Fiction } from "./types";
import { useMapController } from "../../contexts/MapContext";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Search() {
  
  const {fictions, loading: ldg, setLoading,  fictionsSelected, setFictionsSelected} = useMapController();
  const [inputSearchValue, setInputSearchValue] = useState<string>("");


  useEffect(() => {
    if(!inputSearchValue){
      setFictionsSelected(fictions);
        return;
    }
    const _fictionsFiltered = fictions?.filter((f: any) => {
        return f.name.toLowerCase().includes(inputSearchValue.toLowerCase());
    });
    setFictionsSelected(_fictionsFiltered);

  },[inputSearchValue])


  const selectFiction = (fiction: Fiction) => {
    setFictionsSelected([fiction]);
  }

  const unSelectFiction = () => {
    console.log(fictions);
    setFictionsSelected(fictions);
  }
  console.log(fictionsSelected)

  return (
    <Combobox
      onChange={(fiction: Fiction) => {
        selectFiction(fiction);
      }}
    >
      <Combobox.Input
        className="mt-6 ml-24 w-[360px] border-0 bg-slate-950 px-4 py-2.5 text-white focus:ring-0 sm:text-sm"
        placeholder="Search..."
        onChange={(event) => setInputSearchValue(event.target.value)}
      />
      
      { fictionsSelected && (
        <Combobox.Options
          static
          className="ml-24 w-[360px] mb-2 h-auto max-h-80 scroll-py-2 bg-slate-900 overflow-y-auto py-2 text-sm text-white"
        >
          {fictionsSelected?.map((fiction: any) => (
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
              <img 
                src={`http://localhost:8081${fiction.imgUrl}`} 
                alt="" 
                className="h-14 w-auto" 
                style={{ backgroundColor: 'black' }}
                onError={(e:any) => {e.target.onerror = null; e.target.src='src/assets/fm_v.png';}}
              />
              <div className="flex flex-col">
                <h1 className="px-2 font-semibold mb-1">{fiction.name}</h1>
                <p className="px-2 text-slate-500">{fiction.type}</p>

              </div>
              {
                fictionsSelected.length == 1 &&
                <div className = "flex" onClick={(event) => { event.stopPropagation(); unSelectFiction(); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              }
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}

      {fictionsSelected && (
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
