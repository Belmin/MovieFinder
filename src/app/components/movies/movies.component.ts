import { Component } from '@angular/core';
import { SearchBoxService } from '@components/search-box/search-box.service';
import { BaseDetails } from '@core/models/base-details';
import { Movie } from '@core/models/movie';
import { BaseComponent } from '@shared/components/base/base.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent extends BaseComponent {
  movies$: Observable<Movie[]>;

  constructor(private searchBoxService: SearchBoxService) {
    super();
    this.searchBoxService.showSearchBox();
    this.movies$ = this.searchBoxService.movies$!.pipe(
      takeUntil(this.destroy$)
    );
  }

  showDetails(details: BaseDetails) {
    this.searchBoxService.showMovieDetails(details);
  }
}
