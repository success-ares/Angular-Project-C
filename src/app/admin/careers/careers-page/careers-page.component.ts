import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CareerService } from '../career.service';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AddNewCategoryDialogComponent } from '../add-new-category-dialog/add-new-category-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../../../shared/services/upload.service';

@Component({
  selector: 'app-careers-page',
  templateUrl: './careers-page.component.html',
  styleUrls: ['../../admin-common-style.css', './careers-page.component.css'],
  providers: [CareerService]
})
export class CareersPageComponent implements OnInit, AfterViewInit, OnDestroy {
  careersDisplayedColumns = ['career', 'category', 'edit', 'delete'];
  careersDataSource = new MatTableDataSource();
  @ViewChild('careersMatPaginator') careersPaginator: MatPaginator;
  benefitsDisplayedColumns = ['benefit', 'edit', 'delete'];
  benefitsDataSource = new MatTableDataSource();
  @ViewChild('benefitsMatPaginator') benefitsPaginator: MatPaginator;
  firebaseCareersSubscription: Subscription = null;
  firebaseCareersCategoriesSubscription: Subscription = null;
  firebaseCareersHeaderSubscription: Subscription = null;
  firebaseCareersMainSectionSubscription: Subscription = null;
  firebaseCareersBenefitsSubscription: Subscription = null;
  headerImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required])
  });
  mainSectionTitleForm = new FormControl('', [Validators.required]);
  mainSectionImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required])
  });
  header;
  mainSection;
  pageTitle: string;
  loadingCareersHeader = true;
  loadingCareersMainSection = true;
  loadingCareersBenefits = true;
  loadingCareers = true;
  loadingCareersCategories = true;
  loading = true;
  categories = [];

  @ViewChild('headerImage')
  private chooseHeaderPhotoElementRef: ElementRef;

  @ViewChild('mainSectionImage')
  private chooseMainPhotoElementRef: ElementRef;

  constructor(
    public careerService: CareerService,
    public translate: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    private uploadService: UploadService,
    public snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.get('admin.careers.pageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.firebaseCareersHeaderSubscription = this.careerService.getHeader()
      .subscribe(header => {
        this.header = header;
        this.updateHeaderImageForm(this.header);
        this.loadingCareersHeader = false;
        this.updatedLoading();
      });
    this.firebaseCareersMainSectionSubscription = this.careerService.getMainSection()
      .subscribe(mainSection => {
        this.mainSection = mainSection;
        this.updateMainSectionForm(this.mainSection);
        this.loadingCareersMainSection = false;
        this.updatedLoading();
      });
    this.firebaseCareersBenefitsSubscription = this.careerService.getBenefitsList()
      .subscribe(benefitsMetadataList => {
        this.benefitsDataSource.data = benefitsMetadataList;
        this.loadingCareersBenefits = false;
        this.updatedLoading();
      });
    this.firebaseCareersSubscription = this.careerService.getCareersList()
      .subscribe(careerMetadataList => {
        this.careersDataSource.data = careerMetadataList;
        this.loadingCareers = false;
        this.updatedLoading();
      });
    this.firebaseCareersCategoriesSubscription = this.careerService.getCareersCategories()
      .subscribe(categories => {
       this.categories = categories;
       this.loadingCareersCategories = false;
       this.updatedLoading();
    });
  }

  ngAfterViewInit(): void {
    this.careersDataSource.paginator = this.careersPaginator;
    this.benefitsDataSource.paginator = this.benefitsPaginator;
  }

  updatedLoading(): void {
    this.loading = (this.loadingCareers || this.loadingCareersBenefits || this.loadingCareersCategories
      || this.loadingCareersHeader || this.loadingCareersMainSection);
    console.log(this.loading);
  }

  updateMainSectionForm(section): void {
    if (section) {
      this.mainSectionTitleForm.setValue(section.mainTitle);
      if (section.mainImage) {
        this.mainSectionImageForm.get('imageDownloadURL').setValue(section.mainImage.imageDownloadURL);
        this.mainSectionImageForm.get('imagePath').setValue(section.mainImage.imagePath);
      }
    }
  }

  updateHeaderImageForm(header): void {
    if (header && header.headerImage) {
      this.headerImageForm.get('imageDownloadURL').setValue(header.headerImage.imageDownloadURL);
      this.headerImageForm.get('imagePath').setValue(header.headerImage.imagePath);
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

  saveMainSection(): void {
    this.mainSection = {
      mainTitle: this.mainSectionTitleForm.value,
      mainImage: {
        imageDownloadURL: this.mainSectionImageForm.get('imageDownloadURL').value,
        imagePath: this.mainSectionImageForm.get('imagePath').value
      }
    };
    this.careerService.saveMainSection(this.mainSection)
      .then(() => {
        this.openSnackBar('Saved Successfully', 'X');
      });
  }

  chooseMainSectionPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/careers/mainSection/images';
      this.uploadPhoto(imagesToUpload, url, this.mainSectionImageForm, this.chooseMainPhotoElementRef);
    }
  }

  chooseHeaderPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/careers/header/images';
      this.uploadPhoto(imagesToUpload, url, this.headerImageForm, this.chooseHeaderPhotoElementRef)
        .then(() => {
          this.header = {
            headerImage: {
              imageDownloadURL: this.headerImageForm.get('imageDownloadURL').value,
              imagePath: this.headerImageForm.get('imagePath').value
            }
          };
          this.careerService.updateHeader(this.header)
            .then(() => {
              this.openSnackBar('Updated Successfully', 'X');
            });
        });
    }
  }

  openModalForAddingNewCategory(careerMetadata): void {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categories.push(result);
        this.careerService.updateCategories(this.categories)
          .then(() => {
            careerMetadata.category = result;
            this.updateCategory(careerMetadata);
          });
      }
    });
  }

  updateCategory(careerMetadata): void {
    this.careerService.updateCareerCategory(careerMetadata);
  }

  deleteCareer(career): void {
    this.translate.get('admin.careers.confirmDelete').toPromise().then(confirmString => {
      const result = confirm(`${confirmString} "${career.title}"?`);
      if (result) {
        this.careerService.deleteCareer(career)
          .then(() => {
            console.log('Deleted successfully: ', career);
            this.openSnackBar('Deleted Successfully', 'X');
          })
          .catch(error => {
            console.log('Failed to Delete with Error:', error);
            this.openSnackBar('Failed to Delete', 'X');
          });
      } else {
        console.log('Canceled');
      }
    });
  }

  deleteBenefit(benefit): void {
    this.translate.get('admin.careers.confirmDelete').toPromise().then(confirmString => {
      const result = confirm(`${confirmString} "${benefit.header}"?`);
      if (result) {
        this.careerService.deleteBenefit(benefit)
          .then(() => {
            console.log('Deleted successfully: ', benefit);
            this.openSnackBar('Deleted Successfully', 'X');
          })
          .catch(error => {
            console.log('Failed to Delete with Error:', error);
            this.openSnackBar('Failed to Delete', 'X');
          });
      } else {
        console.log('Canceled');
      }
    });
  }

  openCareer(career): void {
    this.router.navigate([`/admin/careers/${career.key}/view`]);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseCareersSubscription) {
      this.firebaseCareersSubscription.unsubscribe();
    }
    if (this.firebaseCareersCategoriesSubscription) {
      this.firebaseCareersCategoriesSubscription.unsubscribe();
    }
    if (this.firebaseCareersHeaderSubscription) {
      this.firebaseCareersHeaderSubscription.unsubscribe();
    }
    if (this.firebaseCareersMainSectionSubscription) {
      this.firebaseCareersMainSectionSubscription.unsubscribe();
    }
    if (this.firebaseCareersBenefitsSubscription) {
      this.firebaseCareersBenefitsSubscription.unsubscribe();
    }
  }
}
