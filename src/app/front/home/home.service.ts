import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
@Injectable()
export class HomeService {

  constructor(
    private ss: SharedService
  ) { }

  getCarouselItems() {
    return this.ss.getListAsValue('/homepage/carousel', null);
  }
}

