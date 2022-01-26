import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import NavigationTabs from '@core/constants/navigation-tabs';
import Route from '@core/constants/route';
import { environment } from '@env/environment';
import { BaseComponent } from '@shared/components/base/base.component';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { SearchBoxService } from './search-box.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent extends BaseComponent implements OnInit {
  selectedTab = Route.TV_SHOWS;
  navigationTabs = NavigationTabs;
  form: FormGroup = new FormGroup({
    searchBox: new FormControl(),
  });

  constructor(
    private searchBoxService: SearchBoxService,
    private router: Router
  ) {
    super();
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((route) => {
        this.selectedTab = route.urlAfterRedirects.replace('/', '');
      });
  }

  ngOnInit(): void {
    this.form
      .get('searchBox')
      ?.valueChanges.pipe(
        debounceTime(environment.searchDebounceTime),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        if (query.length < environment.minCharactersForSearch) {
          query = '';
        }

        this.searchBoxService.triggerSearchByQuery(query, this.selectedTab);
      });
  }

  selectTab(link: string) {
    this.selectedTab = link;
    this.searchBoxService.handleSearchBySelectedTab(link);
  }
}
