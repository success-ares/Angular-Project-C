import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from '../event.service';
import { EventPage } from '../eventPage';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['../../admin-common-style.css', './events.component.css'],
  providers: [EventService]
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
  firebaseSubscription: Subscription = null;
  displayedColumns = ['event' , 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  events = [];
  loading = true;
  pageTitle: string;

  constructor(
    private eventService: EventService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translate.get('admin.events.pageTitle')
      .toPromise()
      .then(pageTitle => {
        this.pageTitle = pageTitle;
      });
    this.firebaseSubscription = this.eventService.getEventsList()
      .subscribe(events => {
        this.events = events;
        this.dataSource.data = this.events;
        this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteEvent(eventPage: EventPage): void {
    this.translate.get('admin.events.confirmDelete').toPromise().then(confirmString => {
      const result = confirm(`Are you sure to delete ${eventPage.title}?`);
      if (result) {
        this.eventService.deleteEvent(eventPage).then(() => {
          console.log('deleted successfully: ', eventPage);
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
