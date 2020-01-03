import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css'],
  providers: [ProjectService],

})
export class ElementsComponent implements OnInit {

  response: Observable<{
  }>;

  constructor(
    private ps: ProjectService
  ) { }

  ngOnInit() {
    this.response = this.ps.getElements();
  }
}
