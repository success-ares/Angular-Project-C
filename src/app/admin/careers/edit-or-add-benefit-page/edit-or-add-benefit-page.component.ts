import { Component, OnDestroy, OnInit } from '@angular/core';
import { CareerService } from '../career.service';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-or-add-benefit-page',
  templateUrl: './edit-or-add-benefit-page.component.html',
  styleUrls: ['../../admin-common-style.css', './edit-or-add-benefit-page.component.css'],
  providers: [CareerService]
})
export class EditOrAddBenefitPageComponent implements OnInit, OnDestroy {
  benefit;
  firebaseBenenfitSubscription: Subscription = null;
  benefitHeaderForm = new FormControl('', [Validators.required]);
  benefitContentForm = new FormControl('', [Validators.required]);
  isNew: boolean;
  benefitId: string = null;
  pageTitle: string;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public careerService: CareerService,
    private router: Router,
    public translate: TranslateService,
    public snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.benefitId = this.route.snapshot.params['benefitId'];
    if (this.benefitId) {
      this.isNew = false;
      this.translate.get('admin.careers.editBenefitPageTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.firebaseBenenfitSubscription = this.careerService.getBenefitById(this.benefitId)
        .subscribe(benefit => {
          this.benefit = benefit;
          this.updateFrom(this.benefit);
          this.loading = false;
        });
    } else {
      this.translate.get('admin.careers.newBenefitPageTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.isNew = true;
      this.loading = false;
    }
  }

  updateFrom(benefit) {
    if (benefit) {
      this.benefitHeaderForm.setValue(benefit.header);
      this.benefitContentForm.setValue(benefit.content);
    }
  }

  invalidForm(): boolean {
    return (this.benefitHeaderForm.invalid || this.benefitContentForm.invalid);
  }

  saveBenefit(): void {
    this.benefit = {
      header: this.benefitHeaderForm.value,
      content: this.benefitContentForm.value,
    };
    if (this.isNew) {
      this.careerService.addBenefit(this.benefit)
        .then(() => {
          console.log('Added successfully: ', this.benefit);
          this.openSnackBar('Added Successfully', 'X');
          this.router.navigate(['/admin/careers']);
        });
    } else {
      this.benefit.key = this.benefitId;
      this.careerService.updateBenefit(this.benefit)
        .then(() => {
          console.log('Updated successfully: ', this.benefit);
          this.openSnackBar('Updated Successfully', 'X');
          this.router.navigate(['/admin/careers']);
        }).catch(err => {
          this.openSnackBar('Failed to Update', 'X');
          console.log('Failed to Update with Error:', err);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseBenenfitSubscription) {
      this.firebaseBenenfitSubscription.unsubscribe();
    }
  }
}
