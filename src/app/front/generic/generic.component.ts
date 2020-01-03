import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { GenericService } from './generic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SeoService } from '../../shared/services/seo.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css'],
  providers: [ GenericService ],
  encapsulation: ViewEncapsulation.None,
})
export class GenericComponent implements OnInit , OnDestroy, AfterViewInit {
  isBrowser = false;
  private fragment: string;
  sectionSub: Subscription;
  paramsSub: Subscription;
  sections: any;
  loading: Boolean = true;
  pageCotent: any;
  constructor(
    private gs: GenericService,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.route.fragment.subscribe(fragment => {
        this.fragment = fragment;
        this.ngAfterViewInit();
      });
    }
    this.paramsSub = this.route.params.subscribe(res => {
      const pageName = res['pageName'];
      this.loading = true;
      this.sectionSub = this.gs.getPageContent(pageName).subscribe(sec => {
        console.log(sec);
        this.sections = sec;
        if (this.sections && this.sections.length > 0) {
          this.seoService.generateTags({
            title: this.sections[ 0 ].right.title,
            image: this.sections[ 0 ].left.image.imageDownloadURL,
            description: this.sections[ 0 ].right.paragraph,
            slug: this.router.url,
          });
        } else {
          this.seoService.generateTags({});
        }
        this.loading = false;
      });
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      try {
        setTimeout(() => {
          console.log(`ferg ${this.fragment}`);
          if (this.fragment) {
            console.log('sdfsdfsdfs');
            const element = document.getElementById(this.fragment);
            console.log(element);
            if (element) {
              element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
            }
          } else {
            console.log('fragment');
          }
        }, 1500);
      } catch (e) {
      }
    }
  }

  ngOnDestroy(): void {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }
    if (this.sectionSub) {
      this.sectionSub.unsubscribe();
    }
  }
}
