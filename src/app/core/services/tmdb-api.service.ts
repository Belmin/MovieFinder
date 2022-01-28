import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import TmdbLanguages from '@core/constants/tmdb-languages';
import { Movie } from '@core/models/movie';
import { MovieDetails } from '@core/models/movie-details';
import { TmdbApiGetResponse } from '@core/models/tmdb-api-get-response';
import { TvShow } from '@core/models/tv-show';
import { TvShowDetails } from '@core/models/tv-show-details';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
// TODO: refactor code and run eslint

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  constructor(private http: HttpClient) {}

  getTopRatedTvShows(): Observable<TvShow[]> {
    const query = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
      page: 1,
    };
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${query.api_key}`;
    return this.http
      .get<TmdbApiGetResponse<TvShow>>(url)
      .pipe(
        map((response) =>
          response.results.slice(0, environment.numberOfTopRatedShows)
        )
      );
  }

  getTopRatedMovies(): Observable<Movie[]> {
    const query = {
      api_key: environment.tmdbApiKey,
      language: TmdbLanguages.ENGLISH,
      page: 1,
    };
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${query.api_key}`;
    return this.http
      .get<TmdbApiGetResponse<Movie>>(url)
      .pipe(
        map((response) =>
          response.results.slice(0, environment.numberOfTopRatedMovies)
        )
      );
  }

  searchMovies(searchTerm: string): Observable<Movie[]> {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${environment.tmdbApiKey}&include_adult=${environment.includeAdult}&query=${searchTerm}`;
    return this.http
      .get<TmdbApiGetResponse<Movie>>(url)
      .pipe(map((response) => response.results));
  }

  searchTvShows(searchTerm: string): Observable<TvShow[]> {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${environment.tmdbApiKey}&include_adult=${environment.includeAdult}&query=${searchTerm}`;
    return this.http
      .get<TmdbApiGetResponse<TvShow>>(url)
      .pipe(map((response) => response.results));
  }

  getMovieDetailsById(id: string): Observable<MovieDetails> {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${environment.tmdbApiKey}&append_to_response=videos`;
    return this.http.get<MovieDetails>(url);
  }

  getTvShowDetailsById(id: string): Observable<TvShowDetails> {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${environment.tmdbApiKey}&append_to_response=videos`;
    return this.http.get<TvShowDetails>(url);
  }
}
