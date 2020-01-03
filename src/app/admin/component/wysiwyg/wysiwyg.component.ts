import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../../../shared/services/upload.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css']
})
export class WysiwygComponent implements OnInit, OnDestroy {
  contentFormControlSubscription: Subscription = null;
  @Input() contentFormControl;
  @Input() imagesSavePath;
  content;

  @ViewChild('ckeditor')
  private ckeditor: any;

  @ViewChild('ckImage')
  private ckImage: ElementRef;

  ckeConfig = {
    height: 400,
    language: 'en',
    allowedContent: true,
    uiColor: '#ffffff',
    removePlugins: 'save,font,flash,iframe,showblocks,pagebreak,div,forms, pastefromword,about, image',
    extraPlugins: 'divarea'
  };

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.content = this.contentFormControl.value;
    this.contentFormControlSubscription =  this.contentFormControl.valueChanges
      .subscribe((data) => this.content = data);
  }

  openImageExplorer(event) {
    console.log(event);
  }

  uploadCKEditorPhoto(files) {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      this.createLoadingShade('Uploading Image...');
      this.uploadService.uploadImages(imagesToUpload, this.imagesSavePath)
        .then(images => {
          if (images[0]) {
            try {
              const link = this.ckeditor.instance.document.createElement('img');
              link.setAttribute('alt', 'Image');
              link.setAttribute('src', images[0].imageURL);
              this.ckeditor.instance.insertElement(link);
            } catch (error) {
              console.log((<Error>error).message);
            }
          }
          this.removeLoadingShade();
          this.ckImage.nativeElement.value = '';
      });
    }
  }

  createLoadingShade(text) {
    const loadingShade = document.createElement('div');
    loadingShade.className = 'loading-shade';
    loadingShade.style.position = 'fixed';
    loadingShade.style.zIndex = '100000';
    loadingShade.style.display = 'flex';
    loadingShade.style.justifyContent = ' center';
    loadingShade.style.alignItems = 'center';
    loadingShade.style.backgroundColor = 'rgba(0,0,0,0.4)';
    loadingShade.style.top = '0';
    loadingShade.style.bottom = '0';
    loadingShade.style.left = '0';
    loadingShade.style.right = '0';
    const loadingText = document.createElement('h1');
    loadingText.style.color = '#FFF';
    loadingText.innerHTML = text;
    loadingShade.appendChild(loadingText);
    document.body.appendChild(loadingShade);
  }

  removeLoadingShade() {
    const shade = document.querySelector('.loading-shade');
    if (shade) {
      shade.remove();
    }
  }

  onChange(event) {
    this.contentFormControl.setValue(this.content);
  }

  ngOnDestroy(): void {
    if (this.contentFormControlSubscription) {
      this.contentFormControlSubscription.unsubscribe();
    }
  }
}
