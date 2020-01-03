import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class PartnersService {
  readonly ourPartners = 'skywalkDevelopments/ourPartners/partners';

  constructor(private ss: SharedService) {
  }


  getOurPartners() {
    return this.ss.getListAsSnapshot(this.ourPartners, null).pipe(
      map(res => {
        return res.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }));
  }

  saveOurPartners(data) {
    return this.ss.saveObject(this.ourPartners, data);
  }
}
