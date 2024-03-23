import { Place } from "./Place";

export interface Scene {
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
