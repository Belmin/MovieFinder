import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MovieResultsMock,
  Top10RatedMoviesMock,
} from '@components/movies/movies.mock';
import {
  Top10TvShowsMock,
  TvShowsResultsMock,
} from '@components/tv-shows/tv-shows.mock';
import Route from '@core/constants/route';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { environment } from '@env/environment';
import { of } from 'rxjs';

import { SearchBoxComponent } from './search-box.component';
import { SearchBoxModule } from './search-box.module';
import { SearchBoxService } from './search-box.service';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let tmdbApiServiceSpy: jasmine.SpyObj<TmdbApiService>;
  let searchBoxService: SearchBoxService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TmdbApiService', [
      'getTopRatedMovies',
      'searchMovies',
      'getTopRatedTvShows',
      'searchTvShows',
    ]);

    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [
        SearchBoxModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [SearchBoxService, { provide: TmdbApiService, useValue: spy }],
    }).compileComponents();
  });

  beforeEach(() => {
    tmdbApiServiceSpy = TestBed.inject(
      TmdbApiService
    ) as jasmine.SpyObj<TmdbApiService>;

    tmdbApiServiceSpy.getTopRatedMovies.and.returnValue(
      of(Top10RatedMoviesMock)
    );
    tmdbApiServiceSpy.searchMovies.and.returnValue(
      of(MovieResultsMock.results)
    );
    tmdbApiServiceSpy.getTopRatedTvShows.and.returnValue(of(Top10TvShowsMock));
    tmdbApiServiceSpy.searchTvShows.and.returnValue(
      of(TvShowsResultsMock.results)
    );

    searchBoxService = new SearchBoxService(tmdbApiServiceSpy);
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.form).toBeTruthy();
    expect(component.navigationTabs).toBeDefined();
    expect(component.navigationTabs).toBeTruthy();
    expect(component.selectedTab).toBeDefined();
    expect(component.selectedTab).toBeTruthy();
    expect(component.show$).toBeDefined();
    expect(component.show$).toBeTruthy();
    expect(component.selectTab).toBeDefined();
  });

  it('should fetch top 10 rated movies when the selected tab is `movies` and search query is < 3 characters long', fakeAsync(() => {
    const query = 'xx';
    component.selectedTab = Route.MOVIES;
    component.form.patchValue({ searchBox: query });

    tick(environment.searchDebounceTime);
    fixture.detectChanges();

    const expectedNumberOfResults = Top10RatedMoviesMock.length; // 10
    let actualNumberOfResults = 0;
    searchBoxService.movies$?.subscribe((results) => {
      actualNumberOfResults = results.length;
    });

    expect(tmdbApiServiceSpy.getTopRatedMovies.calls.count())
      .withContext('getTopRatedMovies method was called once')
      .toBe(1);

    expect(actualNumberOfResults).toEqual(expectedNumberOfResults);
  }));

  it('should fetch top 10 rated tv shows when the selected tab is `tv-shows` and search query is < 3 characters long', fakeAsync(() => {
    const query = 'xx';
    component.selectedTab = Route.TV_SHOWS;
    component.form.patchValue({ searchBox: query });

    tick(environment.searchDebounceTime);
    fixture.detectChanges();

    const expectedNumberOfResults = Top10RatedMoviesMock.length; // 10
    let actualNumberOfResults = 0;
    searchBoxService.tvShows$?.subscribe((results) => {
      actualNumberOfResults = results.length;
    });

    expect(tmdbApiServiceSpy.getTopRatedTvShows.calls.count())
      .withContext('getTopRatedTvShows method was called once')
      .toBe(1);

    expect(actualNumberOfResults).toEqual(expectedNumberOfResults);
  }));
});
