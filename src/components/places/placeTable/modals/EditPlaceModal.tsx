import { useEffect, useState } from "react";
import { SearchPlace } from "../../searchPlace/SearchPlace";
import { PlaceFictionSelector } from "../common/PlaceFictionSelector";
import { ModalWrapper } from "../../../common/ModalWrapper";
import PlaceDetails from "../common/PlaceDetails";
import { Place } from "../../../../types/Place";
import { ImageInput } from "../common/ImageInput";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../config/firebase";
import { useFetchFictionById } from "../../../../hooks/fictions/useFetchFictionById/useFetchFictionById";
import { useUpdatePlace } from "../../../../hooks/places/useUpdatePlace/useUpdatePlace";
import { APIProvider } from "@vis.gl/react-google-maps";

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

  const { mutate: updatePlace } = useUpdatePlace();

  const { data: fiction, isLoading: loadingFiction } = useFetchFictionById(placeToEdit.fictionId);
  const [fictionName, setSetFictionName] = useState<string>("");

  const [imageFile, setImageFile] = useState<any>(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const handleImageChange = (e: { target: { files: any[] } }) => {
    setImageFile(e.target.files[0]);
  };

  console.log("placeToEdit", placeToEdit);

  const uploadImage = async (
    fictionId: any,
    placeName: string,
    imageFile: File
  ) => {
    if (!imageFile) return null;

    const uniqueFileName = `${new Date().getTime()}_${imageFile.name}`;
    const storageRef = ref(storage, `fiction_places/${fictionId}/${uniqueFileName}`);

    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      return snapshot.ref.fullPath;
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      return null;
    }
  };

  useEffect(() => {
    if (fiction) {
      setSetFictionName(fiction.name);
    }
  }, [fiction]);

  const handlePlaceNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaceName(e.target.value);

  const handlePlaceDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => setPlaceDescription(e.target.value);

  const handleFictionPlaceSave = async () => {
    setLoadingImg(true);

    let imagePath: string | undefined = placeToEdit.screenshot;

    if (imageFile) {
      const uploadedImagePath = await uploadImage(
        placeToEdit?.fictionId,
        placeName || "",
        imageFile
      );
      if (uploadedImagePath !== null) {
        imagePath = uploadedImagePath;
      }
    }
    const pl: Place = {
      name: placeName || placeToEdit.name,
      description: placeDescription || placeToEdit.description,
      location: {
        latitude: placeToEdit.location.latitude,
        longitude: placeToEdit.location.longitude,
        formattedAddress: placeToEdit.location.formattedAddress,
        placeId: placeToEdit.location.placeId,
      },
      screenshot: imagePath || undefined,
      fictionId: placeToEdit?.fictionId,
      scenes: [],
      published: false,
    };

    //TODO removed old image if new image is uploaded
    //TODO update location if it has changed.

    updatePlace(
      { placeId: placeToEdit.id || 0, place: pl },
      {
        onSuccess: (updatedPlace) => {
          setPlaces((prevState: Place[]) => {
            const updatedPlaces = [...prevState];
            const index = updatedPlaces.findIndex(
              (place) => place.id === updatedPlace.id
            );
            if (index !== -1) {
              updatedPlaces[index] = updatedPlace;
            }
            return updatedPlaces;
          });
          setModalOpen(false);
          resetInputs();
        },
        onError: (error) => {
          console.error("Error updating place:", error);
        },
        onSettled: () => {
          setLoadingImg(false);
        }
      }
    );
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
      <APIProvider 
        apiKey={import.meta.env.VITE_GMAPS_API_KEY} 
        libraries={['places']}
        onLoad={() => console.log('Google Maps API loaded')}
        onError={(error) => console.error('Error loading Google Maps API:', error)}
      >
        <>
          <h2 className="my-2 text-black text-sm dark:text-white">
            See or edit this place.
          </h2>
          <div className="mt-4">
            <PlaceFictionSelector fiction={fictionName} />
            <label
              htmlFor="fiction-name"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mt-4"
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="mt-4">
            <ImageInput
              handleImageChange={handleImageChange}
              placeholder={placeToEdit?.screenshot}
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="scene-description"
              className="block text-sm font-medium leading-6 text-gray-950 dark:text-gray-100"
            >
              Place Description
            </label>
            <textarea
              id="scene-description"
              name="scene-description"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-100 dark:bg-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={placeToEdit?.description}
              value={placeDescription}
              onChange={handlePlaceDescriptionChange}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="ml-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm"
              onClick={handleFictionPlaceCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleFictionPlaceSave}
              disabled={loadingImg}
            >
              {loadingImg ? "Saving..." : "Save"}
            </button>
          </div>
        </>
      </APIProvider>
    </ModalWrapper>
  );
};
