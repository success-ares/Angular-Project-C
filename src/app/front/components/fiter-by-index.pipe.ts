import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fiterByIndex'
})
export class FiterByIndexPipe implements PipeTransform {

  transform(items: any, filter: any): any {
    if (!items || !filter) {
      return items;
    }
    console.log(items);
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    if (filter === 5) {
      return items.partners.splice(0, 5);
    }
    return items.partners.splice (4);
  }

}
