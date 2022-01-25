import { Component, OnInit } from '@angular/core';
import { Movie } from '@core/models/movie';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private tmdbApiService: TmdbApiService) {
    this.movies$ = this.tmdbApiService.getTopRatedMovies();
  }

  ngOnInit(): void {}
}
