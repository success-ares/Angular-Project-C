import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [ProjectService],
})
export class LocationComponent implements OnInit {
  response: Observable<{
  }>;

  constructor(
    private ps : ProjectService
  ) { }

   ngOnInit() {
    this.response = this.ps.getLocation();
  }
}
