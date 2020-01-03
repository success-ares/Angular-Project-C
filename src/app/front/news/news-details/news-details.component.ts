import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css' , '../news/news.component.css'],
  providers: [ NewsService ]
})
export class NewsDetailsComponent implements OnInit {

  loading: Boolean = true;
  news: Observable<{}>;
  constructor(
    private ns: NewsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
      const id =  params['id'];
      this.news = this.ns.getNewsById(id);
      this.loading = false;
    });
  }

}
