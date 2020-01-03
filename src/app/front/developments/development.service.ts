import { Injectable } from '@angular/core';
import { SharedService } from "../../shared/services/shared.service";

@Injectable()
export class DevelopmentService {
  readonly skyAbout = 'skywalkDevelopments/aboutUs';
  readonly keysToSuccess = 'skywalkDevelopments/keysToSuccess';
  readonly ourPartners = 'skywalkDevelopments/ourPartners/partners';
  readonly philosophy = 'skywalkDevelopments/philosophy';

  constructor(
        private ss: SharedService
  ) { }
  getAboutUs() {
    return this.ss.getObject(this.skyAbout);
  }

   getKeysToSuccess() {
    return this.ss.getObject(this.keysToSuccess);
  }

   getOurPartners() {
     return this.ss.getListAsValue(this.ourPartners , null);
  }

   getPhilosophy() {
    return this.ss.getObject(this.philosophy);
  }

  convertObjectToArray(object) {
    const array = [];
    Object.keys(object).forEach((key) => {
      array.push(object[key]);
    });
    return array;
  }
}
