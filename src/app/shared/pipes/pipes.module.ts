import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextWrapPipe } from './text-wrap.pipe';

@NgModule({
  declarations: [TextWrapPipe],
  imports: [CommonModule],
  exports: [TextWrapPipe],
})
export class PipesModule {}
