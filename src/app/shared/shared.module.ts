import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseComponent } from './components/base/base.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [CardComponent, BaseComponent],
  imports: [CommonModule, FlexLayoutModule, PipesModule],
  exports: [CardComponent],
})
export class SharedModule {}
