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
import { CreditsComponent } from './credits/credits.component';
import { SharedModule } from '@shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    TvShowDetailsComponent,
    HeaderComponent,
    CoverComponent,
    GenresComponent,
    CreditsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatChipsModule,
    SharedModule,
    PipesModule,
    ScrollingModule,
  ],
  exports: [MovieDetailsComponent, TvShowDetailsComponent],
})
export class DetailsModule {}
