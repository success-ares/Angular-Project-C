import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css']
})
export class SharedHeaderComponent implements OnInit {
  @Input() header: any;

  constructor() { }

  ngOnInit() {
  }

}
