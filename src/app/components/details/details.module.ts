import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { TvShowDetailsComponent } from './tv-show-details/tv-show-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { CoverComponent } from './cover/cover.component';
import { GenresComponent } from './genres/genres.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    TvShowDetailsComponent,
    HeaderComponent,
    CoverComponent,
    GenresComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  exports: [MovieDetailsComponent, TvShowDetailsComponent],
})
export class DetailsModule {}
