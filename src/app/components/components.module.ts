import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesModule } from './movies/movies.module';
import { TvShowsModule } from './tv-shows/tv-shows.module';
import { SearchBoxModule } from './search-box/search-box.module';
import { DetailsModule } from './details/details.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MoviesModule,
    TvShowsModule,
    SearchBoxModule,
    DetailsModule,
  ],
  exports: [MoviesModule, TvShowsModule, SearchBoxModule, DetailsModule],
})
export class ComponentsModule {}
