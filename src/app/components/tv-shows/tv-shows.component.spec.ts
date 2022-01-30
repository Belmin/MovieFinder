import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MovieResultsMock,
  Top10RatedMoviesMock,
} from '@components/movies/movies.mock';
import { SearchBoxService } from '@components/search-box/search-box.service';
import {
  Top10TvShowsMock,
  TvShowsResultsMock,
} from '@components/tv-shows/tv-shows.mock';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { of } from 'rxjs';

import { TvShowsComponent } from './tv-shows.component';
import { TvShowsModule } from './tv-shows.module';

describe('TvShowsComponent', () => {
  let component: TvShowsComponent;
  let fixture: ComponentFixture<TvShowsComponent>;
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
      declarations: [TvShowsComponent],
      imports: [TvShowsModule, RouterTestingModule, HttpClientTestingModule],
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
    fixture = TestBed.createComponent(TvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tvShows$).toBeDefined();
    expect(component.tvShows$).toBeTruthy();
    expect(component.showDetails).toBeDefined();
  });

  it('should render top 10 rated tv shows when initialised', (done) => {
    const expectedNumberOfResults = Top10TvShowsMock.length; // 10
    let actualNumberOfResults = 0;

    component.tvShows$?.subscribe((results) => {
      actualNumberOfResults = results.length;
      done();
    });

    expect(actualNumberOfResults).toEqual(expectedNumberOfResults);
  });
});
