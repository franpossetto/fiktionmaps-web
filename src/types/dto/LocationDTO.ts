import { MapsProvider } from "../providers/MapsProvider";

export interface LocationDTO {
    formatted_address: string;
    latitude: number,
    longitude: number,
    place_id: string;
    provider: MapsProvider
    city: string,
    country: string
}
