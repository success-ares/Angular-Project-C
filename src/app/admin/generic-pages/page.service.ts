import {Injectable} from '@angular/core';
import {SharedService} from '../../shared/services/shared.service';
import {Observable} from 'rxjs/Observable';
import {take} from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class PageService {
  readonly genericPagesListPath = 'genericPages/pagesListDetails';

  constructor(private sharedService: SharedService, ) {
  }

  getPagesList(): Observable<any[]> {
    return this.sharedService.getListAsSnapshot(this.genericPagesListPath, null).pipe(
      map(pagesList => {
        return pagesList.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }));
  }

  getPageSectionsList(pageId) {
    return this.sharedService.getListAsSnapshot(`${this.genericPagesListPath}/${pageId}/sections`,
      ref => ref.orderByChild('right/order')).pipe(
      map(sec => {
        sec.forEach(function (child) {
          console.log(child.payload.val()); // NOW THE CHILDREN PRINT IN ORDER
        });
        return sec.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }));
  }

  updatePageSectionsList(pageId, sections) {
    const sectionList = {};
    Object(sections).forEach((section: any) => {
      sectionList[section.key] = section;
    });
    console.log(sectionList);
    return this.sharedService.updateObject(`${this.genericPagesListPath}/${pageId}/sections`, sectionList);
  }

  getPageSectionById(pageId, sectionId) {
    return this.sharedService.getObject(`${this.genericPagesListPath}/${pageId}/sections/${sectionId}`);
  }

  checkIfLinkTakenByAnotherPage(pageLink: string, pageKey: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.sharedService.getListAsSnapshot(this.genericPagesListPath,
        ref => ref.orderByChild('link').equalTo(pageLink))
        .pipe(take(1))
        .toPromise()
        .then((pageList: any) => {
          let foundAnotherPage = false;
          pageList.forEach(d => {
            if (d.key !== pageKey) {
              foundAnotherPage = true;
            }
          });
          resolve(foundAnotherPage);
        });
    });
  }

  getPageById(pageId: string): Observable<any> {
    return this.sharedService.getObject(`${this.genericPagesListPath}/${pageId}`);
  }

  addPage(newPage) {
    return this.sharedService.pushObjectToList(this.genericPagesListPath, newPage);
  }

  updatePage(page): Promise<void> {
    return this.sharedService.updateObject(`${this.genericPagesListPath}/${page.key}`, page);
  }

  deletePage(pageMetadata): Promise<void> {
    return this.sharedService.deleteObject(`${this.genericPagesListPath}/${pageMetadata.key}`);
  }

  deleteSection(pageId, sectionId) {
    return this.sharedService.deleteObject(`${this.genericPagesListPath}/${pageId}/sections/${sectionId}`);
  }
}
