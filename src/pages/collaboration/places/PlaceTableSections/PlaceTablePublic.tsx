import { useEffect, useMemo, useState } from "react";
import { useFictionService } from "../../../../services/useFictionService";
import { AddPlaceModal } from "../../../../components/places/placeTable/modals/AddPlaceModal";
import DeletePlaceModal from "../../../../components/places/placeTable/modals/DeletePlaceModal";
import { EditPlaceModal } from "../../../../components/places/placeTable/modals/EditPlaceModal";
import { ContentTableWrapper } from "../../../../components/common/ContentTableWrapper";
import { ContentTableView } from "../../../../components/common/ContentTableView";
import { Fiction } from "../../../../types/Fiction";
import { Place } from "../../../../types/Place";
import {
  FictionHashTable,
  config,
  generateDataSource,
} from "../PlaceTableUtils";
import { PlaceSkeleton } from "../../../../components/places/placeTable/common/PlaceSkeleton";
import { useCurrentUser } from "../../../../hooks/users/useCurrentUser/useCurrentUser";
import { Pagination } from "../../../../components/common/Pagination";
import { useFetchApprovedPlaces } from "../../../../hooks/places/useFetchApprovedPlaces/useFetchApprovedPlaces";

export const PlaceTablePublished = () => {
  const [modalAddPlaceOpen, setModalAddPlaceOpen] = useState(false);
  const [modalEditPlaceOpen, setModalEditPlaceOpen] = useState<boolean>(false);
  const [modalDeletePlaceOpen, setModalDeletePlaceOpen] =
    useState<boolean>(false);
  const [modalApprovePlaceOpen, setModalApprovePlaceOpen] =
    useState<boolean>(false);
  const { getFictions } = useFictionService();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: placesPaginated,
    isLoading: loadingPlaces,
    error,
    refetch,
  } = useFetchApprovedPlaces({ page: currentPage, size: 10, approved: true });

  const { loading: loadingFictions, data: fictions } = getFictions();

  const { data: loggedUser, isLoading: loadingUser } = useCurrentUser();
  const placesData =
    placesPaginated && placesPaginated.content ? placesPaginated.content : [];

  const [places, setPlaces] = useState<Place[]>([]);

  const [placeToDelete, setPlaceToDelete] = useState();
  const [placeToEdit, setPlaceToEdit] = useState<Place>();
  const [placeToApprove, setPlaceToApprove] = useState<Place>();

  const [fictionHashTable, setFictionHashTable] = useState<FictionHashTable>(
    {}
  );

  const isAdmin = loggedUser?.role === "ADMIN";

  useEffect(() => {
    if (placesData && placesData.length) {
      const sortedPlaces: Place[] = [...placesData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setPlaces(sortedPlaces);
    }
  }, [placesData]);

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
      isAdmin,
      isAdmin ? editPlace : () => {},  // Funciones condicionales basadas en el rol
      isAdmin ? deletePlace : () => {},
      approvePlace
    );
  }, [places, fictionHashTable, loggedUser, currentPage, isAdmin]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  if (loadingUser || !loggedUser || typeof loggedUser.role === 'undefined') {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <ContentTableWrapper
          description={"These are the approved places you have added to the system."}
          action={{ title: "Add Place", fn: setModalAddPlaceOpen }}
      >
          {loadingPlaces ? (
              <PlaceSkeleton />
          ) : (
              <>
                  <ContentTableView 
                      content={{ dataSource, config }}
                      isAdmin={isAdmin}
                  />
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
      {isAdmin && placeToEdit && (
          <EditPlaceModal
              modalOpen={modalEditPlaceOpen}
              setModalOpen={setModalEditPlaceOpen}
              placeToEdit={placeToEdit}
              setPlaces={setPlaces}
          />
      )}
      {isAdmin && (
          <DeletePlaceModal
              modalOpen={modalDeletePlaceOpen}
              setModalOpen={setModalDeletePlaceOpen}
              placeToDelete={placeToDelete}
              setPlaces={setPlaces}
          />
      )}
      <AddPlaceModal
          modalOpen={modalAddPlaceOpen}
          setModalOpen={setModalAddPlaceOpen}
          setPlaces={setPlaces}
      />
    </>
  );
};