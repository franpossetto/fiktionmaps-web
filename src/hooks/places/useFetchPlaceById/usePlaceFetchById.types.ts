import { MapsProvider } from "../../../types/providers/MapsProvider";

export interface PlaceResponseDTO {
    id?: number;
    name: string;
    description: string;
    screenshot?: string;
    fictionId: number;
    location: LocationDTO;
    scenes: SceneResponseDTO[];
    published: boolean;
    userId?: number;
    userEmail?: string;
}

export interface SceneResponseDTO {
    id?: number;
    name: string;
    description: string;
    screenshot?: string;
    season: string;
    episodeName: string;
    episodeNumber: string;
    startAt: number;
    endAt: number;
    segmentType?: any;
    userId: number;
    location: any;
}

export interface LocationDTO {
    id?: string;
    formattedAddress: string;
    name?: string;
    latitude: number;
    longitude: number;
    placeId: string;
    provider?: MapsProvider.GOOGLE_MAPS;
    cityId?: any;
    country?: string;
}


