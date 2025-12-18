import { Place } from "../../../types/Place";

export interface ApprovedPlacesRequestDTO {
  page?: number;
  size?: number;
  approved: boolean;
}

export interface ApprovedPlacesResponseDTO {
  content: Place[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  currentPage: number;
}
