import { EpisodeDTO } from "./dto/FictionDTO";
import { FictionProvider } from "./FictionProvider";
import { MediaType } from "./MediaType";

export interface Fiction {
    title: string;
    id: number;
    img: string;
    overview: string;
    provider?: FictionProvider,
    type?: MediaType,
    episode?: EpisodeDTO,
}
  