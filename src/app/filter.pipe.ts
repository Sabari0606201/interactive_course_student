import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filter: any): any[] {
    if (!filter) {
      return value;
    }
    return value.filter(item => item[filter.key] === filter.value);
  }
}
