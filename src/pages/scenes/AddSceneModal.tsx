import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useFictionService } from "../../services/useFictionService";
import { SearchPlace } from "../../components/places/SearchPlace";
import { InputSearchFiction } from "./InputSearchFiction";
import { useMapController } from "../../contexts/MapContext";
import { Fiction } from "../../types/Fiction";
import { Scene } from "../../types/Scene";
import { useSceneController } from "../../contexts/SceneContext";

interface LogoutModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSceneModal: React.FC<LogoutModalProps> = ({
  modalOpen,
  setModalOpen,
}) => {
 
  const [place, setPlace] = useState();
  const [fictionToSave, setFictionToSave] = useState<Fiction>();
  const { fictionsSelected } = useMapController();
  const { place:plc } = useSceneController();

  useEffect(() => {
    if (fictionsSelected?.length == 1) {
      setFictionToSave(fictionsSelected[0]);
    } else {
      setFictionToSave(undefined);
    }
    console.log(fictionsSelected);
  }, [fictionsSelected]);


  const [sceneName, setSceneName] = useState<string>("");
  const [sceneDescription, setSceneDescription] = useState<string>("");
  const [sceneSeason, setSceneSeason] = useState<any>();
  const [sceneEpisodeName, setSceneEpisodeName] = useState<any>();
  const [sceneEpisodeNumber, setSceneEpisodeNumber] = useState<any>();
  const [sceneStartAt, setSceneStartAt] = useState<number>(0);
  const [sceneEndAt, setSceneEndAt] = useState<number>(0);
  const [sceneScreenShot, setSceneScreenShot] = useState<any>();
  const [sceneSegmentType, setSceneSegmentType] = useState<any>();


  function handleCancel(): void {
    throw new Error("Function not implemented.");
  }

  
  const cleanInputs = () => {
    setSceneName("");
    setSceneDescription("");
    setSceneSeason("");
    setSceneEpisodeName("");
    setSceneEpisodeNumber("");
    setSceneStartAt(0);
    setSceneEndAt(0);
    setSceneScreenShot("");
    setSceneSegmentType("");

  };

  const { addSceneToFiction } = useFictionService();

  const handleCreateSceneClick = () => {

    console.log(plc)
    
    const scene: Scene = {
      name: sceneName,
      description: sceneDescription,
      season: sceneSeason,
      episodeName: sceneEpisodeName,
      episodeNumber: sceneEpisodeNumber,
      startAt: sceneStartAt,
      endAt: sceneEndAt,
      location: {
        latitude: plc.place.latitude,
        longitude: plc.place.longitude,
        formattedAddress: plc.place.placeformatted_address,
        placeId: plc.place.place_id,
        id: plc.place.id,
      },
      userId:1,
    };

    console.log(scene);

    addSceneToFiction(fictionToSave?.id, scene)
      .then((response) => {
        console.log(response);
        setModalOpen(false);
        cleanInputs();
      })
      .catch((error) => {
        console.error("Error creating fiction:", error);
      })
      .finally(() => {
        cleanInputs();
      });
  };

  const handleSceneNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSceneName(event.target.value);
  };

  const handleSceneDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSceneDescription(event.target.value);
  };

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setModalOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      Add Scene
                    </Dialog.Title>
                        <h2 className="my-5 text-black text-sm">
                          To add a new Scene, select the Fiction and add information about the
                          Scene. The location is mandatory!
                        </h2>
                        <div className="space-x-4 flex items-center">
                          <div className="flex items-center">
                            <input
                              id="movie"
                              name="genre"
                              type="radio"
                              checked
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="movie"
                              className="block text-sm font-medium leading-6 text-gray-900 ml-2"
                            >
                              Movie
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="tv-show"
                              name="genre"
                              type="radio"
                              disabled
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="tv-show"
                              className="block text-sm font-medium leading-6 text-gray-900 ml-2"
                            >
                              TV Show
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="book"
                              name="genre"
                              type="radio"
                              disabled
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="book"
                              className="block text-sm font-medium leading-6 text-gray-900 ml-2"
                            >
                              Book
                            </label>
                          </div>
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="fiction-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Fiction Name
                          </label>
                          
                          <InputSearchFiction />
                          <label
                            htmlFor="scene-name"
                            className="block text-sm font-medium leading-6 text-gray-900 mt-3"
                          >
                            Scene Name
                          </label>
                          <input
                            type="text"
                            name="scene-name"
                            id="scene-name"
                            value={sceneName}
                            onChange={handleSceneNameChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="mt-4"></div>
                        <div className="mt-4">
                          <label
                            htmlFor="scene-description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Scene Description
                          </label>
                          <textarea
                            id="scene-description"
                            name="scene-description"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={sceneDescription}
                            onChange={handleSceneDescriptionChange}
                          />
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Location
                          </label>
                          <SearchPlace setPlace={setPlace} place={place} />
                          
                        </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-slate-900 focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    handleCreateSceneClick();
                  }}
                >
                  Add Scene
                </button>
                <button
                  type="button"
                  className="ml-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddSceneModal;