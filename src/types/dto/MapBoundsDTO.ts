import { get } from 'lodash';

export interface MapBounds {
    topRight?: {
      lat: number;
      lng: number;
    };
    bottomLeft?: {
      lat: number;
      lng: number;
    };
  }

export interface MapParams {
  bounds: MapBounds,
  fiction: string
}  

export const createSearchParametersOverride = (
  bounds?: MapBounds,
  fictionId: any = ""
) => ({
  upperLat: get(bounds, 'topRight.lat'),
  lowerLat: get(bounds, 'bottomLeft.lat'),
  rightLng: get(bounds, 'topRight.lng'),
  leftLng: get(bounds, 'bottomLeft.lng'),
  fictionId,
});