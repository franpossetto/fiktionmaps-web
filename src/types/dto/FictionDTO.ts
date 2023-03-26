import { FictionProvider } from "../FictionProvider";
import { MediaType } from "../MediaType";

export interface FictionDTO {
    name: string;
    type: MediaType;
    provider: FictionProvider;
    episode?: EpisodeDTO;
}

export interface EpisodeDTO {
    name: string;
    id: number;
    season_number: number;
}

