import { Injectable } from '@angular/core';
import Route from '@core/constants/route';
import { Movie } from '@core/models/movie';
import { TvShow } from '@core/models/tv-show';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxService {
  private _tvShowQuery = new BehaviorSubject('');
  private _movieQuery = new BehaviorSubject('');
  private _searchTerm = new BehaviorSubject('');

  movies$: Observable<Movie[]> | undefined;
  tvShows$: Observable<TvShow[]> | undefined;

  constructor(private tmdbApiService: TmdbApiService) {
    this.movies$ = this._movieQuery.pipe(
      switchMap((query) => {
        if (query) {
          return this.tmdbApiService.searchMovies(query);
        }

        return this.tmdbApiService.getTopRatedMovies();
      })
    );

    this.tvShows$ = this._tvShowQuery.pipe(
      switchMap((query) => {
        if (query) {
          return this.tmdbApiService.searchTvShows(query);
        }

        return this.tmdbApiService.getTopRatedTvShows();
      })
    );
  }

  triggerSearchByQuery(searchTerm: string, selectedTab: string): void {
    this._searchTerm.next(searchTerm);
    this.handleSearchBySelectedTab(selectedTab);
  }

  handleSearchBySelectedTab(selectedTab: string) {
    if (selectedTab === Route.MOVIES) {
      this._movieQuery.next(this._searchTerm.value);
    } else {
      this._tvShowQuery.next(this._searchTerm.value);
    }
  }
}
