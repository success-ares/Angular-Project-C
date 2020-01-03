import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { PressReleaseService } from '../press-release.service';
import { PressReleasePage } from '../pressReleasePage';

@Component({
  selector: 'app-press-releases',
  templateUrl: './press-releases.component.html',
  styleUrls: ['../../admin-common-style.css', './press-releases.component.css'],
  providers: [PressReleaseService]
})
export class PressReleasesComponent implements OnInit, AfterViewInit, OnDestroy {
  firebaseSubscription: Subscription = null;
  displayedColumns = ['pressRelease' , 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pressReleases = [];
  loading = true;
  pageTitle: string;

  constructor(
    private pressReleaseService: PressReleaseService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translate.get('admin.pressReleases.pageTitle')
      .toPromise()
      .then(pageTitle => {
        this.pageTitle = pageTitle;
      });
    this.firebaseSubscription = this.pressReleaseService.getPressReleasesList()
      .subscribe(pressReleases => {
        this.pressReleases = pressReleases;
        this.dataSource.data = this.pressReleases;
        this.loading = false;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deletePressRelease(pressReleasePage: PressReleasePage): void {
    this.translate.get('admin.pressReleases.confirmDelete').toPromise().then(confirmString => {
      const result = confirm(`Are you sure to delete ${pressReleasePage.title}?`);
      if (result) {
        this.pressReleaseService.deletePressRelease(pressReleasePage).then(() => {
          console.log('deleted successfully: ', pressReleasePage);
        }).catch((err) => {
          console.log('Failed to Delete with Error:', err);
        });
      } else {
        console.log('canceled');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseSubscription) {
      this.firebaseSubscription.unsubscribe();
    }
  }
}
