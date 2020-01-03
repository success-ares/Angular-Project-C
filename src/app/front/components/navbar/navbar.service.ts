import { Injectable } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';
@Injectable()
export class NavbarService {

  constructor(
    private ss: SharedService
  ) { }

  getNavBar() {
    return this.ss.getObjectAsSnapshot('navbar').pipe(map((res: any) => {
      if (res) {
        return{
          items: this.getObjectValues(res.payload.val().items) ,
          contact: res.payload.val().contact
        };
      }
      return null;
    }));
  }

  getObjectValues(object) {
    const res = [];
    Object.keys(object).forEach(key => {
      res.push(object[key]);
    });
    return res;
  }
}
