interface ContentTableProps {
  data: any;
  config: any;
}

export const ContentTable: React.FC<ContentTableProps> = ({ data, config }) => {
  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        {config &&
          config.map((column: any) => (
            <th key={column.key} className={column.className} scope="col">
              {column.label}
            </th>
          ))}
      </thead>
      <tbody className="bg-white">
        {data.map((row: any) => (
          <tr key={row.id} className="even:bg-gray-50">
            {config.map((column: any) => (
              <td
                key={column.key}
                className="whitespace-nowrap py-1 font-normal text-gray-900 sm:pl-3"
              >
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
