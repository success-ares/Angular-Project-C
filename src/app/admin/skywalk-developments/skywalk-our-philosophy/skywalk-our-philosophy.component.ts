import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Header } from '../../component/header/header.component';
import { Section } from '../../component/section/section.component';
import { SkywalkService } from '../skywalk.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skywalk-our-philosophy',
  templateUrl: './skywalk-our-philosophy.component.html',
  styleUrls: ['../../admin-common-style.css', './skywalk-our-philosophy.component.css'],
  providers: [SkywalkService],
})
export class SkywalkOurPhilosophyComponent implements OnInit, OnDestroy {
  firebasePhilosophySubscription: Subscription = null;
  imagesSavePath: String = 'skywalkDevelopments/philosophy/images';
  philosophy: SkywalkPhilosophy = null;
  validHeader = false;
  validCorporateVision = false;
  validStrategy = false;
  validApproach = false;
  validTargetSegment = false;
  savePressed = false;

  constructor(
    private skywalkService: SkywalkService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.firebasePhilosophySubscription = this.skywalkService.getPhilosophy()
      .subscribe(philosophy => {
        this.philosophy = philosophy;
      });
  }

  updateHeader(header: Header): void {
    this.philosophy = {
      ...this.philosophy,
      header: header
    };
  }

  updateHeaderValidation(valid: boolean): void {
    this.validHeader = valid;
  }

  updateCorporateVision(corporateVision: Section): void {
    this.philosophy = {
      ...this.philosophy,
      corporateVision: corporateVision
    };
  }

  updateCorporateVisionValidation(valid: boolean): void {
    this.validCorporateVision = valid;
  }

  updateStrategy(strategy: Section): void {
    console.log(strategy  )
    this.philosophy = {
      ...this.philosophy,
      strategy: strategy
    };
  }

  updateStrategyValidation(valid: boolean): void {
    this.validStrategy = valid;
  }

  updateApproach(approach: Section): void {
    this.philosophy = {
      ...this.philosophy,
      approach: approach
    };
  }

  updateApproachValidation(valid: boolean): void {
    this.validApproach = valid;
  }

  updateTargetSegment(targetSegment: Section): void {
    this.philosophy = {
      ...this.philosophy,
      targetSegment: targetSegment
    };
  }

  updateTargetSegmentValidation(valid: boolean): void {
    this.validTargetSegment = valid;
  }

  valid(): boolean {
    return (!this.savePressed && this.philosophy != null && this.validHeader &&
      this.validCorporateVision && this.validStrategy && this.validApproach && this.validTargetSegment);
  }

  save(): void {
    this.savePressed = true;
    this.skywalkService.savePhilosophy(this.philosophy)
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
    if (this.firebasePhilosophySubscription) {
      this.firebasePhilosophySubscription.unsubscribe();
    }
  }
}

export interface SkywalkPhilosophy {
  header: Header;
  corporateVision: Section;
  strategy: Section;
  approach: Section;
  targetSegment: Section;
}
