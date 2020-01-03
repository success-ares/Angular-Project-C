import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { GenericService } from '../generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { SeoService } from "../../../shared/services/seo.service";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
  providers: [ GenericService ]
})
export class BlogDetailsComponent implements OnInit {

  shareLink: string;
  blog: any;
  paramsSub: Subscription;
  readonly node = {
    news: 'latest news',
    events: 'Upcoming Property Events',
    pressReleases: 'Press releases'
  };
  loading = true;
  isBrowser = false;

  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.shareLink = window.location.href;
    }
    this.paramsSub = this.route.params.subscribe(p => {
      const pageName = p['pageName'];
      if (!(pageName in this.node)) {
        this.router.navigate(['']);
      }
      const sectionId = p['id'];
     this.genericService.getBlogById(pageName , sectionId).subscribe(res => {
       this.blog = res;
       this.loading = false;
       if (this.blog) {
         this.seoService.generateTags({
           title: this.blog.title,
           image: this.blog.image.imageDownloadURL,
           description: this.blog.content,
           slug: this.router.url,
         });
       } else {
         this.seoService.generateTags({});
       }
     });
    });
  }

}
