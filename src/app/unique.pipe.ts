import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique'
})
export class UniquePipe implements PipeTransform {

  transform(value: any[], key: string): any[] {
    const result = [];
    const map = new Map();
    for (const item of value) {
      if (!map.has(item[key])) {
        map.set(item[key], true);
        result.push(item);
      }
    }
    return result;
  }

}
