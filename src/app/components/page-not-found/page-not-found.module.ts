import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule],
  exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
