import { Videos } from '@core/models/video';

export interface CoverData {
  videos: Videos;
  poster_path: string | null;
  backdrop_path: string | null;
}
