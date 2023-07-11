import { EpisodeDTO } from "./dto/FictionDTO";
import { MediaType } from "./MediaType";
import { FictionProvider } from "./providers/FictionProvider";

export interface Fiction {
    title: string;
    id: number;
    img: string;
    overview: string;
    provider?: FictionProvider,
    type?: MediaType,
    episode?: EpisodeDTO,
}
  