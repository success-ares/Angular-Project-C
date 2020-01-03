import {Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { NavbarService } from './navbar.service';
import {Router} from "@angular/router";

@Component({
  selector:  'app-navbar',
  templateUrl:  './navbar.component.html',
  styleUrls:  ['./navbar.component.css'],
  providers: [ NavbarService ]
})

export class NavbarComponent implements OnInit {
  navbar: any;
  isNavBarOpen: boolean;
  clickedButton = false;
  clickedChildButton;
  @ViewChild('menu') menu: ElementRef;

  navLinks = [];


  constructor(
    private ns: NavbarService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    console.log('iam here');
    this.ns.getNavBar().subscribe(res => {
     this.navbar = res;
     this.navLinks = res.items;
     console.log(this.navLinks);
    });
  }

// @HostListener('window:scroll', ['$event'])
// onWindowScroll($event) {
//     if(window.pageYOffset > 100){
//         this.menu.nativeElement.style.display = 'none';
//     }else{
//      this.menu.nativeElement.style.display = 'flex'; 
//     }
// }
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth > 760) {
  //     this.menu.nativeElement.style.display = 'flex';
  //   }else {
  //     this.menu.nativeElement.style.display = 'none';
  //     this.isNavBarOpen = false;
  //   }
  // }
  // close() {
  //   if (window.innerWidth < 760) {
  //   this.menu.nativeElement.style.display = 'none';
  //   this.isNavBarOpen = false;
  //   }
  // }
  //
  // open() {
  //   this.isNavBarOpen = !this.isNavBarOpen;
  //   // if (this.isNavBarOpen) {
  //   //     this.menu.nativeElement.style.display = 'block';
  //   // }else {
  //   //     this.menu.nativeElement.style.display = 'none';
  //   // }
  // }

  openPage(link): void {
    const res = link.split('#');
    console.log(res);
    if (res.length > 1) {
      this.router.navigate( [`${res[0]}` ], {fragment: res[1]});
    } else {
      this.router.navigate( [`${link}` ]);
    }
  }

  clicked(buttonIndex, link) {
    console.log('asd');
    if (link) {
      this.openPage(link);
      this.togglNavbar();
    }
    this.clickedButton = buttonIndex;
  }

  emitCloseMenu() {
    this.togglNavbar();
    this.removeChild();
  }

  removeChild() {
    this.clickedButton = null;
  }

  togglNavbar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }

  clickedChildButtonIndex(index) {
    console.log('parent emit', index);
    this.clickedChildButton = index;
  }
}
