import { MapsProvider } from "../MapsProvider";

export interface LocationDTO {
    fromated_address: string;
    place_type: string;
    place_id: string;
    provider: MapsProvider
}
