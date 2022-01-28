import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBoxService } from '@components/search-box/search-box.service';
import Route from '@core/constants/route';
import { MovieDetails } from '@core/models/movie-details';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { Observable, takeUntil } from 'rxjs';
import { DetailsBase } from '../details-base';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss', '../common-style.scss'],
})
export class MovieDetailsComponent extends DetailsBase implements OnInit {
  details$: Observable<MovieDetails> | undefined;

  constructor(
    tmdbApiService: TmdbApiService,
    searchBoxService: SearchBoxService,
    router: Router,
    route: ActivatedRoute,
    sanitizer: DomSanitizer
  ) {
    super(tmdbApiService, searchBoxService, router, route, sanitizer);
  }

  ngOnInit(): void {}

  fetchApi(): void {
    this.details$ = this.tmdbApiService.getMovieDetailsById(this.id!);
    this.details$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      console.log(response);
    });
  }

  back(): void {
    this.router.navigate([Route.MOVIES]);
  }
}
