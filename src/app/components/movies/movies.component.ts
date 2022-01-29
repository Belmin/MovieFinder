import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBoxService } from '@components/search-box/search-box.service';
import Route from '@core/constants/route';
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

  constructor(
    public searchBoxService: SearchBoxService,
    private router: Router
  ) {
    super();
    this.searchBoxService.showSearchBox();
    this.movies$ = this.searchBoxService.movies$!.pipe(
      takeUntil(this.destroy$)
    );
  }

  showDetails(details: BaseDetails) {
    this.router.navigate([Route.MOVIES, details.id]);
  }
}
