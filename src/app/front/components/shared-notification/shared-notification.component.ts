import { Component, OnInit, OnDestroy , ViewChild, ElementRef, Input } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shared-notification',
  templateUrl: './shared-notification.component.html',
  styleUrls: ['./shared-notification.component.css'],
  providers: [ NotificationService ]
})
export class SharedNotificationComponent implements OnInit , OnDestroy {
  notService: Subscription;

  noti: any;

  @ViewChild('notifi') notifi: ElementRef;

  constructor(
    private ns: NotificationService
  ) { }

  ngOnInit() {
    this.notService = this.ns.getNotification().subscribe(res=>{
      this.noti = res;
    });
  }
  ngOnDestroy(): void {
    if (this.notService){
      this.notService.unsubscribe();
    }

  }

}
