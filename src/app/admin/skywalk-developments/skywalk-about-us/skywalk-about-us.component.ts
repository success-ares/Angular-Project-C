import { Component, OnDestroy, OnInit } from '@angular/core';
import { Header } from '../../component/header/header.component';
import { Section } from '../../component/section/section.component';
import { SkywalkService } from '../skywalk.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-skywalk-about-us',
  templateUrl: './skywalk-about-us.component.html',
  styleUrls: ['../../admin-common-style.css', './skywalk-about-us.component.css'],
  providers: [SkywalkService]
})
export class SkywalkAboutUsComponent implements OnInit, OnDestroy {
  firebaseAboutUsSubscription: Subscription = null;
  imagesSavePath: String = 'skywalkDevelopments/aboutUs/images';
  aboutUs: SkywalkAboutUs = null;
  validHeader = false;
  validSection = false;
  savePressed = false;

  constructor(
    private skywalkService: SkywalkService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firebaseAboutUsSubscription = this.skywalkService.getAboutUs()
      .subscribe(aboutUs => {
        this.aboutUs = aboutUs;
      });
  }

  updateHeader(header: Header): void {
    this.aboutUs = {
      ...this.aboutUs,
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
    this.aboutUs = {
      ...this.aboutUs,
      section: section
    };
  }

  valid(): boolean {
    return (!this.savePressed && this.aboutUs != null && this.aboutUs.header != null
      && this.validHeader && this.aboutUs.section != null && this.validSection);
  }

  save(): void {
    this.savePressed = true;
    this.skywalkService.saveAboutUs(this.aboutUs)
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
    if (this.firebaseAboutUsSubscription) {
      this.firebaseAboutUsSubscription.unsubscribe();
    }
  }
}

export interface SkywalkAboutUs {
  header: Header;
  section: Section;
}
