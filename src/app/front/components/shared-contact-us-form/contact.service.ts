import { Injectable } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable()
export class ContactService {
  readonly contacts = 'contact';
  constructor(
    private ss: SharedService
  ) { }

  sendToContact(data) {
    return this.ss.pushObjectToList('contact/feedback', data);
  }
}
