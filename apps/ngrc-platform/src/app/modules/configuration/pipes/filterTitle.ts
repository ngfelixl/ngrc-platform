import { Pipe, PipeTransform } from '@angular/core';
import { Slot } from '../models/slot';

@Pipe({ name: 'filterTitle' })
export class FilterTitlePipe implements PipeTransform {
  transform(value: Slot[], filter: string) {
    console.log(value, filter);
    return value && value.filter(o => o.title.localeCompare(filter) !== 0);
  }
}
