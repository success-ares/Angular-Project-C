import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { SkywalkDestination } from './skywalk-destination/skywalk-destination.component';
import { SkywalkLocation } from './skywalk-location/skywalk-location.component';

@Injectable()
export class SkywalkProjectService {
  readonly skywalkProjectPath = 'skywalkProject';

  constructor(
    private sharedService: SharedService,
  ) { }

  saveDestination(destination: SkywalkDestination): Promise<void> {
    return this.sharedService.saveObject(`${this.skywalkProjectPath}/destination`, destination);
  }

  getDestination(): Observable<any> {
    return this.sharedService.getObject(`${this.skywalkProjectPath}/destination`);
  }

  saveLocation(location: SkywalkLocation): Promise<void> {
    return this.sharedService.saveObject(`${this.skywalkProjectPath}/location`, location);
  }

  getLocation(): Observable<any> {
    return this.sharedService.getObject(`${this.skywalkProjectPath}/location`);
  }
}
