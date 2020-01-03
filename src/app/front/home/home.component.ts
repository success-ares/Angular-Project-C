import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './home.service';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '../../../../node_modules/@ngu/carousel';
import { Router } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ HomeService ]
})
export class HomeComponent implements OnInit {
  loading = true;
  carouselToken: string;
  homeCarousel: NguCarousel;
  carouselStore: NguCarouselStore;
  carouselItems: any[] = [];
  constructor(
    private hs: HomeService,
    private carousel: NguCarouselService,
    private router: Router,
    private seoService: SeoService,
  ) {
  }
  private initCarouselConfig(): void {
    this.homeCarousel = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 2,
      loop: true,
      touch: false
    };
  }

  initDataFn(key: NguCarouselStore) {
    this.carouselStore = key;
    this.carouselToken = key.token;
  }
  moveToNextSlide(key: NguCarouselStore) {
    this.carousel.moveToSlide(this.carouselToken, (this.carouselStore.currentSlide + 1) % this.carouselItems.length, true);
  }
  moveToPrevSlide(key: NguCarouselStore) {
    let slide: number;
    slide = this.carouselStore.currentSlide - 1;
    if (slide < 0) {
      slide = this.carouselItems.length - 1;
    }
    this.carousel.moveToSlide(this.carouselToken, slide, true);
  }
  navigateCarousel(index: number) {
    this.carousel.moveToSlide(this.carouselToken, index, true);
  }

  ngOnInit() {
    this.seoService.generateTags({});
    this.initCarouselConfig();
     this.hs.getCarouselItems().subscribe((items) => {
       this.carouselItems = items;
       this.loading = false;
     });
  }

  openPage(link, isExternal): void {
    if (isExternal) {
      this.router.navigate([]).then(e => {
        window.open(`//${link}`, '_blank');
      });
      return;
    }
    const res = link.split('#');
    console.log(res);
    if (res.length > 1) {
      this.router.navigate( [`${res[0]}` ], {fragment: res[1]});
    } else {
      this.router.navigate( [`${link}` ]);
    }
  }
}
