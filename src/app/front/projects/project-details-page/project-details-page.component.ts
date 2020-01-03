import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-details-page',
  templateUrl: './project-details-page.component.html',
  styleUrls: ['./project-details-page.component.css'],
  providers: [ProjectService]
})
export class ProjectDetailsPageComponent implements OnInit, OnDestroy {
  firebaseProjectSubscription: Subscription = null;
  project;
  projectId: string;
  mapUrl;
  loading = true;

  constructor(
    private projectService: ProjectService,
    private sanitizer: DomSanitizer,
    ) {
  }

  ngOnInit() {
    this.firebaseProjectSubscription = this.projectService.getProject()
      .subscribe(project => {
        this.project = project;
        const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCDN25r3F10eMq_h985L8Xj8zsbUjQaeB8&` +
          `q=${this.project.location.latitude}, ${this.project.location.longitude}`;
        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.loading = false;
      });
  }

  openGoogleMapInNewTab(): void {
    window.open(`https://www.google.com/maps/?q=${this.project.location.latitude},${this.project.location.longitude}`);
  }

  ngOnDestroy(): void {
    if (this.firebaseProjectSubscription) {
      this.firebaseProjectSubscription.unsubscribe();
    }
  }
}
