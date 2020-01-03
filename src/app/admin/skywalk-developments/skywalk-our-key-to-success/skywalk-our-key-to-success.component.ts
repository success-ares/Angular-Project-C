import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkywalkService } from '../skywalk.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Header } from '../../component/header/header.component';
import { Section } from '../../component/section/section.component';

@Component({
  selector: 'app-skywalk-our-key-to-success',
  templateUrl: './skywalk-our-key-to-success.component.html',
  styleUrls: ['../../admin-common-style.css', './skywalk-our-key-to-success.component.css'],
  providers: [SkywalkService]
})
export class SkywalkOurKeyToSuccessComponent implements OnInit , OnDestroy {
  firebaseKeysToSuccessSubscription: Subscription = null;
  imagesSavePath: String = 'skywalkDevelopments/keysToSuccess/images';
  keysToSuccess: SkywalkKeysToSuccess = null;
  validHeader = false;
  validSection = false;
  savePressed = false;

  constructor(
    private skywalkService: SkywalkService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firebaseKeysToSuccessSubscription = this.skywalkService.getKeysToSuccess()
      .subscribe(keysToSuccess => {
        this.keysToSuccess = keysToSuccess;
      });
  }

  updateHeader(header: Header): void {
    this.keysToSuccess = {
      ...this.keysToSuccess,
      header: header
    };
  }

  updateHeaderValidation(valid: boolean): void {
    this.validHeader = valid;
  }

  updateSectionValidation(valid: boolean): void {
    this.validSection = valid;
  }

  updateSection(section: Section): void {
    this.keysToSuccess = {
      ...this.keysToSuccess,
      section: section
    };

  }

  valid(): boolean {
    return (!this.savePressed && this.keysToSuccess != null && this.keysToSuccess.header != null
      && this.validHeader && this.keysToSuccess.section != null && this.validSection);
  }

  save(): void {
    this.savePressed = true;
    this.skywalkService.saveKeysToSuccess(this.keysToSuccess)
      .then(() => {
        this.openSnackBar('Saved Successfully', 'X');
        this.router.navigate(['/admin/skywalkDevelopments']);
      })
      .catch((err) => {
        this.openSnackBar('Error while saving', 'X');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseKeysToSuccessSubscription) {
      this.firebaseKeysToSuccessSubscription.unsubscribe();
    }
  }
}

export interface SkywalkKeysToSuccess {
  header: Header;
  section: Section;
}
