import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {


  @Input() carousel: any;
  public carouselOne: any;
  constructor(
    private router: Router,
  ) { }


  ngOnInit() {
    console.log(this.carousel);
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      // interval: 8000,
      point: {
        visible: true,
        pointStyles: `
        .ngucarouselPoint {
          list-style-type: none;
          padding: 12px;
          margin: 0;
          white-space: nowrap;
          overflow: auto;
          position: absolute;
          width: 100%;
          bottom: 20px;
          left: 5%;
          box-sizing: border-box;
          z-index: 4;
        }
        .ngucarouselPoint li {
          cursor: pointer;
          display: inline-block;
          background: rgba(158, 11, 15, .5);
          padding: 5px;
          margin: 0 3px;
          transition: .4s ease all;
        }
        .ngucarouselPoint li.active {
          background: rgba(158, 11, 15, 1);
        }
      `
      },
      load: 2,
      // touch: true,
      loop: true,
      custom: 'banner'
    };
  }

  openPage(link): void {
    const res = link.split('#');
    console.log(res);
    if (res.length > 1) {
      this.router.navigate( [`${res[0]}` ], {fragment: res[1]});
    } else {
      this.router.navigate( [`${link}` ]);
    }
  }

  public myfunc(event: Event) {
     // carouselLoad will trigger this funnction when your load value reaches
     // it is helps to load the data by parts to increase the performance of the app
     // must use feature to all carousel
  }
}
