import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css'],
})
export class NavbarItemComponent implements OnInit {
  @Input() item;
  @Input() childIndex;
  @Input() parent;
  @Output() clickedChildIndex = new EventEmitter<any>();
  @Output() closeMenu = new EventEmitter();
  clickedChildButton;
  clickedButton;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  clicked(buttonIndex, link) {
    console.log('child');
    console.log(this.childIndex);
    if (link) {
      this.openPage(link);
      this.emitCloseMenu();
    }
    this.clickedButton = buttonIndex;
    if (this.item && this.item.children) {
      this.emitChild(this.childIndex);
      console.log(this.childIndex);
    }
  }

  openPage(link): void {
    const res = link.split('#');
    console.log(res);
    if (res.length > 1) {
      this.router.navigate( [`${res[0]}` ], {fragment: res[1]});
    } else {
      this.router.navigate( [`${link}` ]);
    }
  }

  emitCloseMenu() {
    this.closeMenu.emit();
    this.removeChild();
  }

  removeChild() {
    this.clickedButton = null;
    this.clickedChildIndex.emit(null);
  }

  emitChild(index) {
    console.log('emit', index);
    this.clickedChildIndex.emit(index);
  }

  clickedChildButtonIndex(index) {
    console.log(index);
    this.clickedChildButton = index;
  }
}
