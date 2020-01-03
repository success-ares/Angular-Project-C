import {Injectable} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class GenericService {
  readonly genericPageNode = 'genericPages/pagesListDetails';

  constructor(private ss: SharedService) {
  }

  getObjectValues(object) {
    const res = [];
    Object.keys(object).forEach(key => {
      res.push(object[key]);
    });
    return res;
  }

  getPageContent(pageName: string) {
    return this.ss.getListAsValue(this.genericPageNode,
      ref => ref.orderByChild('link').equalTo(pageName).limitToFirst(1)
    ).pipe(map((res: any) => {
      if (res && res[0] && res[0].sections) {
        const sections = this.getObjectValues(res[0].sections);
        if (sections.length > 0) {
          console.log(sections);
          const sorted = sections.sort(
            function (a: any, b: any) {
              return (a.right.order > b.right.order) ? 1 : ((b.right.order > a.right.order) ? -1 : 0);
            });
          console.log(sorted);
          return sections;
        } else {
          return [];
        }
      } else {
        return [];
      }
    }));
  }
}
