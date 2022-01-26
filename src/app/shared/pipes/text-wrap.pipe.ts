import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textWrap',
})
export class TextWrapPipe implements PipeTransform {
  transform(value: string, length: number): string {
    if (typeof value === 'undefined') {
      return value;
    }

    const elipsis = '...';
    if (value.length <= length || value.length - length <= elipsis.length) {
      return value;
    }

    return value.slice(0, length).trim() + elipsis;
  }
}
