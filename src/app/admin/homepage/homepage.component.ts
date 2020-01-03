import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadService } from '../../shared/services/upload.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { HomepageService } from './homepage.service';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['../admin-common-style.css', './homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy, AfterViewInit {
  headerCarouselListSub: Subscription;
  displayedColumns = ['title', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isDataBeingSaved = false;
  openPanel = false;
  loading = false;
  pageTitle: string;

  headerTitleControl = new FormControl('', [Validators.required]);
  headerDescriptionControl = new FormControl('', [Validators.required]);
  headerRelativeURLControl = new FormControl('', [Validators.required]);
  headerButtonTextControl = new FormControl('', [Validators.required]);

  headerImage: NewImage = { base64img: '', file: null };

  constructor(
    private ups: UploadService,
    private router: Router,
    private hs: HomepageService,
    public translate: TranslateService,
    public snackBar: MatSnackBar
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.get('admin.home.pageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.getHeaderCarouselData();
  }

  getHeaderCarouselData() {
    this.headerCarouselListSub = this.hs.getHomeHeaderCarouselList().subscribe((carouselData: any) => {
      console.log(carouselData);
      this.dataSource.data = carouselData;
    });
  }

  async deleteCarouselHeader(headerData) {
    try {
      if (window.confirm('Are you sure you want to delete this header?')) {
        await this.hs.deleteHomeHeaderCarouselData(headerData.key);
        await this.hs.deleteHeaderImageFromStorage(headerData.backgroundImage.imagePath);
        this.openSnackBar('Deleted carousel data successfully', true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveCarouselData() {
    try {
      this.isDataBeingSaved = true;
      this.openSnackBar('Saving carousel data', false);
      const headerData = {
        infoBox: {
          title: this.headerTitleControl.value,
          description: this.headerDescriptionControl.value,
          relativeURL: this.headerRelativeURLControl.value,
          buttonText: this.headerButtonTextControl.value,
        },
        backgroundImage: {
          imagePath: '',
          imageURL: '',
        }
      };
      if (this.headerImage.file) {
        const imageUploadRes = await this.hs.uploadLoaclImage(this.headerImage.file);
        headerData.backgroundImage.imagePath = imageUploadRes.imgPath;
        headerData.backgroundImage.imageURL = imageUploadRes.imgDownloadPath;
      }
      await this.hs.saveHomeHeaderCarouselData(headerData);
      this.openSnackBar('Saved carousel data successfully', true);
      this.isDataBeingSaved = false;
      this.openPanel = false;
      this.resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  private resetForm() {
    this.headerTitleControl.setValue('');
    this.headerDescriptionControl.setValue('');
    this.headerRelativeURLControl.setValue('');
    this.headerButtonTextControl.setValue('');
    this.headerTitleControl.markAsUntouched();
    this.headerDescriptionControl.markAsUntouched();
    this.headerRelativeURLControl.markAsUntouched();
    this.headerButtonTextControl.markAsUntouched();
    this.headerImage = { base64img: '', file: null };
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
    return this.headerImage.base64img
      && (this.headerDescriptionControl.valid)
      && (this.headerRelativeURLControl.valid)
      && (this.headerButtonTextControl.valid);
  }

  cancel(): void {
    this.router.navigate(['admin', '']);
  }

  private openSnackBar(message, withTimer) {
    let options = {};
    if (withTimer) {
      options = {
        duration: 2000,
      };
    }
    this.snackBar.open(message, '', options);
  }

  ngOnDestroy(): void {
    if (this.headerCarouselListSub) {
      this.headerCarouselListSub.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface NewImage {
  base64img: string;
  file: File;
}
