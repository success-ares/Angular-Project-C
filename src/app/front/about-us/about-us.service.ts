import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Injectable()
export class AboutUsService {

  constructor(
    private sharedService: SharedService
  ) { }

  getAboutU() {
    return this.sharedService.getObject(`/aboutUs`);
  }
}
