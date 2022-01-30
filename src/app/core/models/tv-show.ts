import { BaseDetails } from './base-details';

export interface TvShow extends BaseDetails {
  popularity?: number;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  name: string;
  original_name: string;
}
