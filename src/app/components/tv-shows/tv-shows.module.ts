import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsComponent } from './tv-shows.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TvShowsComponent],
  imports: [CommonModule, SharedModule],
  exports: [TvShowsComponent],
})
export class TvShowsModule {}
