import { useEffect, useState } from "react";
import { SearchPlace } from "../../searchPlace/SearchPlace";
import { PlaceFictionSelector } from "../common/PlaceFictionSelector";
import { ModalWrapper } from "../../../common/ModalWrapper";
import PlaceDetails from "../common/PlaceDetails";
import { usePlaceController } from "../../../../contexts/PlaceContext";
import { Fiction } from "../../../../types/Fiction";
import { useFictionService } from "../../../../services/useFictionService";
import { Place } from "../../../../types/Place";
import placeholder from "../common/Placeholder";
import { ImageInput } from "../common/ImageInput";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../config/firebase";

interface LogoutModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaces: React.Dispatch<React.SetStateAction<any>>;
}

export const AddPlaceModal: React.FC<LogoutModalProps> = ({
  modalOpen,
  setModalOpen,
  setPlaces,
}) => {
  const [placeName, setPlaceName] = useState("");
  const [placeDescription, setPlaceDescription] = useState("");
  const [fiction, setFiction] = useState<Fiction>();
  // const [place, setPlace] = useState<Place>();

  const { place: plc, fiction: fct } = usePlaceController();
  const { addPlaceToFiction, getFictions } = useFictionService();
  const [isFormValid, setIsFormValid] = useState(false);

  const [imageFile, setImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: { target: { files: any[] } }) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async (fictionId: any, imageFile: File) => {
    if (!imageFile) return null;

    const uniqueFileName = `${new Date().getTime()}_${imageFile.name}`;
    const finalFileName = `${uniqueFileName}`; // todo: modify
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
    setFiction(fct);
  }, [fct]);

  const handlePlaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceName(e.target.value);

  const handlePlaceDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setPlaceDescription(e.target.value);

  const handleFictionPlaceSubmit = async () => {
    setLoading(true);

    const imagePath = await uploadImage(fiction?.id, imageFile);

    const pl: Place = {
      name: placeName,
      description: placeDescription,
      location: {
        latitude: plc?.location.latitude || 0,
        longitude: plc?.location.longitude || 0,
        formattedAddress: plc?.location.formattedAddress || "not defined",
        placeId: plc?.location.placeId || "0",
      },
      screenshot: imagePath || undefined,
      fictionId: fiction?.id || 0,
      scenes: [],
      published: false,
      userId: 0,
      userEmail: "", //not necesary
    };

    addPlaceToFiction(fiction?.id, pl)
      .then((p) => {
        setPlaces((prevPlaces: Place[]) => [...prevPlaces, p.data]);
      })
      .catch(() => {});
    setLoading(false);

    setModalOpen(false);
    resetForm();
  };

  const handleFictionPlaceCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFiction(undefined);
    // setPlace(undefined);
    setPlaceName("");
    setPlaceDescription("");
    setModalOpen(false);
  };

  useEffect(() => {
    const isValid =
      placeName !== "" &&
      placeDescription !== "" &&
      fiction != undefined &&
      plc != undefined;

    setIsFormValid(isValid);
  }, [placeName, placeDescription, fiction, plc]);

  return (
    <ModalWrapper
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={"Add a Place"}
    >
      <>
        <h2 className="my-2 text-black text-sm dark:text-gray-300">
          To add a new Place, select the Fiction and add information about the
          it. The location is mandatory!
        </h2>
        <div className="mt-4">
          <PlaceFictionSelector />
          <label
            htmlFor="fiction-name"
            className="block text-sm font-medium leading-6 text-gray-900 mt-4 dark:text-gray-300"
          >
            Place Name
          </label>
          <input
            type="text"
            name="scene-name"
            id="scene-name"
            placeholder={placeholder.name}
            value={placeName}
            onChange={handlePlaceNameChange}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:ring-gray-700 dark:text-white"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="scene-description"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Place Description
          </label>
          <textarea
            id="scene-description"
            name="scene-description"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-900 dark:ring-gray-700 dark:text-white"
            placeholder={placeholder.description}
            value={placeDescription}
            onChange={handlePlaceDescriptionChange}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Place Screenshoot
          </label>
          <ImageInput handleImageChange={handleImageChange} />
        </div>

        <div className="mt-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
          >
            Location
          </label>
          <SearchPlace />
          <PlaceDetails />
        </div>

        <div className="py-3 flex justify-start mt-5">
          {!loading ? (
            <button
              type="button"
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none sm:w-auto sm:text-sm ${
                isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-500"
                  : "bg-indigo-600 cursor-not-allowed"
              }`}
              onClick={handleFictionPlaceSubmit}
              disabled={!isFormValid}
            >
              Add Place
            </button>
          ) : (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          <button
            type="button"
            className="ml-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-smdark:bg-black dark:bg-black dark:hover:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            onClick={handleFictionPlaceCancel}
          >
            Cancel
          </button>
        </div>
      </>
    </ModalWrapper>
  );
};
