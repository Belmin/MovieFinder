import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [MoviesComponent],
  imports: [CommonModule, SharedModule],
  exports: [MoviesComponent],
})
export class MoviesModule {}