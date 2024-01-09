import { MapsProvider } from "../providers/MapsProvider";

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
