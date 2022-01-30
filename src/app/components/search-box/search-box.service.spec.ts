import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
import { of } from 'rxjs';
import { SearchBoxService } from './search-box.service';

describe('SearchBoxService', () => {
  let service: SearchBoxService;
  let tmdbApiServiceSpy: jasmine.SpyObj<TmdbApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TmdbApiService', [
      'getTopRatedMovies',
      'searchMovies',
      'getTopRatedTvShows',
      'searchTvShows',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: TmdbApiService, useValue: spy }],
    });
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

    service = new SearchBoxService(tmdbApiServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.movies$).toBeDefined();
    expect(service.movies$).toBeTruthy();
    expect(service.tvShows$).toBeDefined();
    expect(service.tvShows$).toBeTruthy();
    expect(service.showSearchBox$).toBeDefined();
    expect(service.showSearchBox$).toBeTruthy();
    expect(service.handleSearchBySelectedTab).toBeDefined();
    expect(service.showSearchBox).toBeDefined();
    expect(service.hideSearchBox).toBeDefined();
    expect(service.triggerSearchByQuery).toBeDefined();
  });

  it('hideSearchBox() -> showSearchBox$ should emit false', () => {
    service.hideSearchBox();
    const expected = false;
    service.showSearchBox$?.subscribe((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  it('showSearchBox() -> showSearchBox$ should emit true', () => {
    service.showSearchBox();
    const expected = true;
    service.showSearchBox$?.subscribe((actual) => {
      expect(actual).toEqual(expected);
    });
  });

  it('triggerSearchByQuery() -> should return 20 movies when search term is provided and selected tab is `movies`', (done) => {
    const expected = MovieResultsMock.results.length; // 20
    const selectedTab = Route.MOVIES;
    const searchTerm = 'test';
    let actualNumberOfResults = 0;

    service.triggerSearchByQuery(searchTerm, selectedTab);
    service.movies$?.subscribe((results) => {
      actualNumberOfResults = results.length;
      done();
    });

    expect(tmdbApiServiceSpy.searchMovies.calls.count())
      .withContext('searchMovies method was called once')
      .toBe(1);

    expect(actualNumberOfResults).toEqual(expected);
  });

  it('triggerSearchByQuery() -> should return top 10 movies when search term is empty and selected tab is `movies`', (done) => {
    const expected = Top10RatedMoviesMock.length; // 10
    const selectedTab = Route.MOVIES;
    const searchTerm = '';
    let actualNumberOfResults = 0;

    service.triggerSearchByQuery(searchTerm, selectedTab);
    service.movies$?.subscribe((results) => {
      actualNumberOfResults = results.length;
      done();
    });

    expect(tmdbApiServiceSpy.getTopRatedMovies.calls.count())
      .withContext('getTopRatedMovies method was called once')
      .toBe(1);

    expect(actualNumberOfResults).toEqual(expected);
  });

  it('triggerSearchByQuery() -> should return top 10 tv shows when search term is empty and selected tab is `tv-shows`', (done) => {
    const expected = Top10TvShowsMock.length; // 10
    const selectedTab = Route.TV_SHOWS;
    const searchTerm = '';
    let actualNumberOfResults = 0;

    service.triggerSearchByQuery(searchTerm, selectedTab);
    service.tvShows$?.subscribe((results) => {
      actualNumberOfResults = results.length;
      done();
    });

    expect(tmdbApiServiceSpy.getTopRatedTvShows.calls.count())
      .withContext('getTopRatedTvShows method was called once')
      .toBe(1);

    expect(actualNumberOfResults).toEqual(expected);
  });

  it('triggerSearchByQuery() -> should return 20 tv shows when search term is given and selected tab is `tv-shows`', (done) => {
    const expected = TvShowsResultsMock.results.length; // 20
    const selectedTab = Route.TV_SHOWS;
    const searchTerm = 'test';
    let actualNumberOfResults = 0;

    service.triggerSearchByQuery(searchTerm, selectedTab);
    service.tvShows$?.subscribe((results) => {
      actualNumberOfResults = results.length;
      done();
    });

    expect(tmdbApiServiceSpy.searchTvShows.calls.count())
      .withContext('searchTvShows method was called once')
      .toBe(1);

    expect(actualNumberOfResults).toEqual(expected);
  });
});
