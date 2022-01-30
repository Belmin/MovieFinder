import { BaseDetails } from './base-details';
import { Genre } from './genre';
import { ProductionCompany } from './production-company';
import { ProductionCountry } from './production-country';
import { SpokenLanguage } from './spoken-language';
import { Video, Videos } from './video';

export interface MovieDetails extends BaseDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection?: any;
  budget: number;
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  videos: Videos;
}
