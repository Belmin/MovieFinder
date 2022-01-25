import { Component, OnInit } from '@angular/core';
import { TvShow } from '@core/models/tv-show';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  tvShows$: Observable<TvShow[]>;

  constructor(private tmdbApiService: TmdbApiService) {
    this.tvShows$ = this.tmdbApiService.getTopRatedTvShows();
  }

  ngOnInit(): void {}
}
