import { EpisodeDTO } from "../../../types/dto/FictionDTO";
import { MediaType } from "../../../types/MediaType";
import { FictionProvider } from "../../../types/providers/FictionProvider";
import { PlaceResponseDTO } from "../../places/useFetchPlaceById/usePlaceFetchById.types";

export interface FictionResponse {
    name: string;
    id: number;
    imgUrl: string;
    overview: string;
    provider?: FictionProvider,
    type?: MediaType,
    places?: PlaceResponseDTO[]
    episode?: EpisodeDTO,
    duration: number,
    externalId: string;
    year: string
}