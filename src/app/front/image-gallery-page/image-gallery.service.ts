import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class ImageGalleryService {
  readonly imageGalleryPath = 'imageGallery';

  constructor(
    private sharedService: SharedService
  ) { }

  getGalleryList(): Observable<any[]> {
    return this.sharedService.getListAsValue(`${this.imageGalleryPath}`, null).pipe(map(galleryList => {
      return galleryList;
    }));
  }
}
