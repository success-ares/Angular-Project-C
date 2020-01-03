import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class ProjectService {
  readonly project = 'skywalkProject';
  readonly projectsList = 'skywalkProject/';
  readonly destnation = 'skywalkProject/destination';
  readonly location = 'skywalkProject/location';
  readonly SpectElements = 'skywalkProject/spectElements/elements';
  readonly Phase1 = 'skywalkProject/phase1';
  readonly elements = 'skywalkProject/elements';
  readonly concept = 'skywalkProject/concept';


  constructor(
        private ss: SharedService
  ) { }

  getLocation() {
    return this.ss.getObject(this.location);
  }

   getDestnation() {
    return this.ss.getObject(this.destnation);
  }

   getProjects() {
    return this.ss.getListAsSnapshot(this.projectsList, null ).pipe(map(res => {
      return res.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }
  getProject(id) {
    return this.ss.getObject(this.project + '/' + id);
  }
  getSpectElements(): any {
    return this.ss.getObject(this.SpectElements);
  }
  getPhase1(): any {
    return this.ss.getObjectAsSnapshot(this.Phase1).pipe(
      map((data: any) => {
        if (data) {
          return {sections: this.convertObjectToArray(data.payload.val().sections)};
        }
        return null;
      }));
  }
  getElements(): any {
    return this.ss.getObject(this.elements);
  }

  getConcept() {
    return this.ss.getObject(this.concept);
  }

  convertObjectToArray(object) {
    const array = [];
    Object.keys(object).forEach((key) => {
      array.push(object[key]);
    });
    return array;
  }
}
