import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericService } from './generic.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { not } from '@angular/compiler/src/output/output_ast';
import { SeoService } from "../../shared/services/seo.service";


@Component({
  selector: 'app-generic-blog',
  templateUrl: './generic-blog.component.html',
  styleUrls: ['./generic-blog.component.css'],
  providers: [ GenericService ]
})
export class GenericBlogComponent implements OnInit, OnDestroy {



  pageName: any;
  paramsSub: Subscription;
  loading: Boolean = true;
  blogSub: Subscription;
  readonly node = {
    news: 'latest news',
    events: 'Upcoming Property Events',
    pressReleases: 'Press releases'
  };
  blog: any[];

  constructor(
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) { }


  ngOnInit() {

    this.paramsSub = this.route.params.subscribe(p => {
         this.pageName = p['pageName'];
      if (!(this.pageName in this.node)) {
        this.router.navigate(['']);
      }
      this.pageName = p['pageName'];
      this.blogSub = this.genericService.getLatestBlog(this.pageName).subscribe(res => {
        this.blog = res;
        this.loading = false;
        this.seoService.generateTags({
          title: this.node[this.pageName],
          slug: this.router.url,
        });
      });
    });
  }
  ngOnDestroy(): void {
    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
  }

}
