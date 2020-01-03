import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../news.service';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from '../../../shared/services/upload.service';
import { MatSnackBar, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-edit-or-add-news',
  templateUrl: './edit-or-add-news.component.html',
  styleUrls: ['./edit-or-add-news.component.css'],
  providers: [NewsService]
})
export class EditOrAddNewsComponent implements OnInit, OnDestroy {
  sectionId: any;
  firebaseSectionsSubscription: Subscription;
  sections: any;
  news: any;
  firebasenewsSubscription: Subscription = null;
  newsTitleFrom = new FormControl('', [Validators.required]);
  image = new FormControl(null, [Validators.required]);
  paragraph = new FormControl(null, [Validators.required]);

  isNew: boolean;
  newsId: string = null;
  newsTitle: string;
  loading = true;

  @ViewChild('choosenewsPhotoElement')
  private choosenewsImageElementRef: ElementRef;
  displayedColumns = ['newsTitle', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    public newsService: NewsService,
    private router: Router,
    public translate: TranslateService,
    private uploadService: UploadService,
    private snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.newsId = this.route.snapshot.params['id'];
    if (this.newsId) {
      this.isNew = false;
      this.translate.get('admin.genericnewss.news.editnewsTitle')
        .toPromise()
        .then(newsTitle => {
          this.newsTitle = newsTitle;
        });
      this.firebasenewsSubscription = this.newsService.getNewsById(this.newsId)
        .subscribe(news => {

          this.news = news;
          this.updateFrom();
          this.loading = false;
        });
    } else {
      this.translate.get('admin.genericnewss.news.newnewsTitle')
        .toPromise()
        .then(newsTitle => {
          this.newsTitle = newsTitle;
        });
      this.isNew = true;
      this.loading = false;
    }
  }

  updateFrom() {
    if (this.news) {
      this.newsTitleFrom.setValue(this.news.title);
      this.paragraph.setValue(this.news.content);
      this.image.setValue(this.news.image);
    }
  }

  invalidForm(): boolean {
    return this.newsTitleFrom.invalid || this.paragraph.invalid ;
  }

  saveNews(): void {
    this.news = {
      title: this.newsTitleFrom.value,
      content: this.paragraph.value,
      image: this.image.value,
      date: Date.now()
    };
    if(this.newsId){
      this.newsService.updateNews(this.news , this.newsId).then(()=>{
        this.router.navigateByUrl('/admin/news');
        this.openSnackBar('Saved sucessfully','');
      });
    } else {
        this.newsService.addNews(this.news).then(()=>{
        this.router.navigateByUrl('/admin/news');
        this.openSnackBar('Saved sucessfully','');
      });
    }
    console.log(this.news);
  }
  newImage(image){
    this.image.setValue(image);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
   ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy(): void {
    if (this.firebasenewsSubscription) {
      this.firebasenewsSubscription.unsubscribe();
    }
    if (this.firebaseSectionsSubscription){
      this.firebaseSectionsSubscription.unsubscribe();
    }
  }
}
