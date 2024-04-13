import { ContentTableTagButton } from "../../../components/common/ContentTableTagButton";
import { PlaceImageSmall } from "../../../components/places/placeTable/common/PlaceImageSmall";
import { Fiction } from "../../../types/Fiction";
import { Place } from "../../../types/Place";
import { User } from "../../../types/User";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

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
      "py-3.5 pl-0 pr-2 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Place Name",
    key: "name",
    className:
      "py-3.5 pl-0 pr-2 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Fiction",
    key: "fiction",
    className:
      "py-3.5 pl-0 pr-2 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "Description",
    key: "description",
    className:
      "py-3.5 pl-0 pr-2 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "State",
    key: "state",
    className:
      "py-3.5 pl-0 pr-2 text-left font-semibold text-gray-900 sm:pl-3 dark:text-white",
  },
  {
    label: "",
    key: "actions",
    className: "relative py-3.5 pl-3 pr-4 sm:pr-3",
  },
];

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

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
    name: (
      <div>
        <span className="sm:hidden mr-2">{truncateText(place.name, 15)}</span>
        <span className="hidden sm:inline">{place.name}</span>
      </div>
    ),
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
      <ContentTableTagButton
        color="emerald"
        text="Approved"
        icon={
          <CheckCircleIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        }
      />
    ) : (
      <>
        {place.userId !== loggedUser?.id ? (
          <ContentTableTagButton
            color="cyan"
            onClick={() => approvePlace(place)}
            text="To Review"
            icon={
              <QuestionMarkCircleIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            }
          />
        ) : (
          <ContentTableTagButton
            color="cyan"
            text="Pending"
            icon={
              <ExclamationCircleIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
            }
          />
        )}
      </>
    ),
    actions: (
      <>
        <ContentTableTagButton
          color="gray"
          onClick={() => editPlace(place)}
          text="Edit"
          icon={
            <PencilSquareIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          }
        />
        <ContentTableTagButton
          color="red"
          onClick={() => deletePlace(place)}
          text="Delete"
          icon={
            <TrashIcon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          }
        />
      </>
    ),
  }));
};
