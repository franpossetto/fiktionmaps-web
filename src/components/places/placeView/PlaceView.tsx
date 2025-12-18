import { FC } from "react";
import { PlaceImage } from "./common/PlaceImage";
import { PlaceOverview } from "./common/PlaceOverview";
import { PlaceData } from "./common/PlaceData";
import { PlaceScenes } from "../placeTable/common/PlaceScene/PlaceScenes";
import { PlaceCloseCard } from "../placeTable/common/PlaceScene/PlaceCloseCard";
import { useFetchPlaceById } from "../../../hooks/places/useFetchPlaceById/usePlaceFetchById";
import { useFetchFictionById } from "@/hooks/fictions/useFetchFictionById/useFetchFictionById";
import { ModalSideAnimateWrapper } from "../../common/ModalSideAnimateWrapper";

interface PlaceViewProps {
  id: string;
  open: boolean;
  setOpen: () => void;
}

const PlaceView: FC<PlaceViewProps> = ({ id, open, setOpen }) => {
  const { data: place } = useFetchPlaceById(id);
  const { data: fiction } = useFetchFictionById(place?.fictionId || 0);
  
  return (
    place && (
      <ModalSideAnimateWrapper open={open} setOpen={setOpen}>
        <PlaceCloseCard place={place} setOpen={setOpen} />
        <PlaceImage place={place} />
        <PlaceOverview fiction={fiction} place={place} />
        <PlaceData fiction={fiction} place={place} />
        <PlaceScenes scenes={place.scenes} />
      </ModalSideAnimateWrapper>
    )
  );
};

export default PlaceView;
