import { EpisodeDTO } from "./dto/FictionDTO";
import { MediaType } from "./MediaType";
import { Place } from "./Place";
import { FictionProvider } from "./providers/FictionProvider";

export interface Fiction {
    name: string;
    id: number;
    imgUrl: string;
    overview: string;
    provider?: FictionProvider,
    type?: MediaType,
    places?: Place[]
    episode?: EpisodeDTO,
    duration: number,
    externalId: string;
    year: string
}