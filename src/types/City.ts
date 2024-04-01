export interface City {
  id: number;
  name: string;
  placeId: string;
  latitude: number;
  longitude: number;
  provider: string;
  code: string;
  locations: any[];
  amountOfPlaces?: number;
}
