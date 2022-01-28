import { BaseDetails } from './base-details';

export interface Movie extends BaseDetails {
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: string[];
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  video: boolean;
}
