import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBoxService } from '@components/search-box/search-box.service';
import Route from '@core/constants/route';
import { Credits } from '@core/models/credits';
import { MovieDetails } from '@core/models/movie-details';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { Observable } from 'rxjs';
import { DetailsBase } from '../details-base';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss', '../common-style.scss'],
})
export class MovieDetailsComponent extends DetailsBase implements OnInit {
  details$: Observable<MovieDetails> | undefined;
  credits$: Observable<Credits> | undefined;

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
    this.credits$ = this.tmdbApiService.getMovieCreditsById(this.id!);
  }

  back(): void {
    this.router.navigate([Route.MOVIES]);
  }
}
