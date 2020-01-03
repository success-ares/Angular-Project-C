import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from '../../../shared/services/upload.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-or-add-project-page',
  templateUrl: './edit-or-add-project-page.component.html',
  styleUrls: ['../../admin-common-style.css', './edit-or-add-project-page.component.css'],
  providers: [ProjectService]
})
export class EditOrAddProjectPageComponent implements OnInit, OnDestroy {
  project;
  firebaseProjectSubscription: Subscription = null;
  projectTitle = new FormControl('', [Validators.required]);
  headerImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required])
  });
  projectAbout = new FormControl('', [Validators.required]);
  aboutImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required])
  });
  projectLocation = new FormGroup({
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required])
  });
  projectMasterplan = new FormGroup({
    imageDownloadURL: new FormControl('', [Validators.required]),
    imagePath: new FormControl('', [Validators.required])
  });
  projectMasterplanDescription = new FormControl('', [Validators.required]);
  diningImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', []),
    imagePath: new FormControl('', [])
  });
  shoppingImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', []),
    imagePath: new FormControl('', [])
  });
  entertainmentImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', []),
    imagePath: new FormControl('', [])
  });
  businessImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', []),
    imagePath: new FormControl('', [])
  });
  hospitalityImageForm = new FormGroup({
    imageDownloadURL: new FormControl('', []),
    imagePath: new FormControl('', [])
  });
  pageTitle: string;
  loading = true;

  @ViewChild('aboutImageElement')
  private aboutImageElementRef: ElementRef;

  @ViewChild('headerImageElement')
  private headerImageElementRef: ElementRef;

  @ViewChild('bgImage')
  private bgImage: ElementRef;

  @ViewChild('diningImageElement')
  private diningImageElementRef: ElementRef;

  @ViewChild('shoppingImageElement')
  private shoppingImageElementRef: ElementRef;

  @ViewChild('entertainmentImageElement')
  private entertainmentImageElementRef: ElementRef;

  @ViewChild('businessImageElement')
  private businessImageElementRef: ElementRef;

  @ViewChild('hospitalityImageElement')
  private hospitalityImageElementRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public projectService: ProjectService,
    private router: Router,
    public translate: TranslateService,
    private uploadService: UploadService,
    public snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.firebaseProjectSubscription = this.projectService.getProject()
      .subscribe(project => {
        this.project = project;
        this.updateFrom();
        this.pageTitle = this.project.title;
        this.loading = false;
      });
    // this.projectLocation.get('latitude').setValue(30.0167);
    // this.projectLocation.get('longitude').setValue(31.2167);
  }

  updateFrom() {
    if (this.project) {
      this.projectTitle.setValue(this.project.title);
      if (this.project.aboutImage) {
        this.aboutImageForm.get('imageDownloadURL').setValue(this.project.aboutImage.imageDownloadURL);
        this.aboutImageForm.get('imagePath').setValue(this.project.aboutImage.imagePath);
      }
      if (this.project.headerImage) {
        this.headerImageForm.get('imageDownloadURL').setValue(this.project.headerImage.imageDownloadURL);
        this.headerImageForm.get('imagePath').setValue(this.project.headerImage.imagePath);
      }
      this.projectAbout.setValue(this.project.about);
      if (this.project.location) {
        this.projectLocation.get('latitude').setValue(this.project.location.latitude);
        this.projectLocation.get('longitude').setValue(this.project.location.longitude);
      }
      this.projectMasterplanDescription.setValue(this.project.masterplanDescription);
      if (this.project.masterplan) {
        this.projectMasterplan.get('imageDownloadURL').setValue(this.project.masterplan.imageDownloadURL);
        this.projectMasterplan.get('imagePath').setValue(this.project.masterplan.imagePath);
      }
      if (this.project.dining) {
        this.diningImageForm.get('imageDownloadURL').setValue(this.project.dining.imageDownloadURL);
        this.diningImageForm.get('imagePath').setValue(this.project.dining.imagePath);
      }
      if (this.project.shopping) {
        this.shoppingImageForm.get('imageDownloadURL').setValue(this.project.shopping.imageDownloadURL);
        this.shoppingImageForm.get('imagePath').setValue(this.project.shopping.imagePath);
      }
      if (this.project.entertainment) {
        this.entertainmentImageForm.get('imageDownloadURL').setValue(this.project.entertainment.imageDownloadURL);
        this.entertainmentImageForm.get('imagePath').setValue(this.project.entertainment.imagePath);
      }
      if (this.project.business) {
        this.businessImageForm.get('imageDownloadURL').setValue(this.project.business.imageDownloadURL);
        this.businessImageForm.get('imagePath').setValue(this.project.business.imagePath);
      }
      if (this.project.hospitalityAndResidence) {
        this.hospitalityImageForm.get('imageDownloadURL').setValue(this.project.hospitalityAndResidence.imageDownloadURL);
        this.hospitalityImageForm.get('imagePath').setValue(this.project.hospitalityAndResidence.imagePath);
      }
    }
  }

  invalidForm(): boolean {
    return (this.projectTitle.invalid || this.projectAbout.invalid
      || this.projectLocation.invalid || this.projectMasterplan.invalid || this.projectMasterplanDescription.invalid
      || this.headerImageForm.invalid || this.aboutImageForm.invalid);
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

  chooseAboutPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.aboutImageForm, this.aboutImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseHeaderPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.headerImageForm, this.headerImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseMasterplanPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.projectMasterplan, this.bgImage)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseDiningPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.diningImageForm, this.diningImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseShoppingPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.shoppingImageForm, this.shoppingImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseEntertainmentPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.entertainmentImageForm, this.entertainmentImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseBusinessPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.businessImageForm, this.businessImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  chooseHospitalityPhoto(files): void {
    if (files && files[0]) {
      const imagesToUpload = [{
        base64img: '',
        file: files[0],
      }];
      const url = '/projects/images';
      this.uploadPhoto(imagesToUpload, url, this.hospitalityImageForm, this.hospitalityImageElementRef)
        .then(() => {
          this.openSnackBar('Uploaded Image Successfully', 'X');
        });
    }
  }

  isEmpty(formElement) {
    return (formElement.value.length === 0);
  }

  saveProject(): void {
    this.project = {
      title: this.projectTitle.value,
      headerImage: {
        imageDownloadURL: this.headerImageForm.get('imageDownloadURL').value,
        imagePath: this.headerImageForm.get('imagePath').value
      },
      about: this.projectAbout.value,
      aboutImage: {
        imageDownloadURL: this.aboutImageForm.get('imageDownloadURL').value,
        imagePath: this.aboutImageForm.get('imagePath').value
      },
      location: {
        latitude: this.projectLocation.get('latitude').value,
        longitude: this.projectLocation.get('longitude').value
      },
      masterplanDescription: this.projectMasterplanDescription.value,
      masterplan: {
        imageDownloadURL: this.projectMasterplan.get('imageDownloadURL').value,
        imagePath: this.projectMasterplan.get('imagePath').value
      },
      dining: this.isEmpty(this.diningImageForm.get('imageDownloadURL')) ? null : {
        imageDownloadURL: this.diningImageForm.get('imageDownloadURL').value,
        imagePath: this.diningImageForm.get('imagePath').value
      },
      shopping: this.isEmpty(this.shoppingImageForm.get('imageDownloadURL')) ? null : {
      imageDownloadURL: this.shoppingImageForm.get('imageDownloadURL').value,
      imagePath: this.shoppingImageForm.get('imagePath').value
      },
      entertainment: this.isEmpty(this.entertainmentImageForm.get('imageDownloadURL')) ? null : {
        imageDownloadURL: this.entertainmentImageForm.get('imageDownloadURL').value,
        imagePath: this.entertainmentImageForm.get('imagePath').value
      },
      business: this.isEmpty(this.businessImageForm.get('imageDownloadURL')) ? null : {
        imageDownloadURL: this.businessImageForm.get('imageDownloadURL').value,
        imagePath: this.businessImageForm.get('imagePath').value
      },
      hospitalityAndResidence: this.isEmpty(this.hospitalityImageForm.get('imageDownloadURL')) ? null : {
        imageDownloadURL: this.hospitalityImageForm.get('imageDownloadURL').value,
        imagePath: this.hospitalityImageForm.get('imagePath').value
      },
    };
    this.projectService.updateProject(this.project)
      .then(() => {
        console.log('Updated successfully: ', this.project);
        this.openSnackBar('Updated Project Successfully', 'X');
        this.router.navigate(['/admin']);
      }).catch(err => {
        console.log('Failed to Update with Error:', err);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseProjectSubscription) {
      this.firebaseProjectSubscription.unsubscribe();
    }
  }
}
