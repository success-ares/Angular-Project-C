import { Component, OnDestroy, OnInit } from '@angular/core';
import { AboutUsService } from './about-us.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  providers: [AboutUsService]
})
export class AboutUsComponent implements OnInit, OnDestroy {
  aboutUsSubscription: Subscription = null;
  aboutUs;
  loading = true;
  constructor(
    private aboutUsService: AboutUsService
  ) { }

  ngOnInit() {
    this.aboutUsSubscription = this.aboutUsService.getAboutU().subscribe((aboutUs) => {
      this.aboutUs = aboutUs;
      console.log(aboutUs);
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.aboutUsSubscription) {
      this.aboutUsSubscription.unsubscribe();
    }
  }
}
