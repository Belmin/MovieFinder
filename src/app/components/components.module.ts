import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesModule } from './movies/movies.module';
import { TvShowsModule } from './tv-shows/tv-shows.module';
import { SearchBoxModule } from './search-box/search-box.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, MoviesModule, TvShowsModule, SearchBoxModule],
  exports: [MoviesModule, TvShowsModule, SearchBoxModule],
})
export class ComponentsModule {}
