import { Injectable } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable()
export class NotificationService {

  constructor(
    private ss: SharedService
  ) { }

  getNotification(){
    return this.ss.getObject('notification');
  }

}
