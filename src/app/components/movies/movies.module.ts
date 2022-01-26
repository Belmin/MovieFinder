import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { SharedModule } from '@shared/shared.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, SharedModule, PipesModule],
  exports: [MoviesComponent],
})
export class MoviesModule {}
