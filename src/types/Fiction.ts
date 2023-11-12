import { EpisodeDTO } from "./dto/FictionDTO";
import { MediaType } from "./MediaType";
import { FictionProvider } from "./providers/FictionProvider";
import { Scene } from "./Scene";

export interface Fiction {
    name: string;
    id: number;
    imgUrl: string;
    overview: string;
    provider?: FictionProvider,
    type?: MediaType,
    scenes?: Scene[]
    episode?: EpisodeDTO,
    duration: number
}