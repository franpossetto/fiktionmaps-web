import { useEffect, useState } from "react";
import { SearchPlace } from "../../components/places/SearchPlace";
import { PlaceFictionSelector } from "./PlaceFictionSelector";
import { ModalWrapper } from "../../components/common/ModalWrapper";
import PlaceDetails from "./PlaceDetails";
import { usePlaceController } from "../../contexts/PlaceContext";
import { useFictionService } from "../../services/useFictionService";
import { Place } from "../../types/Place";
import { toast } from "react-toastify";
import { ImageInput } from "./ImageInput";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";

interface EditModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  placeToEdit: Place;
  setPlaces: React.Dispatch<React.SetStateAction<any>>;
}

export const EditPlaceModal: React.FC<EditModalProps> = ({
  modalOpen,
  setModalOpen,
  placeToEdit,
  setPlaces,
}) => {
  const [placeName, setPlaceName] = useState<string>();
  const [placeDescription, setPlaceDescription] = useState<string>();

  const { updatePlaceFromFiction } = useFictionService();
  const { place } = usePlaceController();

  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const { getFictionById } = useFictionService();
  const { loading, data, error } = getFictionById(placeToEdit.fictionId);
  const [fictionName, setSetFictionName] = useState<string>("");

  const [imageFile, setImageFile] = useState<any>(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleImageChange = (e: { target: { files: any[] } }) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async (
    fictionId: any,
    placeName: string,
    imageFile: File
  ) => {
    if (!imageFile) return null;

    const uniqueFileName = `${new Date().getTime()}_${imageFile.name}`;
    const finalFileName = `${uniqueFileName}_${placeName}`;
    const storageRef = ref(storage, `fictions/${fictionId}/${finalFileName}`);

    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      return snapshot.ref.fullPath;
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      return null;
    }
  };

  async function getSha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // Convierte el array a un string hexadecimal
    return hashHex;
  }

  useEffect(() => {
    if (data) {
      setSetFictionName(data.name);
    }
  }, [data]);

  const handlePlaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceName(e.target.value);

  const handlePlaceDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setPlaceDescription(e.target.value);

  const handleFictionPlaceSave = async () => {
    setLoadingImg(true);

    const imagePath = await uploadImage(
      place?.fictionId,
      placeName || "",
      imageFile
    );

    const pl: Place = {
      name: placeName || placeToEdit.name,
      description: placeDescription || placeToEdit.description,
      location: {
        latitude: place?.location.latitude || placeToEdit.location.latitude,
        longitude: place?.location.longitude || placeToEdit.location.longitude,
        formattedAddress:
          place?.location.formattedAddress ||
          placeToEdit.location.formattedAddress,
        placeId: place?.location.placeId || placeToEdit.location.placeId,
      },
      screenshot: imagePath || undefined,
      fictionId: placeToEdit?.fictionId,
      scenes: [],
    };

    updatePlaceFromFiction(placeToEdit?.id, pl)
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
      .catch(() => {})
      .finally(() => {
        resetInputs();
      });
    setModalOpen(false);
  };

  const resetInputs = () => {
    setPlaceName("");
    setPlaceDescription("");
  };

  const handleFictionPlaceCancel = () => {
    setModalOpen(false);
  };

  return (
    <ModalWrapper
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={"Edit Place"}
    >
      <>
        <h2 className="my-2 text-black text-sm">See or edit this place.</h2>
        <div className="mt-4">
          <PlaceFictionSelector fiction={fictionName} />
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
            placeholder={placeToEdit?.name}
            value={placeName}
            onChange={handlePlaceNameChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="mt-4">
          <ImageInput
            handleImageChange={handleImageChange}
            placeholder={place?.screenshot}
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
            placeholder={placeToEdit?.description}
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
          <SearchPlace selectedPlace={placeToEdit} />
          <PlaceDetails />
        </div>

        <div className="py-3 flex justify-start mt-5">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none sm:w-auto sm:text-sm"
            onClick={handleFictionPlaceSave}
          >
            Update Place
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
