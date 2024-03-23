import React, { useEffect, useMemo, useState } from "react";
import { useFictionService } from "../../../../services/useFictionService";
import { ApprovePlaceModal } from "../../../../components/places/placeTable/modals/ApprovePlaceModal";
import { AddPlaceModal } from "../../../../components/places/placeTable/modals/AddPlaceModal";
import DeletePlaceModal from "../../../../components/places/placeTable/modals/DeletePlaceModal";
import { EditPlaceModal } from "../../../../components/places/placeTable/modals/EditPlaceModal";
import { ContentTableWrapper } from "../../../../components/common/ContentTableWrapper";
import { ContentTableView } from "../../../../components/common/ContentTableView";
import { Fiction } from "../../../../types/Fiction";
import { Place } from "../../../../types/Place";
import { User } from "../../../../types/User";
import {
  FictionHashTable,
  config,
  generateDataSource,
} from "../PlaceTableUtils";
import { PlaceSkeleton } from "../../../../components/places/placeTable/common/PlaceSkeleton";
import { useUserService } from "../../../../services/useUserService";

export const PlaceTablePublished = () => {
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);
  const { getFictions, getPlaces } = useFictionService();

  const {
    loading: loadingPlaces,
    data: placesData,
    error,
    refetch,
  } = getPlaces(true);
  const { loading: loadingFictions, data: fictions } = getFictions();
  const [loggedUser, setLoggedUser] = useState<User>();

  const { getCurrentUser } = useUserService();
  const getUserInfo = async () => {
    const response = await getCurrentUser();
    setLoggedUser(response);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
    return generateDataSource(
      places,
      fictionHashTable,
      loggedUser,
      editPlace,
      deletePlace,
      approvePlace
    );
  }, [places, fictionHashTable, loggedUser]);

  return (
    <>
      <ContentTableWrapper
        title={"Places"}
        description={
          "These are the approved places that you have added to the system. You can find these places on the map."
        }
        action={{ title: "Add Place", fn: setModalAddFictionOpen }}
      >
        {loadingPlaces ? (
          <PlaceSkeleton />
        ) : (
          <ContentTableView content={{ dataSource, config }} />
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
      <ApprovePlaceModal
        modalOpen={modalApprovePlaceOpen}
        setModalOpen={setModalApprovePlaceOpen}
        placeToApprove={placeToApprove}
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

export default PlaceTablePublished;
