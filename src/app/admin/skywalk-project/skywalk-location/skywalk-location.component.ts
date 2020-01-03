import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Header } from '../../component/header/header.component';
import { Section } from '../../component/section/section.component';
import { SkywalkProjectService } from '../skywalk-project.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skywalk-location',
  templateUrl: './skywalk-location.component.html',
  styleUrls: ['../../admin-common-style.css', './skywalk-location.component.css'],
  providers: [SkywalkProjectService]
})
export class SkywalkLocationComponent implements OnInit , OnDestroy {
  firebaseLocationSubscription: Subscription = null;
  imagesSavePath: String = 'skywalkProject/location/images';
  location: SkywalkLocation = null;
  validHeader = false;
  validSection = false;
  savePressed = false;

  constructor(
    private skywalkProjectService: SkywalkProjectService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firebaseLocationSubscription = this.skywalkProjectService.getLocation()
      .subscribe(location => {
        this.location = location;
      });
  }

  updateHeader(header: Header): void {
    this.location = {
      ...this.location,
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
    this.location = {
      ...this.location,
      section: section
    };
  }

  valid(): boolean {
    return (!this.savePressed && this.location != null && this.location.header != null
      && this.validHeader && this.location.section != null && this.validSection);
  }

  save(): void {
    this.savePressed = true;
    this.skywalkProjectService.saveLocation(this.location)
      .then(() => {
        this.openSnackBar('Saved Successfully', 'X');
        this.router.navigate(['/admin/skywalkProject']);
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
    if (this.firebaseLocationSubscription) {
      this.firebaseLocationSubscription.unsubscribe();
    }
  }
}

export interface SkywalkLocation {
  header: Header;
  section: Section;
}
