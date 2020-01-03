import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UploadService } from '../../shared/services/upload.service';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HomepageService } from './homepage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'edit-section.component.html',
  styleUrls: ['../admin-common-style.css', './edit-section.component.css']
})
export class EditSectionComponent implements OnInit, OnDestroy {
  pageTitle: string;
  headerKey: any;
  carouselHeader: any = {
    infoBox: {
      title: '',
      description: '',
      relativeURL: '',
      buttonText: '',
      isExternal: false
    },
    backgroundImage: {
      imagePath: '',
      imageURL: '',
    }
  };
  carouselHeaderSub: Subscription;
  headerImage = { base64img: '', file: null };
  headerTitleControl = new FormControl('', [Validators.required]);
  headerDescriptionControl = new FormControl('', [Validators.required]);
  headerRelativeURLControl = new FormControl('', [Validators.required]);
  headerButtonTextControl = new FormControl('', [Validators.required]);
  headerCheckBoxControl = new FormControl('');
  loading = false;
  isDataBeingSaved = false;
  private paramsSubscription: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ups: UploadService,
    private hs: HomepageService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translate.get('admin.home.editSection.editPageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.paramsSubscription = this.route.params.subscribe(params => {
      const headerId = params['id'];
      this.headerKey = params['id'];
      this.getHeaderData(headerId);
    });
  }

  getHeaderData(headerId) {
    this.loading = true;
    this.carouselHeaderSub = this.hs.getCarouselheaderObject(headerId).subscribe(headerData => {
      this.carouselHeader = headerData.payload.val();
      console.log('this.carouselHeader', this.carouselHeader);
      this.loading = false;
    });
  }

  choosePhoto(files): void {
    if (files && files[0]) {
      this.ups.handlePicFileSelect(files[0], 1000, (base64img: any) => {
        this.headerImage.base64img = base64img;
        this.headerImage.file = files[0];
        (<HTMLInputElement>document.getElementById('uploadCaptureInputFile')).value = '';
      });
    }
  }

  validHeader(): boolean {
    return this.carouselHeader.backgroundImage.imageURL
      && (this.headerDescriptionControl.valid)
      && (this.headerRelativeURLControl.valid)
      && (this.headerButtonTextControl.valid)
      && (this.headerCheckBoxControl.valid);
  }

  async saveCarouselData() {
    try {
      this.isDataBeingSaved = true;
      const headerData = {
        infoBox: {
          title: this.headerTitleControl.value,
          description: this.headerDescriptionControl.value,
          relativeURL: this.headerRelativeURLControl.value,
          buttonText: this.headerButtonTextControl.value,
          isExternal: this.headerCheckBoxControl.value
        },
        backgroundImage: {
          imagePath: this.carouselHeader.backgroundImage.imagePath,
          imageURL: this.carouselHeader.backgroundImage.imageURL,
        }
      };
      if (this.headerImage.file) {
        await this.hs.deleteHeaderImageFromStorage(headerData.backgroundImage.imagePath);
        const imageUploadRes = await this.hs.uploadLoaclImage(this.headerImage.file);
        headerData.backgroundImage.imagePath = imageUploadRes.imgPath;
        headerData.backgroundImage.imageURL = imageUploadRes.imgDownloadPath;
      }
      await this.hs.updateCarouselHeader(this.headerKey, headerData);
      this.router.navigate(['admin', 'homepage']);
      this.isDataBeingSaved = false;
    } catch (error) {
      console.log(error);
    }
  }

  cancel(): void {
    this.router.navigate(['admin', 'homepage']);
  }

  ngOnDestroy() {
    if (this.carouselHeaderSub) {
      this.carouselHeaderSub.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

}

export interface FirebaseImage {
  imagePath: string;
  imageURL: string;
}
