import { useEffect, useState } from "react";
import { useFictionService } from "../../../services/useFictionService";
import { Scene } from "../../../types/Scene";
import AddSceneModal from "./AddSceneModal";

export default function SceneTable() {
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);
  const [modalDeleteFictionOpen, setModalDeleteFictionOpen] = useState(false);
  const [selectedFiction, setSelectedFiction] = useState();
  const { getScenes, deleteFiction } = useFictionService();
  const { loading, data, error } = getScenes();
  const [scenes, setScenes] = useState<Scene[]>([]);

  useEffect(() => {
    if (data) {
      const sortedScenes: Scene[] = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setScenes(sortedScenes);
    }
  }, [data]);

  // const _deleteFiction = (fiction: any) => {
  //   setSelectedFiction(fiction);
  //   setModalDeleteFictionOpen(true);
  // };

  return (
    <div className="pl-32 pt-6 lg:w-[1200px] w-[90%]">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg p-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Scenes
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the scenes in the system .
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setModalAddFictionOpen(true)}
            >
              Add Scene
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Name
                    </th>
                    {/* <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th> */}

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {!loading ? (
                    scenes.map((scene: Scene) => (
                      <tr key={scene.id} className="even:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {scene.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {scene.name}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {scene.description}
                        </td> */}
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <button
                            // onClick={() => {
                            //   _deleteFiction(fiction);
                            // }}
                            className="text-red-600 hover:text-indigo-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <h1>loading</h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddSceneModal
        modalOpen={modalAddFictionOpen}
        setModalOpen={setModalAddFictionOpen}
      />
      {/* <DeleteFictionModal modalOpen={modalDeleteFictionOpen} setModalOpen={setModalDeleteFictionOpen} fictionToDelete={selectedFiction} setFictions = {setFictions}/> */}
    </div>
  );
}
