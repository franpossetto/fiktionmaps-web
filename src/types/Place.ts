import { Scene } from "./Scene";
import { LocationDTO } from "./dto/LocationDTO";

export interface Place {
  id?: number;
  name: string;
  description: string;
  screenshot?: string;
  fictionId: number;
  location: LocationDTO;
  scenes: Scene[];
  published: boolean;
}
