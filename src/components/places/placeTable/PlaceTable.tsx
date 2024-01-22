import { useEffect, useState } from "react";
import { useFictionService } from "../../../services/useFictionService";
import { Place } from "../../../types/Place";
import { AddPlaceModal } from "./modals/AddPlaceModal";
import DeletePlaceModal from "./modals/DeletePlaceModal";
import { EditPlaceModal } from "./modals/EditPlaceModal";
import { Fiction } from "../../../types/Fiction";
import { ApprovePlaceModal } from "./modals/ApprovePlaceModal";
import { PlaceImageSmall } from "./common/PlaceImageSmall";

type FictionHashTable = {
  [key: number]: Fiction;
};

export const PlaceTable = () => {
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);
  const { getPlaces, deletePlaceFromFiction, getFictions, getPlacesByUser } =
    useFictionService();
  const { loading, data, error, refetch } = getPlaces();
  const placesbyUser = getPlacesByUser();
  const { data: fictions } = getFictions();

  const [places, setPlaces] = useState<Place[]>([]);

  const [modalEditPlaceOpen, setModalEditPlaceOpen] = useState<boolean>(false);
  const [modalDeletePlaceOpen, setModalDeletePlaceOpen] =
    useState<boolean>(false);
  const [modalApprovePlaceOpen, setModalApprovePlaceOpen] =
    useState<boolean>(false);

  const [placeToDelete, setPlaceToDelete] = useState();
  const [placeToEdit, setPlaceToEdit] = useState<Place>();
  const [placeToApprove, setPlaceToApprove] = useState<Place>();

  const [fictionHashTable, setFictionHashTable] = useState<FictionHashTable>(
    {}
  );

  useEffect(() => {
    placesbyUser.then((resp) => {
      const sortedPlaces: Place[] = [...resp.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPlaces(sortedPlaces);
    });
  }, [placesbyUser]);

  useEffect(() => {
    if (data) {
      const sortedPlaces: Place[] = [...data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPlaces(sortedPlaces);
    }
  }, [data]);

  useEffect(() => {
    if (fictions) {
      const newHashTable: FictionHashTable = {};
      fictions.forEach((fiction: Fiction) => {
        newHashTable[fiction.id] = fiction;
      });
      setFictionHashTable(newHashTable);
    }
  }, [fictions]);

  const editPlace = (place: Place) => {
    setPlaceToEdit(place);
    setModalEditPlaceOpen(true);
  };

  const deletePlace = (place: any) => {
    setPlaceToDelete(place);
    setModalDeletePlaceOpen(true);
  };

  const approvePlace = (place: any) => {
    setPlaceToApprove(place);
    setModalApprovePlaceOpen(true);
  };

  return (
    <div className="pl-32 pr-12 pt-6 lg:w-[100%] w-[90%]">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg p-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Places
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the places in the system .
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setModalAddFictionOpen(true)}
            >
              Add Place
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root text-xs">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                    >
                      Place Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                    >
                      Fiction
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3"
                    >
                      State
                    </th>
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
                    places.map((place: Place, index) => (
                      <tr key={place.id} className="even:bg-gray-50">
                        <td
                          className="whitespace-nowrap py-1 font-normal text-gray-900 sm:pl-3"
                          style={{ width: "1%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="whitespace-nowrap py-1 font-normal text-gray-900 sm:pl-3"
                          style={{ width: "5%" }}
                        >
                          <PlaceImageSmall place={place} />
                        </td>
                        <td
                          className="whitespace-nowrap py-1 font-normal text-gray-900 sm:pl-3"
                          style={{ width: "20%" }}
                        >
                          {place.name}
                        </td>
                        {fictionHashTable && (
                          <td
                            className="whitespace-nowrap px-3 py-1 font-normal"
                            style={{ width: "20%" }}
                          >
                            <span className="bg-slate-100 text-black py-1 px-2 rounded-lg">
                              {fictionHashTable[place.fictionId]?.name}
                            </span>
                          </td>
                        )}
                        <td
                          className="whitespace-nowrap py-1 font-normal text-gray-900 sm:pl-3"
                          style={{ width: "30%" }}
                        >
                          {place.description.length > 50
                            ? `${place.description.substring(0, 50)}...`
                            : place.description}
                        </td>

                        <td className="whitespace-nowrap py-1 font-normal">
                          {place.published ? (
                            <button className="rounded-lg text-gray-800  px-3 py-[3px] bg-emerald-100">
                              Approved
                            </button>
                          ) : (
                            <button
                              className="rounded-lg text-gray-800 px-3 py-[3px] bg-amber-100 hover:bg-amber-300"
                              onClick={() => approvePlace(place)}
                            >
                              In Review
                            </button>
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-2 text-right font-medium">
                          <button
                            className="rounded-lg px-3 py-[3px] text-gray-800 hover:bg-gray-300 bg-gray-100"
                            onClick={() => editPlace(place)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-lg text-gray-800 px-3 py-[3px] ml-2 bg-red-100 hover:bg-red-300"
                            onClick={() => deletePlace(place)}
                          >
                            Delete{" "}
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
      <AddPlaceModal
        modalOpen={modalAddFictionOpen}
        setModalOpen={setModalAddFictionOpen}
        setPlaces={setPlaces}
      />
      {placeToEdit && (
        <EditPlaceModal
          modalOpen={modalEditPlaceOpen}
          setModalOpen={setModalEditPlaceOpen}
          placeToEdit={placeToEdit}
          setPlaces={setPlaces}
        />
      )}
      <DeletePlaceModal
        modalOpen={modalDeletePlaceOpen}
        setModalOpen={setModalDeletePlaceOpen}
        placeToDelete={placeToDelete}
        setPlaces={setPlaces}
      />
      <ApprovePlaceModal
        modalOpen={modalApprovePlaceOpen}
        setModalOpen={setModalApprovePlaceOpen}
        placeToApprove={placeToApprove}
        setPlaces={setPlaces}
      />
    </div>
  );
};

export default PlaceTable;
