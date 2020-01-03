import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { SkywalkAboutUs } from './skywalk-about-us/skywalk-about-us.component';
import { Observable } from 'rxjs/Observable';
import { SkywalkPhilosophy } from './skywalk-our-philosophy/skywalk-our-philosophy.component';
import { SkywalkKeysToSuccess } from './skywalk-our-key-to-success/skywalk-our-key-to-success.component';
import { SkywalkOurPartners } from './skywalk-our-partners/skywalk-our-partners.component';

@Injectable()
export class SkywalkService {
  readonly skywalkDevelopmentsPath = 'skywalkDevelopments';

  constructor(
    private sharedService: SharedService,
  ) { }

  saveAboutUs(aboutUs: SkywalkAboutUs): Promise<void> {
    return this.sharedService.saveObject(`${this.skywalkDevelopmentsPath}/aboutUs`, aboutUs);
  }

  getAboutUs(): Observable<any> {
    return this.sharedService.getObject(`${this.skywalkDevelopmentsPath}/aboutUs`);
  }

  savePhilosophy(philosophy: SkywalkPhilosophy): Promise<void> {
    return this.sharedService.saveObject(`${this.skywalkDevelopmentsPath}/philosophy`, philosophy);
  }

  getPhilosophy(): Observable<any> {
    return this.sharedService.getObject(`${this.skywalkDevelopmentsPath}/philosophy`);
  }

  saveKeysToSuccess(keysToSuccess: SkywalkKeysToSuccess): Promise<void> {
    return this.sharedService.saveObject(`${this.skywalkDevelopmentsPath}/keysToSuccess`, keysToSuccess);
  }

  getKeysToSuccess(): Observable<any> {
    return this.sharedService.getObject(`${this.skywalkDevelopmentsPath}/keysToSuccess`);
  }

  saveOurPartners(ourPartners: SkywalkOurPartners): Promise<void> {
    return this.sharedService.saveObject(`${this.skywalkDevelopmentsPath}/ourPartners`, ourPartners);
  }

  getOurPartners(): Observable<any> {
    return this.sharedService.getObject(`${this.skywalkDevelopmentsPath}/ourPartners`);
  }
}
