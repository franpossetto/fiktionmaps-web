import { EpisodeDTO } from "./dto/FictionDTO";
import { MediaType } from "./MediaType";
import { Place } from "./Place";
import { FictionProvider } from "./providers/FictionProvider";

export interface Fiction {
    id: number;
    name: string;
    imgUrl: string;
    overview: string;
    type?: MediaType,
    provider?: FictionProvider;
    externalId: string;
    duration: number;
    year: string;
    places?: Place[];
    episode?: EpisodeDTO;
}
  