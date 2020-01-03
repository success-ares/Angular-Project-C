import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Injectable()
export class ContactService {
  readonly contacts = 'contact';
  constructor(
    private ss: SharedService
  ) { }

  getContactInfo() {
    return this.ss.getObject('contact/info');
  }
}
