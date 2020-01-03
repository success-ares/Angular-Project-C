import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from '../career.service';
import { TranslateService } from '@ngx-translate/core';
import { AddNewCategoryDialogComponent } from '../add-new-category-dialog/add-new-category-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-edit-or-add-career-page',
  templateUrl: './edit-or-add-career-page.component.html',
  styleUrls: ['../../admin-common-style.css', './edit-or-add-career-page.component.css'],
  providers: [CareerService]
})
export class EditOrAddCareerPageComponent implements OnInit, OnDestroy {
  career;
  firebaseCareerSubscription: Subscription = null;
  firebaseCareersCategoriesSubscription: Subscription = null;
  careerTitle = new FormControl('', [Validators.required]);
  careerDescription = new FormControl('', [Validators.required]);
  careerRequirements = new FormControl('', [Validators.required]);
  careerExtras = new FormControl('', [Validators.required]);
  careerBenefits = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  careerAvailable = false;
  categories = [];
  isNew: boolean;
  careerId: string = null;
  pageTitle: string;
  loading = true;
  loadingCareersCategories = true;
  loadingCareer = true;

  constructor(
    private route: ActivatedRoute,
    public careerService: CareerService,
    private router: Router,
    public translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.careerId = this.route.snapshot.params['careerId'];
    if (this.careerId) {
      this.isNew = false;
      this.translate.get('admin.careers.career.editCareerPageTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.firebaseCareerSubscription = this.careerService.getCareerById(this.careerId)
        .subscribe(career => {
          this.career = career;
          this.updateFrom();
          this.loadingCareer = false;
          this.loading = this.loadingCareersCategories;
        });
    } else {
      this.translate.get('admin.careers.career.newCareerPageTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.isNew = true;
      this.loadingCareer = false;
      this.loading = this.loadingCareersCategories;
    }
    this.firebaseCareersCategoriesSubscription = this.careerService.getCareersCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.loadingCareersCategories = false;
        this.loading = this.loadingCareer;
      });
  }

  updateFrom(): void {
    if (this.career) {
      this.careerTitle.setValue(this.career.title);
      this.careerDescription.setValue(this.career.description);
      this.careerRequirements.setValue(this.career.requirements);
      this.careerExtras.setValue(this.career.extras);
      this.careerBenefits.setValue(this.career.benefits);
      this.category.setValue(this.career.category);
      this.careerAvailable = this.career.available;
    }
  }

  invalidForm(): boolean {
    return (this.careerTitle.invalid || this.careerDescription.invalid || this.careerRequirements.invalid
    || this.careerExtras.invalid || this.careerBenefits.invalid);
  }

  openModalForAddingNewCategory(): void {
    const dialogRef = this.dialog.open(AddNewCategoryDialogComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categories.push(result);
        this.careerService.updateCategories(this.categories)
          .then(() => {
            this.category.setValue(result);
          });
      }
    });
  }

  saveCareer(): void {
    this.career = {
      title: this.careerTitle.value,
      description: this.careerDescription.value,
      requirements: this.careerRequirements.value,
      extras: this.careerExtras.value,
      benefits: this.careerBenefits.value,
      available: this.careerAvailable,
      category: this.category.value,
    };
    if (this.isNew) {
      this.careerService.addCareer(this.career)
        .then(() => {
          console.log('Added successfully: ', this.career);
          this.router.navigate(['/admin/careers']);
        });
    } else {
      this.career.key = this.careerId;
      this.careerService.updateCareer(this.career)
        .then(() => {
          console.log('Updated successfully: ', this.career);
          this.router.navigate(['/admin/careers']);
        }).catch(err => {
        console.log('Failed to Update with Error:', err);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.firebaseCareerSubscription) {
      this.firebaseCareerSubscription.unsubscribe();
    }
    if (this.firebaseCareersCategoriesSubscription) {
      this.firebaseCareersCategoriesSubscription.unsubscribe();
    }
  }
}
