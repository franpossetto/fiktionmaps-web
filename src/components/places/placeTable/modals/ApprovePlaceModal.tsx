import { useState } from "react";
import { ModalWrapper } from "../../../common/ModalWrapper";
import { Place } from "../../../../types/Place";
import { CitySelectorApprove } from "./CitySelectorApprove";
import { City } from "../../../../types/City";
import { useFictionService } from "../../../../services/useFictionService";

interface ApproveModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeToApprove?: Place;
  setPlaces: React.Dispatch<React.SetStateAction<any>>;
}

export const ApprovePlaceModal: React.FC<ApproveModalProps> = ({
  modalOpen,
  setModalOpen,
  placeToApprove,
  setPlaces,
}) => {
  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);
  const { approvePlace } = useFictionService();

  const handleApproveClick = () => {
    if (
      placeToApprove &&
      placeToApprove.id &&
      selectedCity &&
      selectedCity.id
    ) {
      approvePlace(placeToApprove.id, selectedCity.id)
        .then((updatedPlaceResponse) => {
          console.log(updatedPlaceResponse);
          setPlaces((prevState: Place[]) => {
            const updatedPlaces = [...prevState];
            const index = updatedPlaces.findIndex(
              (place) => place.id === updatedPlaceResponse.data.id
            );
            if (index !== -1) {
              updatedPlaces[index] = updatedPlaceResponse.data;
            }
            return updatedPlaces;
          });
        })
        .catch(() => {});
      setModalOpen(false);
    } else {
      console.error("Place or City is not selected");
    }
  };

  function handleCancel(event: any): void {
    setModalOpen(false);
    setSelectedCity(undefined);
  }

  return (
    <ModalWrapper
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={"Approve Place"}
    >
      <>
        <h2 className="my-2 text-black text-sm">
          Select the city where this Place must be shown. Click "Approve" and
          this place will be publish it.
        </h2>

        <CitySelectorApprove
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <div className="h-60"></div>
        <div className="py-3flex justify-start mt-5">
          <button
            type="button"
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:w-auto sm:text-sm bg-gray-800 hover:bg-slate-900"
            }`}
            onClick={handleApproveClick}
          >
            Approve
          </button>

          <button
            type="button"
            className="ml-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </>
    </ModalWrapper>
  );
};
