import { Component, OnInit , OnDestroy } from '@angular/core';
import { NewsService } from '../news.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [ NewsService ]
})
export class NewsComponent implements OnInit, OnDestroy {


  loading: Boolean = true;
  newsSub: Subscription;
  news: any[];
  constructor(
    private newsService: NewsService
  ) { }

   ngOnInit() {
    this.newsSub = this.newsService.getLatestNews().subscribe(res => {
      this.news = res;
      this.loading = false;
    });
  }
  ngOnDestroy(): void {
    if (this.newsSub) {
      this.newsSub.unsubscribe();
    }
  }
}
