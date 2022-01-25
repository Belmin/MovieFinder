import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [CardComponent],
})
export class SharedModule {}
