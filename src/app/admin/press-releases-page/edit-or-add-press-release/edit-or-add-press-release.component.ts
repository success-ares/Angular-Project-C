import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { PressReleasePage } from '../pressReleasePage';
import { PressReleaseService } from '../press-release.service';

@Component({
  selector: 'app-edit-or-add-press-release',
  templateUrl: './edit-or-add-press-release.component.html',
  styleUrls: ['./edit-or-add-press-release.component.css'],
  providers: [PressReleaseService]
})
export class EditOrAddPressReleaseComponent implements OnInit, OnDestroy {
  pressRelease: PressReleasePage;
  firebasePressReleaseSubscription: Subscription = null;
  pressReleaseGroupForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    date: new FormControl(null, []),
    image: new FormGroup({
      imageDownloadURL: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
    }),
    outerButton: new FormGroup({
      title: new FormControl(null, [Validators.required]),
    })
  });
  isNew: boolean;
  pressReleaseId: string = null;
  pageTitle: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public pressReleaseService: PressReleaseService,
    private router: Router,
    public translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.pressReleaseId = this.route.snapshot.params['id'];
    if (this.pressReleaseId) {
      this.isNew = false;
      this.translate.get('admin.pressReleases.pressRelease.editPressReleaseTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.firebasePressReleaseSubscription = this.pressReleaseService.getPressReleaseById(this.pressReleaseId)
        .subscribe(pressRelease => {
          this.pressRelease = pressRelease;
          this.updateFrom();
          this.loading = false;
        });
    } else {
      this.translate.get('admin.pressReleases.pressRelease.newPressReleaseTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.isNew = true;
      this.loading = false;
    }
  }

  updateFrom() {
    if (this.pressRelease) {
      this.pressReleaseGroupForm.get('title').setValue(this.pressRelease.title);
      this.pressReleaseGroupForm.get('content').setValue(this.pressRelease.content);
      this.pressReleaseGroupForm.get('date').setValue(this.pressRelease.date);
      if (this.pressRelease.image) {
        this.pressReleaseGroupForm.get('image').get('imageDownloadURL').setValue(this.pressRelease.image.imageDownloadURL);
        this.pressReleaseGroupForm.get('image').get('imagePath').setValue(this.pressRelease.image.imagePath);
      }
      if (this.pressRelease.outerButton) {
        this.pressReleaseGroupForm.get('outerButton').get('title').setValue(this.pressRelease.outerButton.title);
      }
    } else {
      this.pressReleaseGroupForm.reset();
    }
  }

  pressReleaseImage(image): void {
    this.pressReleaseGroupForm.get('image').setValue(image);
  }

  invalidForm(): boolean {
    return this.pressReleaseGroupForm.invalid;
  }

  savePressRelease(): void {
    this.pressRelease = this.pressReleaseGroupForm.value;
    console.log(this.pressRelease);
    if (this.pressReleaseId) {
      this.pressRelease.key = this.pressReleaseId;
      this.pressReleaseService.updatePressRelease(this.pressRelease)
        .then(() => {
          this.router.navigateByUrl('/admin/pressReleases');
          this.openSnackBar('Saved Successfully', null);
        });
    } else {
      this.pressRelease.date = new Date(Date.now()).toString();
      this.pressReleaseService.addPressRelease(this.pressRelease)
        .then(() => {
          this.router.navigateByUrl('/admin/pressReleases');
          this.openSnackBar('Saved Successfully', null);
        });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebasePressReleaseSubscription) {
      this.firebasePressReleaseSubscription.unsubscribe();
    }
  }
}
