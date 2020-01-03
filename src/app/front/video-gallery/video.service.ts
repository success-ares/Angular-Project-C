import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Injectable()
export class VideoService {

  readonly videoGalary = 'videoGalary';

  constructor(
    private ss: SharedService
  ) { }

  getVideoGalary() {
    return this.ss.getListAsValue(`${this.videoGalary}` , null);
  }
}
