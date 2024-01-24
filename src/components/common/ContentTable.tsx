import { useEffect, useState } from "react";

interface ContentTableProps {
  data: any;
}

export const ContentTable: React.FC<ContentTableProps> = ({ data }) => {
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
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {config &&
                    config.map((column: any) => (
                      <th
                        key={column.key}
                        className={column.className}
                        scope="col"
                      >
                        {column.label}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {dataToShow ? (
                  dataToShow.map((row: any) => (
                    <tr key={row.id} className="even:bg-gray-50">
                      {data.config.map((column: any) => (
                        <td
                          key={column.key}
                          className="whitespace-nowrap py-1 font-normal text-gray-900 sm:pl-3"
                        >
                          {row[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={data.config.length}>
                      <h1>Loading...</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
