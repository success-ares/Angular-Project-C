import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Injectable()
export class CeoMessageService {

  constructor(
    private ss: SharedService
  ) { }

  getCeoMessage() {
    return this.ss.getObject('ceoMessage');
  }

}
