import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import Route from './core/constants/route';

const routes: Routes = [
  {
    path: Route.TV_SHOWS,
    component: TvShowsComponent,
  },
  {
    path: Route.MOVIES,
    component: MoviesComponent,
  },
  { path: '', redirectTo: Route.TV_SHOWS, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
