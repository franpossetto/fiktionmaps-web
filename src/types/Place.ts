import { Scene } from "./Scene";

export interface Place {
  id?: number;
  name: string;
  description: string;
  screenshot?: string;
  fiction_id: number;
  location: {
    id?: number;
    latitude: number;
    longitude: number;
    formattedAddress: string;
    placeId: string;
  };
  userId: number;
  scenes: Scene[];
}
