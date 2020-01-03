import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { PressReleasePage } from './pressReleasePage';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class PressReleaseService {
  readonly pressReleasesList = 'pressReleases';

  constructor(
    private sharedService: SharedService,
  ) { }

  getPressReleasesList(): Observable<any[]> {
    return this.sharedService.getListAsSnapshot(this.pressReleasesList, null).pipe(
      map(res => {
        return res.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
  }

  getPressReleaseById(id: string): Observable<any> {
    return this.sharedService.getObject(`${this.pressReleasesList}/${id}`);
  }

  addPressRelease(pressRelease: PressReleasePage) {
    return this.sharedService.pushObjectToList(this.pressReleasesList, pressRelease);
  }

  updatePressRelease(pressRelease: PressReleasePage): Promise<void> {
    return this.sharedService.updateObject(`${this.pressReleasesList}/${pressRelease.key}`, pressRelease);
  }

  deletePressRelease(pressRelease: PressReleasePage): Promise<void> {
    return this.sharedService.deleteObject(`${this.pressReleasesList}/${pressRelease.key}`);
  }
}
