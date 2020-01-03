import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HostListener} from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../shared/services/user.service';
import { filter } from 'rxjs/internal/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './front-full-layout.component.html',
  styleUrls: ['./front-full-layout.component.css' , '../home/home.component.css']
})
export class FrontFullLayoutComponent implements OnInit , OnDestroy {

  private wowSubscription: Subscription;
  blackBg = 'black';
  isNavBarOpen: Boolean = false;
  offfeset: number;
  fixedBoxOffsetTopOtherMethod: any;
  fixedBoxOffsetTop: any;
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  sideNavOpened = true;
  links = [];
  @ViewChild('navbar') navbar: ElementRef;
  constructor(
    private router: Router,
    private us: UserService,
    public translate: TranslateService,
    private wowService: NgwWowService
  ) {
    this.translate.setDefaultLang('en');
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // Reload WoW animations when done navigating to page,
      // but you are free to call it whenever/wherever you like
      this.wowService.init(
        {
          boxClass:     'wow',      // animated element css class (default is wow)
          animateClass: 'animated', // animation css class (default is animated)
          offset:       100,          // distance to the element when triggering the animation (default is 0)
          mobile:       true,       // trigger animations on mobile devices (default is true)
          live:         true,       // act on asynchronously loaded content (default is true)
          callback:     function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
          },
          scrollContainer: null // optional scroll container selector, otherwise use window
        }
      );
    });
  }
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   if (window.pageYOffset > 100) {
  //     this.blackBg = 'black';
  //   } else {
  //     this.blackBg = 'black';
  //   }
  // }
  ngOnInit(): void {
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item: HTMLElement) => {
        // do whatever you want with revealed element
      });
    // this.translate.get('front.layout').subscribe(data => {
    //   this.links.push(
    //     { name: data.profile, link: '', icon: 'person' },
    //     { name: data.applications, link: '', icon: 'assignment' },
    //     { name: data.jobs, link: '', icon: 'card_travel'},
    //     // {
      // name: 'Test Interview', link: '/applicant/takeInterview/testInterview', icon: 'assessment'},
    //   );
    // });
  }

  togglNavbar() {
   this.isNavBarOpen = !this.isNavBarOpen;
   console.log(this.isNavBarOpen);
   if (this.isNavBarOpen) {
      this.navbar.nativeElement.style.left = '0px';
   }else {
      this.navbar.nativeElement.style.left = '-100%';
   }
   window.location.hash = 'abd';
  }
  routeTo(section: string) {
    this.router.navigateByUrl(section);
    this.navbar.nativeElement.style.left = '-100%';
    this.isNavBarOpen = false;
  }
  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    this.wowSubscription.unsubscribe();
  }
}
