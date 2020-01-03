import { Injectable } from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ContactService {
  readonly contactPath = 'contact/feedback';
  readonly contactInfoPath = 'contact/info';

  constructor(private ss: SharedService) { }

  getContact(): Observable<any> {
    return this.ss.getListAsValue(`${this.contactPath}`, null);
  }
  getContactInfo(){
    return this.ss.getObject(this.contactInfoPath);
  }
  saveContactInfo(contact): Promise<void> {
    return this.ss.saveObject(this.contactInfoPath, contact);
  }

}
