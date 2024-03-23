import { useEffect, useMemo, useState } from "react";
import ContentTableTagButton from "../../../../components/common/ContentTableTagButton";
import { ContentTableView } from "../../../../components/common/ContentTableView";
import { ContentTableWrapper } from "../../../../components/common/ContentTableWrapper";
import { PlaceImageSmall } from "../../../../components/places/placeTable/common/PlaceImageSmall";
import { AddPlaceModal } from "../../../../components/places/placeTable/modals/AddPlaceModal";
import { ApprovePlaceModal } from "../../../../components/places/placeTable/modals/ApprovePlaceModal";
import DeletePlaceModal from "../../../../components/places/placeTable/modals/DeletePlaceModal";
import { EditPlaceModal } from "../../../../components/places/placeTable/modals/EditPlaceModal";
import { Place } from "../../../../types/Place";
import { FictionHashTable, config } from "../PlaceTableUtils";
import { Fiction } from "../../../../types/Fiction";
import { User } from "../../../../types/User";
import { useFictionService } from "../../../../services/useFictionService";
import { PlaceSkeleton } from "../../../../components/places/placeTable/common/PlaceSkeleton";
import { useUserService } from "../../../../services/useUserService";

export const PlaceTableReview = () => {
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<User>();
  const { getFictions, getPlaces } = useFictionService();
  const {
    loading: loadingPlaces,
    data: placesData,
    error,
    refetch,
  } = getPlaces(false);
  const { getCurrentUser } = useUserService();
  const { loading: loadingFictions, data: fictions } = getFictions();
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
    getUserInfo();
  }, []);

  useEffect(() => {
    if (loadingPlaces || loadingFictions) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingPlaces, loadingFictions]);

  useEffect(() => {
    if (placesData && placesData.length) {
      const sortedPlaces: Place[] = [...placesData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const filteredPlaces: Place[] = sortedPlaces.filter(
        (place) => place.userId !== loggedUser?.id
      );
      setPlaces(filteredPlaces);
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

  const getUserInfo = async () => {
    const response = await getCurrentUser();
    setLoggedUser(response);
  };

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
    return places.map((place, index: number) => ({
      id: index + 1,
      image: <PlaceImageSmall place={place} />,
      name: place.name,
      fiction:
        fictionHashTable && fictionHashTable[place.fictionId] ? (
          <ContentTableTagButton
            color="grey"
            text={fictionHashTable[place.fictionId].name}
          />
        ) : (
          <ContentTableTagButton color="grey" text="No fiction" />
        ),
      description:
        place.description.length > 50
          ? `${place.description.substring(0, 50)}...`
          : place.description,
      state: place.published ? (
        <ContentTableTagButton color="emerald" text="Approved" />
      ) : (
        <>
          {place.userId !== loggedUser?.id ? (
            <ContentTableTagButton
              color="cyan"
              onClick={() => approvePlace(place)}
              text="To Review"
            />
          ) : (
            <ContentTableTagButton color="cyan" text="Pending" />
          )}
        </>
      ),
      actions: (
        <>
          <ContentTableTagButton
            color="gray"
            onClick={() => editPlace(place)}
            text="Edit"
          />
          <ContentTableTagButton
            color="red"
            onClick={() => deletePlace(place)}
            text="Delete"
          />
        </>
      ),
    }));
  }, [places, fictionHashTable]);

  return (
    <>
      <ContentTableWrapper
        title={"Places"}
        description={
          "These places has been created by other users for Review. Take a look on them an collaborate in creating the database."
        }
        action={{ title: "Add Place", fn: setModalAddFictionOpen }}
      >
        {loadingPlaces && loadingFictions ? (
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
