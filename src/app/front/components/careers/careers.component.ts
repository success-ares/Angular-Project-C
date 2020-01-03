import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
    @Input() career: any;
  constructor() { }

  ngOnInit() {
  }

}
