import { MapsProvider } from "../MapsProvider";

export interface LocationDTO {
    formatted_address: string;
    latitude: number,
    longitude: number,
    place_id: string;
    provider: MapsProvider
    city: string
}
