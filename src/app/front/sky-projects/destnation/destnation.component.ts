import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-destnation',
  templateUrl: './destnation.component.html',
  styleUrls: ['./destnation.component.css'],
  providers: [ProjectService],
})
export class DestnationComponent implements OnInit {
  response: Observable<{
  }>;

  constructor(
    private ps: ProjectService
  ) { }

  ngOnInit() {
    this.response = this.ps.getDestnation();
  }

}
