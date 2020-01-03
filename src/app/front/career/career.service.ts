import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';
@Injectable()
export class CareerService {

  readonly careerNode = 'careers/careersListDetails';
  readonly headerImage = 'careers/header/headerImage/imageDownloadURL';
  readonly mainSection = 'careers/mainSection';
  readonly benefitsListDetails = 'careers/benefitsListDetails';
  readonly appliedCareer = 'careers/applied';
  constructor(
    private ss: SharedService
  ) { }

  getCareers() {
    return this.ss.getListAsSnapshot(this.careerNode ,
      ref => ref.orderByChild('available').equalTo(true)
    ).pipe(map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      .reduce((h, a: any) => Object.assign(h, {
        [a.category]: ( h[a.category] || [] ).concat(a)
      }), {});
    })).pipe(map(res => this.getObjectValues(res)));
  }
  getHeaderImage() {
    return this.ss.getObject(this.headerImage);
  }
  getMainSection() {
    return this.ss.getObject(this.mainSection);
  }
  getBenefitsListDetails() {
    return this.ss.getListAsValue(this.benefitsListDetails , null);
  }
  applyToCareer(career) {
    delete career.applied;
    return this.ss.pushObjectToList(this.appliedCareer , career);
  }

  getObjectValues(object) {
    const res = [];
    Object.keys(object).forEach(key => {
      res.push(object[key]);
    });
    return res;
  }

}
