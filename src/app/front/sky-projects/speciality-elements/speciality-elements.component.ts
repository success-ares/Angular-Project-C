import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-speciality-elements',
  templateUrl: './speciality-elements.component.html',
  styleUrls: ['./speciality-elements.component.css'],
  providers: [ProjectService],

})
export class SpecialityElementsComponent implements OnInit {

  response: Observable<{
  }>;

  constructor(
    private ps: ProjectService
  ) { }

  ngOnInit() {
    this.response = this.ps.getSpectElements();
  }
}
