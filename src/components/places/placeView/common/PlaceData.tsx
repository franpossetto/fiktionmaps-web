import { Fiction } from "../../../types/entities/fiction";
import { Place } from "../../../types/entities/place";

interface PlaceDataProps {
  fiction: Fiction;
  place: Place;
}

export const PlaceData: React.FC<PlaceDataProps> = ({ fiction, place }) => {
  const fields = [
    {
      title: "Formatted Address",
      key: "formattedAddress",
      action: (value: string) =>
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          value
        )}`,
    },
    {
      title: "IMDB",
      key: "externalId",
      action: (value: string) =>
        `https://www.imdb.com/find?q=${encodeURIComponent(value)}`,
    },
    { title: "Type", key: "type" },
    { title: "Custom", key: "custom" },
  ];

  const unifiedData: any = {
    ...place.location,
    ...fiction,
  };

  const isValidValue = (value: string) => {
    return value !== null && value !== undefined && value !== "";
  };

  console.log(place);
  return (
    <>
      {fields.map((field) => {
        const value = unifiedData[field.key];
        if (isValidValue(value)) {
          const actionUrl = field.action ? field.action(value) : null;
          return (
            <div
              key={field.key}
              className="flex flex-row border-y border-gray-200 py-3 items-center dark:border-gray-700"
            >
              <h3 className="text-sm font-semibold ml-5 dark:text-white">{field.title}</h3>
              <p className="text-sm ml-3 dark:text-gray-300">
                {actionUrl ? (
                  <a href={actionUrl} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                ) : (
                  value
                )}
              </p>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};
