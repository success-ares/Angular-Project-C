import { Component, OnInit } from '@angular/core';
import { CeoMessageService } from './ceo-message.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SeoService } from "../../shared/services/seo.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-ceo-message-page',
  templateUrl: './ceo-message-page.component.html',
  styleUrls: ['./ceo-message-page.component.css'],
  providers: [ CeoMessageService ]

})
export class CeoMessagePageComponent implements OnInit {

  ceo: any;
  ceoSub: Subscription;
  loading = true;
  constructor(
    private cms: CeoMessageService,
    private seoService: SeoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ceoSub = this.cms.getCeoMessage().subscribe(res => {
      this.ceo = res;
      this.loading = false;
      if (this.ceo) {
        this.seoService.generateTags({
          title: `CEO MESSAGE`,
          description: this.ceo.message,
          slug: this.router.url,
        });
      } else {
        this.seoService.generateTags({});
      }
    });
  }

}
