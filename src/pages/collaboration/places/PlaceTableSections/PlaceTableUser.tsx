import { useEffect, useMemo, useState } from "react";
import ContentTableTagButton from "../../../../components/common/ContentTableTagButton";
import { ContentTableView } from "../../../../components/common/ContentTableView";
import { ContentTableWrapper } from "../../../../components/common/ContentTableWrapper";
import { PlaceImageSmall } from "../../../../components/places/placeTable/common/PlaceImageSmall";
import { AddPlaceModal } from "../../../../components/places/placeTable/modals/AddPlaceModal";
import DeletePlaceModal from "../../../../components/places/placeTable/modals/DeletePlaceModal";
import { EditPlaceModal } from "../../../../components/places/placeTable/modals/EditPlaceModal";
import { Place } from "../../../../types/Place";
import { FictionHashTable, config } from "../PlaceTableUtils";
import { Fiction } from "../../../../types/Fiction";
import { UserService } from "../../../../services/UserService";
import { useFictionService } from "../../../../services/useFictionService";
import { User } from "../../../../types/User";
import { PlaceSkeleton } from "../../../../components/places/placeTable/common/PlaceSkeleton";

export const PlaceTableUser = () => {
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);

  const { getFictions, getPlacesByUser } = useFictionService();
  const {
    loading: loadingPlaces,
    data: placesData,
    error,
    refetch,
  } = getPlacesByUser();
  const { loading: loadingFictions, data: fictions } = getFictions();

  const [loggedUser, setLoggedUser] = useState<User>();

  const getUserInfo = async () => {
    const userService = new UserService();
    const response = await userService.getCurrentUser();
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
      const filteredPlaces: Place[] = sortedPlaces.filter(
        (place) => place.userId === loggedUser?.id
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
    <>
      <ContentTableWrapper
        title={"Places"}
        description={"These are the places you have added to the system."}
        action={{ title: "Add Place", fn: setModalAddFictionOpen }}
      >
        {loadingPlaces ? (
          <PlaceSkeleton />
        ) : (
          <ContentTableView content={{ dataSource, config }} />
        )}{" "}
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
