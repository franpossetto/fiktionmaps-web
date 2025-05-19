import { Place } from "../../../types/Place";

export interface PlacesByUserRequestDTO {
  page?: number;
  size?: number;
}

export interface PlacesByUserResponseDTO {
  content: Place[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  currentPage: number;
}
