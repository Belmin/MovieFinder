import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Route from '@core/constants/route';
import { BaseDetails } from '@core/models/base-details';
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
  private _showSearchBox = new BehaviorSubject(true);

  movies$: Observable<Movie[]> | undefined;
  tvShows$: Observable<TvShow[]> | undefined;
  showSearchBox$: Observable<boolean> | undefined;

  constructor(private tmdbApiService: TmdbApiService, private router: Router) {
    this.showSearchBox$ = this._showSearchBox.asObservable();
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
    selectedTab === Route.MOVIES
      ? this._movieQuery.next(this._searchTerm.value)
      : this._tvShowQuery.next(this._searchTerm.value);
  }

  showMovieDetails(details: BaseDetails) {
    this.router.navigate([Route.MOVIES, details.id], {
      state: details,
    });
  }

  showTvShowDetails(details: BaseDetails) {
    this.router.navigate([Route.TV_SHOWS, details.id], {
      state: details,
    });
  }

  hideSearchBox() {
    this._showSearchBox.next(false);
  }

  showSearchBox() {
    this._showSearchBox.next(true);
  }
}
