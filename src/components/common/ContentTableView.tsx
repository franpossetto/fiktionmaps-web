import { useEffect, useState } from "react";
import { PlaceEmptyState } from "../places/placeTable/common/PlaceEmptyState";
import { ContentTable } from "./ContentTable";

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
      <div className="mt-8 flow-root text-sm">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {data && data.length > 0 ? (
              <ContentTable data={data} config={config} />
            ) : (
              <PlaceEmptyState />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
