import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MatTabsModule,
  ],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
