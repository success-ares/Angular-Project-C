import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shared-section',
  templateUrl: './shared-section.component.html',
  styleUrls: ['./shared-section.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedSectionComponent implements OnInit {

  @Input() left: any;
  @Input() right: any;
  @Input() readMore: any;
  @Input() leftAnimate: String;
  @Input() rightAnimate: String;
  @Input() dummy:  boolean;


  constructor() { }

  ngOnInit() {
    // console.log(this.left , this.right);
    this.getView(this.left, this.right);
  }


  getView(arg0: any, arg1: any): any {
    console.log(arg0, arg1);
    if (arg0 && 'title' in arg0) {
      [this.left , this.right] =
      [this.right , this.left];
    }
  }
}
