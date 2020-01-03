import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-phase1',
  templateUrl: './phase1.component.html',
  styleUrls: ['./phase1.component.css'],
  providers: [ProjectService],

})
export class Phase1Component implements OnInit {

  response: Observable<{
  }>;

  constructor(
    private ps: ProjectService
  ) { }

  ngOnInit() {
    this.response = this.ps.getPhase1();
  }

}
