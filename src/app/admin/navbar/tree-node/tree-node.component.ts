import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit, OnChanges {
  @Input() node;
  @Input() parent;
  @Input() index;
  @Input() level;
  MaxLevel = 2;
  showChildren = false;

  currentIndex: number;

  constructor() { }

  ngOnInit() {
    console.log(`${this.index} and ${this.parent.length}`);
  }

  ngOnChanges(changes) {
    this.currentIndex = changes.index.currentValue;
  }

  addNewSubItem(): void {
    this.showChildren = true;
    this.node.children = this.node.children || [];
    this.node.children.push({
      text: '',
    link: '',
      children: []
    });
  }

  delete(): void {
    this.parent.splice(this.index, 1);
  }

  moveUpItem(): void {
    const temp = this.parent[this.index];
    this.parent[this.index] = this.parent[this.index - 1];
    this.parent[this.index - 1] = temp;
  }

  moveDownItem(): void {
    const temp = this.parent[this.index];
    this.parent[this.index] = this.parent[this.index + 1];
    this.parent[this.index + 1] = temp;
  }

  showOrHideChildren(): void {
    this.showChildren = !this.showChildren;
  }
}
