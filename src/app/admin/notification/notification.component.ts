import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from './notification.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  providers: [ NotificationService ]
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifiSub: Subscription;
  redirectURL = new FormControl(null, [Validators.required]);
  title = new FormControl(null, [Validators.required]);

  constructor(
    private ns: NotificationService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.notifiSub = this.ns.getNotification().subscribe((res: any) => {
      this.redirectURL.setValue(res.redirectURL);
      this.title.setValue(res.title);
    });
  }
  saveNotification () {
    const notification = {
      title: this.title.value,
      redirectURL: this.redirectURL.value
    };
    this.ns.saveNotification(notification).then(() => {
      this.opensnackBar('Saved successfully', '');
    });
  }

  opensnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    if (this.notifiSub) {
      this.notifiSub.unsubscribe();
    }
  }
}
