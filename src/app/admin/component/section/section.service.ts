import { Injectable } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';

@Injectable()
export class SectionService {

  constructor(
    private ss: SharedService
  ) { }

  pushSectionToPage(section , pageId) {
    return this.ss.pushObjectToList(`genericPages/pagesListDetails/${pageId}/sections`, section);
  }
  saveSection(section , pageId , sectionId) {
    return this.ss.saveObject(`genericPages/pagesListDetails/${pageId}/sections/${sectionId}`, section);
  }
  getPageSectionById(sectionId , pageId) {
    return this.ss.getObjectAsSnapshot(`genericPages/pagesListDetails/${pageId}/sections/${sectionId}`);
  }
}
