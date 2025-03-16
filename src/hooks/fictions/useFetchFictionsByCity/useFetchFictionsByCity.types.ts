import { MediaType } from "../../../types/MediaType";
import { Place } from "../../../types/Place";

export interface FictionByCityResponse {
    id: number;
    name: string;
    imgUrl: string;
    duration: number;
    year?: number;
    type: MediaType; 
    provider: string | null;
    externalId: string;
    published: boolean;
    places: Place[]; // must be deleted
  }
  