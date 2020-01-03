import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CareerService } from './career.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SeoService } from "../../shared/services/seo.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: [ './career.component.css', '../components/shared-contact-us-form/shared-contact-us-form.component.css' ],
  providers: [ CareerService ],
  encapsulation: ViewEncapsulation.None,

})

export class CareerComponent implements OnInit {


  contactForm = new FormGroup({
    name: new FormControl('', [ Validators.required ]),

  });


  constructor(
    private seoService: SeoService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.seoService.generateTags({
      title: `Careers`,
      slug: this.router.url,
    });

  }


}
