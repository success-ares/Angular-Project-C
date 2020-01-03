import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Image } from '../uploading-image/uploading-image.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() imagesSavePath: string;
  @Input() initHeader: Header;
  @Output() header = new EventEmitter<Header>();
  @Output() valid = new EventEmitter<boolean>();
  headerForm = new FormGroup({
    image: new FormGroup({
      imageDownloadURL: new FormControl('', [Validators.required]),
      imagePath: new FormControl('', [Validators.required])
    }),
    title: new FormControl('', [Validators.required]),
    titleColor: new FormControl(null, [])
  });

  constructor() { }

  ngOnInit() {
    this.updateFrom(this.initHeader);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFrom(changes.initHeader.currentValue);
  }

  updateFrom(value: Header): void {
    if (value) {
      if (value.image && value.image.imageDownloadURL) {
        this.headerForm.get('image').get('imageDownloadURL').setValue(value.image.imageDownloadURL);
      } else {
        this.headerForm.get('image').get('imageDownloadURL').reset();
      }
      if (value.image && value.image.imagePath) {
        this.headerForm.get('image').get('imagePath').setValue(value.image.imageDownloadURL);
      } else {
        this.headerForm.get('image').get('imagePath').reset();
      }
      if (value.title) {
        this.headerForm.get('title').setValue(value.title);
      } else {
        this.headerForm.get('title').reset();
      }
      if (value.titleColor) {
        this.headerForm.get('titleColor').setValue(value.titleColor);
      } else {
        this.headerForm.get('titleColor').reset();
      }
    } else {
      this.headerForm.reset();
    }
    this.emitValid();
  }

  updateImage(image: Image): void {
    this.headerForm.get('image').setValue(image);
    this.emitHeader();
  }

  emitHeader(): void {
    if (this.headerForm.valid) {
      this.header.emit(this.headerForm.value);
    } else {
      this.header.emit(null);
    }
    this.emitValid();
  }

  emitValid(): void {
    if (this.headerForm.valid) {
      this.valid.emit(true);
    } else {
      this.valid.emit(false);
    }
  }
}

export interface Header {
  image: Image;
  title: string;
  titleColor?: string;
}
