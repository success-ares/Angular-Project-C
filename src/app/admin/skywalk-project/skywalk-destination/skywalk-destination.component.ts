import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Header } from '../../component/header/header.component';
import { Section } from '../../component/section/section.component';
import { SkywalkProjectService } from '../skywalk-project.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skywalk-destination',
  templateUrl: './skywalk-destination.component.html',
  styleUrls: ['../../admin-common-style.css', './skywalk-destination.component.css'],
  providers: [SkywalkProjectService]
})
export class SkywalkDestinationComponent implements OnInit , OnDestroy {
  firebaseDestinationSubscription: Subscription = null;
  imagesSavePath: String = 'skywalkProject/destination/images';
  destination: SkywalkDestination = null;
  validHeader = false;
  validSection = false;
  savePressed = false;

  constructor(
    private skywalkProjectService: SkywalkProjectService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firebaseDestinationSubscription = this.skywalkProjectService.getDestination()
      .subscribe(destination => {
        this.destination = destination;
      });
  }

  updateHeader(header: Header): void {
    this.destination = {
      ...this.destination,
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
    this.destination = {
      ...this.destination,
      section: section
    };
  }

  valid(): boolean {
    return (!this.savePressed && this.destination != null && this.destination.header != null
      && this.validHeader && this.destination.section != null && this.validSection);
  }

  save(): void {
    this.savePressed = true;
    this.skywalkProjectService.saveDestination(this.destination)
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
    if (this.firebaseDestinationSubscription) {
      this.firebaseDestinationSubscription.unsubscribe();
    }
  }
}

export interface SkywalkDestination {
  header: Header;
  section: Section;
}
