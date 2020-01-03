import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class NewsService {

  constructor(
    private ss: SharedService
  ) { }


  getLatestNews() {
    return this.ss.getListAsSnapshot('news', null).pipe(
    map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  getNewsById(id) {
    return this.ss.getObject('news/' + id);
  }
}
