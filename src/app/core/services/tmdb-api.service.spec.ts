import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TmdbApiService } from './tmdb-api.service';

describe('TmdbApiService', () => {
  let service: TmdbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TmdbApiService);
  });
});
