import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from "../../shared/services/seo.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-contactus-page',
  templateUrl: './contactus-page.component.html',
  styleUrls: ['./contactus-page.component.css'],
  providers: [ ContactService ]
})
export class ContactusPageComponent implements OnInit, OnDestroy {
  firebaseContactSub: any;
  mapUrl: SafeResourceUrl;
  contact: any;
  loading = true;

  constructor(
    private cs: ContactService,
    private sanitizer: DomSanitizer,
    private seoService: SeoService,
    private router: Router,
  ) { }

  ngOnInit() {
     this.firebaseContactSub = this.cs.getContactInfo().subscribe((res: any) => {
       this.contact = res;
       const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCDN25r3F10eMq_h985L8Xj8zsbUjQaeB8&` +
        `q=${res.location.latitude}, ${res.location.longitude}&zoom=16`;

       this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
       this.loading = false;
       if (this.contact) {
         this.seoService.generateTags({
           title: `Headquarters`,
           description: this.contact.address,
           slug: this.router.url,
         });
       } else {
         this.seoService.generateTags({});
       }
      });
  }

  openGoogleMapInNewTab(): void {
    window.open(`https://www.google.com/maps/?q=${this.contact.location.latitude},${this.contact.location.longitude}`);
  }

  ngOnDestroy(): void {
    if (this.firebaseContactSub) {
      this.firebaseContactSub.unsubscribe();
    }
  }
}
