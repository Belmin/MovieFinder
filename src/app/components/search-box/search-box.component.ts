import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Route from '@core/constants/route';
import { TabItem } from '@core/models/tab-item';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  tabItems: TabItem[] = [
    { link: Route.TV_SHOWS, displayName: 'TV Shows' },
    { link: Route.MOVIES, displayName: 'Movies' },
  ];
  activeLink = Route.TV_SHOWS;

  tabChangedEvent(event: any) {
    console.log('AppComponent -> tabChangedEvent', event);
  }

  @Output() searched: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searched.emit(filterValue.trim().toLowerCase());
  }
}
