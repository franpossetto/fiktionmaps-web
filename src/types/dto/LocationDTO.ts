import { MapsProvider } from "../providers/MapsProvider";

export interface LocationDTO {
    id: string;
    formatted_address: string;
    name: string;
    latitude: number,
    longitude: number,
    place_id: string;
    provider: MapsProvider
    city: string,
    country: string
}
