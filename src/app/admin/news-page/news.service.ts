import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class NewsService {
  readonly newsList = 'news';

  constructor(private sharedService: SharedService,
  ) {
  }

  getNewsList(): Observable<any[]> {
    return this.sharedService.getListAsSnapshot(this.newsList, null).pipe(
      map(res => {
        return res.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }));
  }

  getNewsById(id) {
    return this.sharedService.getObject(`${this.newsList}/${id}`);
  }


  addNews(news: any) {
    return this.sharedService.pushObjectToList(this.newsList, news);
  }

  updateNews(news: any, id): Promise<void> {
    return this.sharedService.updateObject(`${this.newsList}/${id}`, news);
  }

  deleteNews(news: any): Promise<void> {
    return this.sharedService.deleteObject(`${this.newsList}/${news.key}`);
  }
}
