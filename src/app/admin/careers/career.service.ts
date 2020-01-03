import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class CareerService {
  readonly careersListMetadataPath = 'careers/careersListMetadata';
  readonly careersListPath = 'careers/careersListDetails';
  readonly careersCategoriesPath = 'careers/categories';
  readonly careersPageHeaderPath = 'careers/header';
  readonly careersMainSectionPath = 'careers/mainSection';
  readonly benefitsListMetadataPath = 'careers/benefitsListMetadata';
  readonly benefitsListPath = 'careers/benefitsListDetails';

  constructor(
    private sharedService: SharedService,
  ) { }

  getCareersList(): Observable<any[]> {
    return this.sharedService.getListAsSnapshot(this.careersListMetadataPath, null).pipe(
      map(careersList => {
        return careersList.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
  }

  getBenefitsList(): Observable<any[]> {
    return this.sharedService.getListAsSnapshot(this.benefitsListMetadataPath, null).pipe(
      map(benefitsList => {
        return benefitsList.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
  }

  getCareersCategories() {
    return this.sharedService.getListAsValue(this.careersCategoriesPath, null);
  }

  getCareerById(careerId: string): Observable<any> {
    return this.sharedService.getObjectAsSnapshot(`${this.careersListPath}/${careerId}`).pipe(
      map((c: any) => {
        if (c.payload.val()) {
          return {key: c.payload.key, ...c.payload.val()};
        } else {
          return null;
        }
      }));
  }

  getBenefitById(benefitId: string): Observable<any> {
    return this.sharedService.getObjectAsSnapshot(`${this.benefitsListPath}/${benefitId}`).pipe(
      map((c: any) => {
        if (c.payload.val()) {
          return {key: c.payload.key, ...c.payload.val()};
        } else {
          return null;
        }
      }));
  }

  getMainSection(): Observable<any> {
    return this.sharedService.getObject(`${this.careersMainSectionPath}`);
  }

  saveMainSection(header): Promise<void> {
    return this.sharedService.saveObject(this.careersMainSectionPath, header);
  }

  getHeader(): Observable<any> {
    return this.sharedService.getObject(`${this.careersPageHeaderPath}`);
  }

  updateHeader(header): Promise<void> {
    return this.sharedService.updateObject(this.careersPageHeaderPath, header);
  }

  updateCategories(categories): Promise<void> {
    return this.sharedService.updateObject(this.careersCategoriesPath, categories);
  }

  updateCareerCategory(careerMetadata): Promise<void> {
    console.log(careerMetadata);
    return this.sharedService.saveObject(`${this.careersListMetadataPath}/${careerMetadata.key}/category`,
      careerMetadata.category);
  }

  addBenefit(newBenefit) {
    return this.sharedService.pushObjectToList(this.benefitsListPath, newBenefit);
  }

  updateBenefit(benefit): Promise<void> {
    return this.sharedService.updateObject(`${this.benefitsListPath}/${benefit.key}`, benefit);
  }

  deleteBenefit(benefit): Promise<void> {
    return this.sharedService.deleteObject(`${this.benefitsListMetadataPath}/${benefit.key}`);
  }

  addCareer(newcareer) {
    return this.sharedService.pushObjectToList(this.careersListPath, newcareer);
  }

  updateCareer(career): Promise<void> {
    return this.sharedService.updateObject(`${this.careersListPath}/${career.key}`, career);
  }

  deleteCareer(career): Promise<void> {
    return this.sharedService.deleteObject(`${this.careersListMetadataPath}/${career.key}`);
  }
}
