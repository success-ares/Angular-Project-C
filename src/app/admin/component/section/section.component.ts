import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Image } from '../uploading-image/uploading-image.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionService } from './section.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  providers: [ SectionService ]
})
export class SectionComponent implements OnInit {
  @Input() imagesSavePath: string;
  @Input() initSection: Section;
  @Input() pageId: String;
  @Input() sectionId: String;

  swapped: Boolean = false;
  sectionForm = new FormGroup({
    left: new FormGroup({
      image: new FormGroup({
        imageDownloadURL: new FormControl('', [Validators.required]),
        imagePath: new FormControl('', [Validators.required])
      })
    }),
    right: new FormGroup({
      image: new FormGroup({
        imageDownloadURL: new FormControl(null, []),
        imagePath: new FormControl(null, [])
      }),
      title: new FormControl('', [Validators.required]),
      titleColor: new FormControl(null, []),
      titleBackgroundColor: new FormControl(null, []),
      paragraph: new FormControl(null, []),
      paragraphColor: new FormControl(null, []),
      backgroundColor: new FormControl(null, [Validators.required]),
      footer: new FormControl(null, []),
      footerColor: new FormControl(null, []),
      footerbackgroundColor: new FormControl(null, []),
      wterMark: new FormGroup({
        imageDownloadURL: new FormControl(null, []),
        imagePath: new FormControl(null, [])
      }),
    })
  });

  constructor(
    private scs: SectionService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.initSection);
    // this.sectionForm.setValue(this.initSection);
    this.updateFrom(this.initSection);
  }

  updateFrom(value: Section): void {
    if (value) {
      if (value.left && value.left.image) {
        if (value.left.image.imageDownloadURL) {
          this.sectionForm.get('left').get('image').get('imageDownloadURL').setValue(value.left.image.imageDownloadURL);
        } else {
          this.sectionForm.get('left').get('image').get('imageDownloadURL').reset();
        }
        if (value.left.image.imagePath) {
          this.sectionForm.get('left').get('image').get('imagePath').setValue(value.left.image.imagePath);
        } else {
          this.sectionForm.get('left').get('image').get('imagePath').reset();
        }
      } else {
        this.sectionForm.get('left').get('image').reset();
      }
      if (value.right) {
        if (value.right.image) {
          if (value.right.image.imageDownloadURL) {
            this.sectionForm.get('right').get('image').get('imageDownloadURL').setValue(value.right.image.imageDownloadURL);
          } else {
            this.sectionForm.get('right').get('image').get('imageDownloadURL').reset();
          }
          if (value.right.image.imagePath) {
            this.sectionForm.get('right').get('image').get('imagePath').setValue(value.right.image.imagePath);
          } else {
            this.sectionForm.get('right').get('image').get('imagePath').reset();
          }
        } else {
          this.sectionForm.get('right').get('image').reset();
        }
        if (value.right.title) {
          this.sectionForm.get('right').get('title').setValue(value.right.title);
        } else {
          this.sectionForm.get('right').get('title').reset();
        }
        if (value.right.titleColor) {
          this.sectionForm.get('right').get('titleColor').setValue(value.right.titleColor);
        } else {
          this.sectionForm.get('right').get('titleColor').reset();
        }
        if (value.right.titleBackgroundColor) {
          this.sectionForm.get('right').get('titleBackgroundColor').setValue(value.right.titleBackgroundColor);
        } else {
          this.sectionForm.get('right').get('titleBackgroundColor').reset();
        }
        if (value.right.paragraph) {
          this.sectionForm.get('right').get('paragraph').setValue(value.right.paragraph);
        } else {
          this.sectionForm.get('right').get('paragraph').reset();
        }
        if (value.right.paragraphColor) {
          this.sectionForm.get('right').get('paragraphColor').setValue(value.right.paragraphColor);
        } else {
          this.sectionForm.get('right').get('paragraphColor').reset();
        }
        if (value.right.backgroundColor) {
          this.sectionForm.get('right').get('backgroundColor').setValue(value.right.backgroundColor);
        } else {
          this.sectionForm.get('right').get('backgroundColor').reset();
        }


        if (value.right.footer) {
          this.sectionForm.get('right').get('footer').setValue(value.right.footer);
        } else {
          this.sectionForm.get('right').get('footer').reset();
        }
        if (value.right.footerColor) {
          this.sectionForm.get('right').get('footerColor').setValue(value.right.footerColor);
        } else {
          this.sectionForm.get('right').get('footerColor').reset();
        }
        if (value.right.footerbackgroundColor) {
          this.sectionForm.get('right').get('footerbackgroundColor').setValue(value.right.footerbackgroundColor);
        } else {
          this.sectionForm.get('right').get('footerbackgroundColor').reset();
        }
        if (value.right.wterMark) {
          this.sectionForm.get('right').get('wterMark').setValue(value.right.wterMark);
        }else {
          this.sectionForm.get('right').get('wterMark').setValue(value.right.wterMark);
        }

        if (value.right.wterMark) {
          if (value.right.wterMark.imageDownloadURL) {
            this.sectionForm.get('right').get('wterMark').get('imageDownloadURL')
            .setValue(value.right.wterMark.imageDownloadURL);
          } else {
            this.sectionForm.get('right').get('wterMark').get('imageDownloadURL').reset();
          }
          if (value.right.wterMark.imagePath) {
            this.sectionForm.get('right').get('wterMark').get('imagePath').setValue(value.right.wterMark.imagePath);
          } else {
            this.sectionForm.get('right').get('wterMark').get('imagePath').reset();
          }
        }
      } else {
        this.sectionForm.get('right').reset();
      }
    } else {
      this.sectionForm.reset();
    }
  }

  updateLeftChildImage(image: Image): void {
    this.sectionForm.get('left').get('image').setValue(image);
  }
  updateWaterMarkImage(image: Image) {
    this.sectionForm.get('right').get('wterMark').setValue(image);
  }

  updateRightChildImage(image: Image): void {
    this.sectionForm.get('right').get('image').setValue(image);
  }


  emitForm() {
    if (!this.sectionId) {
      this.scs.pushSectionToPage(this.sectionForm.value , this.pageId);
    }else {
      this.scs.saveSection(this.sectionForm.value, this.pageId, this.sectionId);
    }
    this.sectionForm.reset();
    this.router.navigateByUrl(`/admin/genericPages/${this.pageId}/edit`);
    // console.log(this.sectionForm.value);
  }
}

export interface SectionChild {
  image?: Image;
  title?: string;
  titleColor?: string;
  titleBackgroundColor?: string;
  paragraph?: string;
  paragraphColor?: string;
  backgroundColor?: string;
  footer?: string;
  footerColor?: string;
  footerbackgroundColor?: string;
  wterMark?: Image;
}

export interface Section {
  left: SectionChild;
  right: SectionChild;
}
