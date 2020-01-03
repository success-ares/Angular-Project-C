import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { map } from "rxjs/internal/operators";

@Injectable()
export class ProjectService {
  readonly projectPath = 'project';

  constructor(
    private sharedService: SharedService
  ) { }

  getProject(): Observable<any> {
    return this.sharedService.getObjectAsSnapshot(`${this.projectPath}`).pipe(
      map((c: any) => {
        if (c.payload.val()) {
          return {key: c.payload.key, ...c.payload.val()};
        } else {
          return null;
        }
      }));
  }

  updateProject(project): Promise<void> {
    return this.sharedService.updateObject(`${this.projectPath}`, project);
  }
}
