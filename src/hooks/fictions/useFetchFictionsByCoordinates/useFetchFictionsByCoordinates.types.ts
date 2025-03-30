import { MediaType } from "../../../types/MediaType";

export interface FictionByCoordinatesResponse {
    fictionId: number;
    name: string;
    type: MediaType; 
    imgUrl: string;
    duration: number;
    year?: number;
    published: boolean;
}

export interface UseFictionsByCoordinatesRequest {
    upperLat: number;
    lowerLat: number;
    rightLng: number;
    leftLng: number;
}
