import { MediaType } from "../MediaType";
import { FictionProvider } from "../providers/FictionProvider";

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

