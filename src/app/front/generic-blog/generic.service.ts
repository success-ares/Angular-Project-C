import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';


@Injectable()
export class GenericService {

  readonly node = {
    news: 'news',
    events: 'events',
    pressReleases: 'pressReleases'
  };
  constructor(
    private ss: SharedService
  ) { }

  getLatestBlog(page) {
    const targetNode = this.node[page] ? this.node[page] : '';
    return this.ss.getListAsSnapshot(targetNode, null)
      .pipe(map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }
  getBlogById(page, id) {
    const targetNode = this.node[page] ? this.node[page] : '';
    return this.ss.getObject(`${targetNode}/` + id);
  }
}
