import { Component } from '@angular/core';
import { SearchBoxService } from '@components/search-box/search-box.service';
import { Movie } from '@core/models/movie';
import { BaseComponent } from '@shared/components/base/base.component';
import { Observable, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent extends BaseComponent {
  movies$: Observable<Movie[]>;

  constructor(private searchBoxService: SearchBoxService) {
    super();
    this.movies$ = this.searchBoxService.movies$!.pipe(
      takeUntil(this.destroy$)
    );
  }
}
