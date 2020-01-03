import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavbarService {
  readonly navbarPath = 'navbar/items';
  readonly contactNavbarPath = 'navbar/contact';

  constructor(private ss: SharedService) { }

  getNavbar(): Observable<any[]> {
    return this.ss.getListAsValue(this.navbarPath, null);
  }

  getContactNavbar(): Observable<any> {
    return this.ss.getObject(this.contactNavbarPath);
  }

  saveContactNavber(data: any): Promise<void> {
    return this.ss.saveObject(this.contactNavbarPath, data);
  }

  saveNavber(data: any): Promise<void> {
    return this.ss.saveObject(this.navbarPath, data);
  }
}
