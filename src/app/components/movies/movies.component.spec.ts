import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchBoxService } from '@components/search-box/search-box.service';
import {
  Top10TvShowsMock,
  TvShowsResultsMock,
} from '@components/tv-shows/tv-shows.mock';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { of } from 'rxjs';

import { MoviesComponent } from './movies.component';
import { MovieResultsMock, Top10RatedMoviesMock } from './movies.mock';
import { MoviesModule } from './movies.module';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
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
      declarations: [MoviesComponent],
      imports: [MoviesModule, RouterTestingModule, HttpClientTestingModule],
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
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.movies$).toBeDefined();
    expect(component.movies$).toBeTruthy();
    expect(component.showDetails).toBeDefined();
  });

  it('should render top 10 rated movies when initialised', (done) => {
    const expectedNumberOfResults = Top10RatedMoviesMock.length; // 10
    let actualNumberOfResults = 0;

    component.movies$?.subscribe((results) => {
      actualNumberOfResults = results.length;
      done();
    });

    expect(actualNumberOfResults).toEqual(expectedNumberOfResults);
  });
});
