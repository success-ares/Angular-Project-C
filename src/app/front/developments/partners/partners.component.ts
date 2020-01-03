import { Component, OnInit, OnDestroy } from '@angular/core';
import { DevelopmentService } from '../development.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SeoService } from "../../../shared/services/seo.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
  providers: [DevelopmentService]

})
export class PartnersComponent implements OnInit , OnDestroy {

  loading = true;
  partSub: Subscription;
  response: any;

  constructor(
    private ds: DevelopmentService,
    private seoService: SeoService,
    private router: Router,
  ) { }

  ngOnInit() {
     this.partSub = this.ds.getOurPartners().subscribe(res => {
       this.response = res;
       this.loading = false;
       this.seoService.generateTags({
         title: `Partners`,
         slug: this.router.url,
       });
     });
  }

  openLink(partnerLogo) {
    if (partnerLogo && partnerLogo.link && partnerLogo.link.length > 0) {
      let target = '_self';
      if (partnerLogo.newTab) {
        target = '_blank';
      }
      window.open(partnerLogo.link, target);
    }
  }

  ngOnDestroy(): void {
    if (this.partSub) {
      this.partSub.unsubscribe();
    }
  }
}
