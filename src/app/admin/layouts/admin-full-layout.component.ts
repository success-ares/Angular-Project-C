import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-full-layout.component.html',
  styleUrls: ['./admin-full-layout.component.css']
})
export class AdminFullLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  sideNavOpened = true;
  links = [];

  constructor(
    private router: Router,
    private us: UserService,
    public translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

ngOnInit(): void {
    this.translate.get('admin.layout').subscribe(data => {
      this.links.push(
        { name: data.navbar, link: 'navbar', icon: 'assignment' },
        { name: data.homepage, link: 'homepage', icon: 'person' },
        { name: data.partners, link: 'partners', icon: 'assignment' },
        // { name: data.pages, link: 'pages', icon: 'card_travel'},
        // { name: data.navbar, link: 'navbar', icon: 'card_travel'},
        // { name: data.services, link: 'services', icon: 'card_travel'},
        // { name: data.project, link: 'project', icon: 'card_travel'},
        { name: data.news, link: 'news', icon: 'card_travel'},
        { name: data.pressReleases, link: 'pressReleases', icon: 'card_travel'},
        { name: data.imageGallery, link: 'imageGallery', icon: 'card_travel'},
        { name: data.videoGallery, link: 'videoGallery', icon: 'card_travel'},
        { name: data.events, link: 'events', icon: 'card_travel'},
        { name: data.genericPages, link: 'genericPages', icon: 'card_travel'},
        { name: data.ceo, link: 'ceo-message', icon: 'card_travel'},
        { name: data.notification, link: 'notification', icon: 'card_travel'},

        { name: data.contact, link: 'contact', icon: 'person'},

        // { name: data.aboutus , link: 'aboutus' , icon: 'person'},
        // { name: data.skywalkDevelopments , link: 'skywalkDevelopments' , icon: 'person'},
        // { name: data.skywalkProject , link: 'skywalkProject' , icon: 'person'},
      );
    });
  }

  logout() {
    this.us.logout().then(() => {
      console.log('LOGGED OUT');
      this.router.navigate(['auth', 'login']);
    });
  }
}
