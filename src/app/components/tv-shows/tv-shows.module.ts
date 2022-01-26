import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsComponent } from './tv-shows.component';
import { SharedModule } from '@shared/shared.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [TvShowsComponent],
  imports: [CommonModule, SharedModule, PipesModule],
  exports: [TvShowsComponent],
})
export class TvShowsModule {}
