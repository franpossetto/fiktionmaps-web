import { useEffect, useState } from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { PlaceEmptyState } from "../places/placeTable/common/PlaceEmptyState";
import { ContentTable } from "./ContentTable";

interface ContentTableProps {
  data: any;
}

export const ContentTableView: React.FC<ContentTableProps> = ({ data }) => {
  const [dataToShow, setDataToShow] = useState<any>();
  const [config, setConfig] = useState<any>();

  useEffect(() => {
    if (data) {
      setDataToShow(data.dataToShow);
      setConfig(data.config);
    }
  }, [data]);

  return (
    <>
      <div className="mt-8 flow-root text-sm">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {dataToShow && dataToShow.length > 0 ? (
              <ContentTable dataToShow={dataToShow} config={config} />
            ) : (
              <PlaceEmptyState />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
