import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from '@components/details/movie-details/movie-details.component';
import { TvShowDetailsComponent } from '@components/details/tv-show-details/tv-show-details.component';
import { PageNotFoundComponent } from '@components/page-not-found/page-not-found.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import Route from './core/constants/route';

const routes: Routes = [
  {
    path: Route.TV_SHOWS,
    component: TvShowsComponent,
  },
  {
    path: Route.TV_SHOWS + '/:id',
    component: TvShowDetailsComponent,
  },
  {
    path: Route.MOVIES,
    component: MoviesComponent,
  },
  {
    path: Route.MOVIES + '/:id',
    component: MovieDetailsComponent,
  },
  { path: '', redirectTo: Route.TV_SHOWS, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
