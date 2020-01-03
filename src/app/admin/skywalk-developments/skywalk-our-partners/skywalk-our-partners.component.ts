import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkywalkService } from '../skywalk.service';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Header } from '../../component/header/header.component';
import { Section } from '../../component/section/section.component';

@Component({
  selector: 'app-skywalk-our-partners',
  templateUrl: './skywalk-our-partners.component.html',
  styleUrls: ['../../admin-common-style.css', './skywalk-our-partners.component.css'],
  providers: [SkywalkService]
})
export class SkywalkOurPartnersComponent implements OnInit , OnDestroy {
  firebaseOurPartnersSubscription: Subscription = null;
  imagesSavePath: String = 'skywalkDevelopments/ourPartners/images';
  ourPartners: SkywalkOurPartners = null;
  validHeader = false;
  validSection = false;
  savePressed = false;

  constructor(
    private skywalkService: SkywalkService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firebaseOurPartnersSubscription = this.skywalkService.getOurPartners()
      .subscribe(ourPartners => {
        this.ourPartners = ourPartners;
      });
  }

  updateHeader(header: Header): void {
    this.ourPartners = {
      ...this.ourPartners,
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
    this.ourPartners = {
      ...this.ourPartners,
      section: section
    };
  }

  valid(): boolean {
    return (!this.savePressed && this.ourPartners != null && this.ourPartners.header != null
      && this.validHeader && this.ourPartners.section != null && this.validSection);
  }

  save(): void {
    this.savePressed = true;
    this.skywalkService.saveOurPartners(this.ourPartners)
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
    if (this.firebaseOurPartnersSubscription) {
      this.firebaseOurPartnersSubscription.unsubscribe();
    }
  }
}

export interface SkywalkOurPartners {
  header: Header;
  section: Section;
}
