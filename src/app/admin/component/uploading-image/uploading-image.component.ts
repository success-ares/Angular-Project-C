import {
  Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../../../shared/services/upload.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-uploading-image',
  templateUrl: './uploading-image.component.html',
  styleUrls: ['./uploading-image.component.css']
})
export class UploadingImageComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() required: boolean;
  @Input() imagesSavePath: string;
  @Input() initImage: Image;
  @Output() image = new EventEmitter<Image>();
  imageForm = new FormGroup({
    imageDownloadURL: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required])
  });

  @ViewChild('imageElement')
  private imageElementRef: ElementRef;

  constructor(
    private uploadService: UploadService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.updateFrom(this.initImage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateFrom(changes.initImage.currentValue);
  }

  updateFrom(value: Image): void {
    if (value) {
      if (value.imagePath) {
        this.imageForm.get('imagePath').setValue(value.imagePath);
      } else {
        this.imageForm.get('imagePath').reset();
      }
      if (value.imageDownloadURL) {
        this.imageForm.get('imageDownloadURL').setValue(value.imageDownloadURL);
      } else {
        this.imageForm.get('imageDownloadURL').reset();
      }
    } else {
      this.imageForm.reset();
    }
  }

  uploadPhoto(imagesToUpload, url, imageForm, successImageElement): Promise<void> {
    return this.uploadService.uploadImages(imagesToUpload, url)
      .then(images => {
        if (images[0]) {
          try {
            imageForm.get('imageDownloadURL').setValue(images[0].imageURL);
            imageForm.get('imagePath').setValue(images[0].imagePath);
          } catch (error) {
            console.log((<Error>error).message);
          }
        }
        successImageElement.nativeElement.value = '';
      });
  }

  choosePhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const uploadingSnackBar = this.snackBar.open('Uploading...');
      this.uploadPhoto(imagesToUpload, this.imagesSavePath, this.imageForm, this.imageElementRef)
        .then(() => {
          uploadingSnackBar.dismiss();
          this.openSnackBar('Uploaded Image Successfully', 'X');
          this.emitImage();
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  emitImage(): void {
    this.image.emit(this.imageForm.value);
  }

  deleteImage(): void {
    this.imageForm.reset();
    this.emitImage();
  }
}

export interface Image {
  imageDownloadURL: string;
  imagePath: string;
}
