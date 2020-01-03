import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { EventService } from '../event.service';
import { EventPage } from '../eventPage';

@Component({
  selector: 'app-edit-or-add-event',
  templateUrl: './edit-or-add-event.component.html',
  styleUrls: ['./edit-or-add-event.component.css'],
  providers: [EventService]
})
export class EditOrAddEventComponent implements OnInit, OnDestroy {
  event: EventPage;
  firebaseEventSubscription: Subscription = null;
  eventGroupForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    content: new FormControl(null, [Validators.required]),
    date: new FormControl(null, []),
    eventDate: new FormControl(Date.now(), [Validators.required]),
    image: new FormGroup({
      imageDownloadURL: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
    }),
    innerButton: new FormGroup({
      url: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
    }),
    outerButton: new FormGroup({
      title: new FormControl(null, [Validators.required]),
    })
  });
  isNew: boolean;
  eventId: string = null;
  pageTitle: string;
  loading = true;
  startDate = Date.now();

  constructor(
    private route: ActivatedRoute,
    public eventService: EventService,
    private router: Router,
    public translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    if (this.eventId) {
      this.isNew = false;
      this.translate.get('admin.events.event.editEventTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.firebaseEventSubscription = this.eventService.getEventById(this.eventId)
        .subscribe(event => {
          this.event = event;
          this.updateFrom();
          this.loading = false;
        });
    } else {
      this.translate.get('admin.events.event.newEventTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.isNew = true;
      this.loading = false;
    }
  }

  updateFrom() {
    if (this.event) {
      this.eventGroupForm.get('title').setValue(this.event.title);
      this.eventGroupForm.get('content').setValue(this.event.content);
      this.eventGroupForm.get('date').setValue(this.event.date);
      this.eventGroupForm.get('eventDate').setValue(new Date(this.event.eventDate).toISOString());
      if (this.event.image) {
        this.eventGroupForm.get('image').get('imageDownloadURL').setValue(this.event.image.imageDownloadURL);
        this.eventGroupForm.get('image').get('imagePath').setValue(this.event.image.imagePath);
      }
      if (this.event.innerButton) {
        this.eventGroupForm.get('innerButton').get('url').setValue(this.event.innerButton.url);
        this.eventGroupForm.get('innerButton').get('title').setValue(this.event.innerButton.title);
      }
      if (this.event.outerButton) {
        this.eventGroupForm.get('outerButton').get('title').setValue(this.event.outerButton.title);
      }
      console.log(this.eventGroupForm.value);
      console.log(this.event);
    } else {
      this.eventGroupForm.reset();
    }
  }

  eventImage(image): void {
    this.eventGroupForm.get('image').setValue(image);
  }

  invalidForm(): boolean {
    return this.eventGroupForm.invalid;
  }

  saveEvent(): void {
    this.event = this.eventGroupForm.value;
    console.log(this.event);
    if (this.eventId) {
      this.event.key = this.eventId;
      this.event.eventDate = this.eventGroupForm.get('eventDate').value.toString();
      this.eventService.updateEvent(this.event)
        .then(() => {
          this.router.navigateByUrl('/admin/events');
          this.openSnackBar('Saved Successfully', null);
      });
    } else {
      this.event.date = new Date(Date.now()).toString();
      this.event.eventDate = this.eventGroupForm.get('eventDate').value.toString();
      this.eventService.addEvent(this.event)
        .then(() => {
          this.router.navigateByUrl('/admin/events');
          this.openSnackBar('Saved Successfully', null);
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseEventSubscription) {
      this.firebaseEventSubscription.unsubscribe();
    }
  }
}
