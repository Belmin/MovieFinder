import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBoxService } from '@components/search-box/search-box.service';
import Route from '@core/constants/route';
import { BaseDetails } from '@core/models/base-details';
import { TvShow } from '@core/models/tv-show';
import { BaseComponent } from '@shared/components/base/base.component';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent extends BaseComponent {
  tvShows$: Observable<TvShow[]>;

  constructor(
    private searchBoxService: SearchBoxService,
    private router: Router
  ) {
    super();
    this.searchBoxService.showSearchBox();
    this.tvShows$ = this.searchBoxService.tvShows$!.pipe(
      takeUntil(this.destroy$)
    );
  }

  showDetails(details: BaseDetails) {
    this.router.navigate([Route.TV_SHOWS, details.id]);
  }
}
