import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Image } from '../uploading-image/uploading-image.component';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit, OnChanges {
  @Input() imagesSavePath: string;
  @Input() initElement: Element;
  @Output() element = new EventEmitter<Element>();
  @Output() valid = new EventEmitter<boolean>();
  elementForm = new FormGroup({
    image: new FormGroup({
      imageDownloadURL: new FormControl('', [Validators.required]),
      imagePath: new FormControl('', [Validators.required])
    }),
    title: new FormControl('', [Validators.required]),
    titleColor: new FormControl(null, [])
  });

  constructor() { }

  ngOnInit() {
    this.updateFrom(this.initElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFrom(changes.initElement.currentValue);
  }

  updateFrom(value: Element): void {
    if (value) {
      if (value.image && value.image.imageDownloadURL) {
        this.elementForm.get('image').get('imageDownloadURL').setValue(value.image.imageDownloadURL);
      } else {
        this.elementForm.get('image').get('imageDownloadURL').reset();
      }
      if (value.image && value.image.imagePath) {
        this.elementForm.get('image').get('imagePath').setValue(value.image.imageDownloadURL);
      } else {
        this.elementForm.get('image').get('imagePath').reset();
      }
      if (value.title) {
        this.elementForm.get('title').setValue(value.title);
      } else {
        this.elementForm.get('title').reset();
      }
      if (value.titleColor) {
        this.elementForm.get('titleColor').setValue(value.titleColor);
      } else {
        this.elementForm.get('titleColor').reset();
      }
    } else {
      this.elementForm.reset();
    }
    this.emitValid();
  }

  updateImage(image: Image): void {
    this.elementForm.get('image').setValue(image);
    this.emitElement();
  }

  emitElement(): void {
    this.element.emit(this.elementForm.value);
    this.emitValid();
  }

  emitValid(): void {
    if (this.elementForm.valid) {
      this.valid.emit(true);
    } else {
      this.valid.emit(false);
    }
  }
}

export interface Element {
  image: Image;
  title: string;
  titleColor?: string;
}
