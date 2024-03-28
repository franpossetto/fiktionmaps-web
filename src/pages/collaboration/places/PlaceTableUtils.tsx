import { ContentTableTagButton } from "../../../components/common/ContentTableTagButton";
import { PlaceImageSmall } from "../../../components/places/placeTable/common/PlaceImageSmall";
import { Fiction } from "../../../types/Fiction";
import { Place } from "../../../types/Place";
import { User } from "../../../types/User";

export type FictionHashTable = {
  [key: number]: Fiction;
};

export interface DataObject {
  loading: boolean;
  data: any;
  error: any;
  refetch?: () => void;
}

export interface PlaceTableProps {
  getPlaces: () => DataObject;
  fictions: DataObject;
  loggedUser?: User;
}

export const config = [
  {
    label: "#",
    key: "id",
    className:
      "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Image",
    key: "image",
    className:
      "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Place Name",
    key: "name",
    className:
      "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Fiction",
    key: "fiction",
    className:
      "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Description",
    key: "description",
    className:
      "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "State",
    key: "state",
    className:
      "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "",
    key: "actions",
    className: "relative py-3.5 pl-3 pr-4 sm:pr-3",
  },
];

export const generateDataSource = (
  places: Place[],
  fictionHashTable: FictionHashTable,
  loggedUser: any,
  editPlace: (place: Place) => void,
  deletePlace: (place: Place) => void,
  approvePlace: (place: Place) => void
) => {
  return places.map((place, index) => ({
    id: index + 1,
    image: <PlaceImageSmall place={place} />,
    name: place.name,
    fiction:
      fictionHashTable && fictionHashTable[place.fictionId] ? (
        <ContentTableTagButton
          color="grey"
          text={fictionHashTable[place.fictionId].name}
        />
      ) : (
        <ContentTableTagButton color="grey" text="No fiction" />
      ),
    description:
      place.description.length > 50
        ? `${place.description.substring(0, 50)}...`
        : place.description,
    state: place.published ? (
      <ContentTableTagButton color="emerald" text="Approved" />
    ) : (
      <>
        {place.userId !== loggedUser?.id ? (
          <ContentTableTagButton
            color="cyan"
            onClick={() => approvePlace(place)}
            text="To Review"
          />
        ) : (
          <ContentTableTagButton color="cyan" text="Pending" />
        )}
      </>
    ),
    actions: (
      <>
        <ContentTableTagButton
          color="gray"
          onClick={() => editPlace(place)}
          text="Edit"
        />
        <ContentTableTagButton
          color="red"
          onClick={() => deletePlace(place)}
          text="Delete"
        />
      </>
    ),
  }));
};
