import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TmdbLanguages from '@core/constants/tmdb-languages';
import { Movie } from '@core/models/movie';
import { Credits } from '@core/models/credits';
import { MovieDetails } from '@core/models/movie-details';
import { TmdbApiGetResponse } from '@core/models/tmdb-api-get-response';
import { TvShow } from '@core/models/tv-show';
import { TvShowDetails } from '@core/models/tv-show-details';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import Endpoints from '@core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  constructor(private http: HttpClient) {}

  getTopRatedTvShows(page = 1): Observable<TvShow[]> {
    const params = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
      page,
    };
    const url = `${environment.host}/${Endpoints.TOP_RATED_TV_SHOWS}`;
    return this.http
      .get<TmdbApiGetResponse<TvShow>>(url, { params })
      .pipe(
        map((response) =>
          response.results.slice(0, environment.numberOfTopRatedShows)
        )
      );
  }

  getTopRatedMovies(page = 1): Observable<Movie[]> {
    const params = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
      page,
    };
    const url = `${environment.host}/${Endpoints.TOP_RATED_MOVIES}`;
    return this.http
      .get<TmdbApiGetResponse<Movie>>(url, { params })
      .pipe(
        map((response) =>
          response.results.slice(0, environment.numberOfTopRatedMovies)
        )
      );
  }

  searchMovies(query: string, page = 1): Observable<Movie[]> {
    const params = {
      api_key: environment.tmdbApiKey,
      include_adult: environment.includeAdult,
      language: TmdbLanguages.ENGLISH,
      query,
      page,
    };
    const url = `${environment.host}/${Endpoints.SEARCH_MOVIE}`;
    return this.http
      .get<TmdbApiGetResponse<Movie>>(url, { params })
      .pipe(map((response) => response.results));
  }

  searchTvShows(query: string, page = 1): Observable<TvShow[]> {
    const params = {
      api_key: environment.tmdbApiKey,
      include_adult: environment.includeAdult,
      language: TmdbLanguages.ENGLISH,
      query,
      page,
    };
    const url = `${environment.host}/${Endpoints.SEARCH_TV_SHOWS}`;
    return this.http
      .get<TmdbApiGetResponse<TvShow>>(url, { params })
      .pipe(map((response) => response.results));
  }

  getMovieDetailsById(id: string): Observable<MovieDetails> {
    const params = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
      append_to_response: 'videos',
    };
    const url = `${environment.host}/movie/${id}`;
    return this.http.get<MovieDetails>(url, { params });
  }

  getMovieCreditsById(id: string): Observable<Credits> {
    const params = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
    };
    const url = `${environment.host}/movie/${id}/credits`;
    return this.http.get<Credits>(url, { params });
  }

  getTvShowCreditsById(id: string): Observable<Credits> {
    const params = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
    };
    const url = `${environment.host}/tv/${id}/credits`;
    return this.http.get<Credits>(url, { params });
  }

  getTvShowDetailsById(id: string): Observable<TvShowDetails> {
    const params = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
      append_to_response: 'videos',
    };
    const url = `${environment.host}/tv/${id}`;
    return this.http.get<TvShowDetails>(url, { params });
  }
}
