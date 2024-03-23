import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlaceUser } from "../../../placeView/common/PlaceUser";
import { Place } from "../../../../../types/Place";

interface PlaceCloseCardProps {
  place: Place;
  setOpen: (open: boolean) => void;
}

export const PlaceCloseCard: React.FC<PlaceCloseCardProps> = ({
  place,
  setOpen,
}) => {
  return (
    <div className="pl-5 py-3">
      <div className="flex items-start justify-between">
        {place ? (
          <PlaceUser email={place.userEmail} />
        ) : (
          <div>Loading user...</div>
        )}
        <div className="flex h-7 items-center mr-6 mt-2">
          <button
            type="button"
            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 p-3"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
