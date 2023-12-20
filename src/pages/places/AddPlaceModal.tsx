import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { SearchPlace } from "../../components/places/SearchPlace";
import { PlaceFictionSelector } from "./PlaceFictionSelector";
import { ModalWrapper } from "../../components/common/ModalWrapper";
import { title } from "process";
import PlaceDetails from "./PlaceDetails";
import { useSceneController } from "../../contexts/SceneContext";
import { Fiction } from "../../types/Fiction";
import { useFictionService } from "../../services/useFictionService";
import { Place } from "../../types/Place";
import { toast } from "react-toastify";

interface LogoutModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddPlaceModal: React.FC<LogoutModalProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [fiction, setFiction] = useState<Fiction>();
  const [place, setPlace] = useState<Place>();

  const { place: plc, fiction: fct } = useSceneController();
  const { addPlaceToFiction } = useFictionService();

  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setPlace(plc);
  }, [plc]);

  useEffect(() => {
    setFiction(fct);
  }, [fct]);

  const handlePlaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceName(e.target.value);

  const handlePlaceDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setPlaceDescription(e.target.value);

  const handleFictionPlaceSubmit = () => {
    validateForm();
    const pl: Place = {
      name: placeName,
      description: placeDescription,
      location: {
        latitude: plc?.place.latitude,
        longitude: plc?.place.longitude,
        formattedAddress: plc?.place.formatted_address,
        placeId: plc?.place.place_id,
      },
      screenshot: undefined,
      userId: 1,
      fiction_id: fiction?.id || 0,
      scenes: [],
    };
    addPlaceToFiction(fiction?.id, pl);
    setModalOpen(false);
  };

  const handleFictionPlaceCancel = () => {
    setFiction(undefined);
    setPlace(undefined);
    setPlaceName("");
    setPlaceDescription("");
    setModalOpen(false);
  };

  const validateForm = () => {
    let error = "";

    if (!fiction || !fiction.id) {
      toast.error("You must select a valid Fiction");
    } else if (
      !plc.place.latitude ||
      !plc.place.longitude ||
      !plc.place.formatted_address ||
      !plc.place.place_id
    ) {
      toast.error("You must select a valid location");
    } else if (!placeName || !placeDescription) {
      toast.error("You must select a valid name and description");
    }
  };

  return (
    <ModalWrapper
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={"Add a Place"}
    >
      <>
        <h2 className="my-2 text-black text-sm">
          To add a new Place, select the Fiction and add information about the
          it. The location is mandatory!
        </h2>
        <div className="mt-4">
          <PlaceFictionSelector />
          <label
            htmlFor="fiction-name"
            className="block text-sm font-medium leading-6 text-gray-900 mt-4"
          >
            Place Name
          </label>
          <input
            type="text"
            name="scene-name"
            id="scene-name"
            placeholder="Mooney's"
            value={placeName}
            onChange={handlePlaceNameChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="scene-description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Place Description
          </label>
          <textarea
            id="scene-description"
            name="scene-description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Joe Golberg´s Bookstore"
            value={placeDescription}
            onChange={handlePlaceDescriptionChange}
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Location
          </label>
          <SearchPlace placeholder={"1575 York Ave, New York, NY 10028"} />
          <PlaceDetails />
        </div>

        <div className="py-3 flex justify-start mt-5">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none sm:w-auto sm:text-sm"
            onClick={handleFictionPlaceSubmit}
          >
            Add Place
          </button>

          <button
            type="button"
            className="ml-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm"
            onClick={handleFictionPlaceCancel}
          >
            Cancel
          </button>
        </div>
      </>
    </ModalWrapper>
  );
};
