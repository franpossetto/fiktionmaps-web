import { useEffect, useState } from "react";
import { PlaceEmptyState } from "../places/placeTable/common/PlaceEmptyState";
import { ContentTable } from "./ContentTable";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

interface ContentTableProps {
  content: any;
}

export const ContentTableView: React.FC<ContentTableProps> = ({ content }) => {
  const [data, setData] = useState<any>();
  const [config, setConfig] = useState<any>();

  useEffect(() => {
    if (content) {
      setData(content.dataSource);
      setConfig(content.config);
    }
  }, [content]);

  return (
    <>
      <div className="mt-6 flow-root text-sm">
        <div className="inline-block min-w-full mr-2 py-2 align-middle sm:px-6 lg:px-8">
          {data && data.length > 0 ? (
            <ContentTable data={data} config={config} />
          ) : (
            <PlaceEmptyState
              icon={
                <RocketLaunchIcon className="w-10 h-10 mb-4 text-gray-800 dark:text-gray-200" />
              }
              title="No places created yet"
              message="Create your first place to get started"
            />
          )}
        </div>
      </div>
    </>
  );
};
