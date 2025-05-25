import { useEffect, useMemo, useState } from "react";
import { ContentTableView } from "../../../../components/common/ContentTableView";
import { ContentTableWrapper } from "../../../../components/common/ContentTableWrapper";
import { AddPlaceModal } from "../../../../components/places/placeTable/modals/AddPlaceModal";
import DeletePlaceModal from "../../../../components/places/placeTable/modals/DeletePlaceModal";
import { EditPlaceModal } from "../../../../components/places/placeTable/modals/EditPlaceModal";
import { Place } from "../../../../types/Place";
import {
  FictionHashTable,
  config,
  generateDataSource,
} from "../PlaceTableUtils";
import { Fiction } from "../../../../types/Fiction";
import { PlaceSkeleton } from "../../../../components/places/placeTable/common/PlaceSkeleton";
import { useCurrentUser } from "../../../../hooks/users/useCurrentUser/useCurrentUser";
import { Pagination } from "../../../../components/common/Pagination";
import { useFetchPlacesByUser } from "../../../../hooks/places/useFetchPlacesByUser/useFetchPlacesByUser";
import { useFetchFictions } from "../../../../hooks/fictions/useFetchFictions/useFetchFictions";

export const PlaceTableUser = () => {
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: placesPaginated,
    isLoading: loadingPlaces,
    error,
    refetch,
  } = useFetchPlacesByUser({ page: currentPage, size: 10 });
  const { data: fictions, isLoading: loadingFictions } = useFetchFictions();

  const { data: loggedUser, isLoading: loadingUser } = useCurrentUser();

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const placesData =
    placesPaginated && placesPaginated.content ? placesPaginated.content : [];
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
    if (placesData && placesData.length) {
      const sortedPlaces: Place[] = [...placesData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const filteredPlaces: Place[] = sortedPlaces.filter(
        (place) => place.userId === loggedUser?.id
      );
      setPlaces(filteredPlaces);
    }
  }, [placesData, loggedUser]);

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

  const dataSource = useMemo(() => {
    if (!loggedUser || !loggedUser.role) return [];

    return generateDataSource(
      places,
      fictionHashTable,
      loggedUser,
      currentPage,
      true,
      loggedUser?.role == "USER", // revisar esto luego, esta mal. 
      editPlace,
      deletePlace,
      approvePlace
    );
  }, [places, fictionHashTable, loggedUser, currentPage]);

  if (loadingUser || !loggedUser || typeof loggedUser.role === 'undefined') {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <ContentTableWrapper
        description={"These are the places you have added to the system."}
        action={{ title: "Add Place", fn: setModalAddFictionOpen }}
      >
        {loadingPlaces || loadingFictions ? (
          <PlaceSkeleton />
        ) : (
          <>
            <ContentTableView content={{ dataSource, config }} isAdmin={false} />
            <div className="fixed bottom-0 left-0 w-full bg-white h-14 border-gray-100 border-t-2 pt-4">
              <div className="flex justify-center items-center">
                <Pagination
                  totalPages={placesPaginated?.totalPages || 0}
                  currentPage={placesPaginated?.currentPage || 0}
                  totalElements={placesPaginated?.totalElements || 0}
                  pageSize={10}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </>
        )}
      </ContentTableWrapper>
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
      <AddPlaceModal
        modalOpen={modalAddFictionOpen}
        setModalOpen={setModalAddFictionOpen}
        setPlaces={setPlaces}
      />
    </>
  );
};
