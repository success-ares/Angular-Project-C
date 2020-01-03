import { Component, OnInit } from '@angular/core';
import { DevelopmentService } from "../development.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-sky-about-us',
  templateUrl: './sky-about-us.component.html',
  styleUrls: ['./sky-about-us.component.css'],
  providers: [DevelopmentService]
})
export class SkyAboutUsComponent implements OnInit {

 
 response: Observable<{
  }>;

  constructor(
    private ds:DevelopmentService
  ) { }

  ngOnInit() {
    this.response = this.ds.getAboutUs();
  }

}
