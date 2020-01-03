import { Component, OnInit } from '@angular/core';
import { DevelopmentService } from "../development.service";
import { Observable } from "rxjs/Observable";
import { Router, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-philosophy',
  templateUrl: './philosophy.component.html',
  styleUrls: [ './philosophy.component.css' ],
  providers: [ DevelopmentService ]
})
export class PhilosophyComponent implements OnInit {

  response: Observable<{}>;

  constructor(private ds: DevelopmentService,
              private routerLinkActive: RouterLinkActive,
              private router: Router) {
  }

  ngOnInit() {
    // this.routerLinkActive
    console.log('current router url is : >>>>>>>>> ',this.router.url);
    this.response = this.ds.getPhilosophy();
  }

}
