import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchBoxService } from '@components/search-box/search-box.service';
import { TmdbApiService } from '@core/services/tmdb-api.service';
import { DetailsModule } from '../details.module';

import { TvShowDetailsComponent } from './tv-show-details.component';

describe('TvShowDetailsComponent', () => {
  let component: TvShowDetailsComponent;
  let fixture: ComponentFixture<TvShowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvShowDetailsComponent],
      imports: [DetailsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [TmdbApiService, SearchBoxService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
