import React, { useEffect, useMemo, useState } from "react";
import { useFictionService } from "../../../../services/useFictionService";
import { ApprovePlaceModal } from "../../../../components/places/placeTable/modals/ApprovePlaceModal";
import { AddPlaceModal } from "../../../../components/places/placeTable/modals/AddPlaceModal";
import DeletePlaceModal from "../../../../components/places/placeTable/modals/DeletePlaceModal";
import { EditPlaceModal } from "../../../../components/places/placeTable/modals/EditPlaceModal";
import { PlaceImageSmall } from "../../../../components/places/placeTable/common/PlaceImageSmall";
import { ContentTableWrapper } from "../../../../components/common/ContentTableWrapper";
import { ContentTableView } from "../../../../components/common/ContentTableView";
import { Fiction } from "../../../../types/Fiction";
import { Place } from "../../../../types/Place";
import { User } from "../../../../types/User";
import { useUserService } from "../../../../services/useUserService";

type FictionHashTable = {
  [key: number]: Fiction;
};

const config = [
  {
    label: "#",
    key: "id",
    className: "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3",
  },
  {
    label: "Image",
    key: "image",
    className: "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3",
  },
  {
    label: "Place Name",
    key: "name",
    className: "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3",
  },
  {
    label: "Fiction",
    key: "fiction",
    className: "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3",
  },
  {
    label: "Description",
    key: "description",
    className: "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3",
  },
  {
    label: "State",
    key: "state",
    className: "py-3.5 pl-4 pr-3 text-left font-semibold text-gray-900 sm:pl-3",
  },
  {
    label: "",
    key: "actions",
    className: "relative py-3.5 pl-3 pr-4 sm:pr-3",
  },
];

export const PlaceTableCollab = () => {
  const [modalAddFictionOpen, setModalAddFictionOpen] = useState(false);

  const { getFictions, getPlaces } = useFictionService();
  const { loading, data: placesData, error, refetch } = getPlaces();
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

  const dataSource = useMemo(() => {
    return places.map((place, index) => ({
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
        <ContentTableView content={{ dataSource, config }} />
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

export default PlaceTableCollab;
