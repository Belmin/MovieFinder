import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBoxService } from '@components/search-box/search-box.service';
import Route from '@core/constants/route';
import { Credits } from '@core/models/credits';
import { TvShowDetails } from '@core/models/tv-show-details';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { Observable } from 'rxjs';
import { DetailsBase } from '../details-base';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.scss', '../common-style.scss'],
})
export class TvShowDetailsComponent extends DetailsBase implements OnInit {
  details$: Observable<TvShowDetails> | undefined;
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
    this.details$ = this.tmdbApiService.getTvShowDetailsById(this.id!);
    this.credits$ = this.tmdbApiService.getTvShowCreditsById(this.id!);
  }

  back(): void {
    this.router.navigate([Route.TV_SHOWS]);
  }
}
