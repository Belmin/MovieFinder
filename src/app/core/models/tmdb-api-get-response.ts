export interface TmdbApiGetResponse<T> {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
}
