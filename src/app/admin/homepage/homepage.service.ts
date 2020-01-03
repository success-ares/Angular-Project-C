import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Observable } from 'rxjs/Observable';
import { ThenableReference } from '@firebase/database-types';
import { map } from 'rxjs/internal/operators';

@Injectable()
export class HomepageService {
  readonly homepageHeadersPath = 'homepage/carousel';

  constructor(private ss: SharedService) { }

  getHomeHeaderCarouselList(): Observable<any> {
    return this.ss.getListAsSnapshot(this.homepageHeadersPath, null).pipe(map(headerList => {
      return headerList.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }

  saveHomeHeaderCarouselData(data): ThenableReference  {
    return this.ss.pushObjectToList(`${this.homepageHeadersPath}`, data);
  }

  deleteHomeHeaderCarouselData(headerId): Promise<any> {
    return this.ss.deleteObject(this.homepageHeadersPath + '/' + headerId);
  }

  deleteHeaderImageFromStorage(imagePath): Promise<any> {
    return this.ss.deleteStorageFile(imagePath).toPromise();
  }

  getCarouselheaderObject(headerId): Observable<any> {
    return this.ss.getObjectAsSnapshot(this.homepageHeadersPath + '/' + headerId);
  }

  updateCarouselHeader(headerId, data): Promise<any> {
    return this.ss.updateObject(this.homepageHeadersPath + '/' + headerId, data);
  }

  private generateRandomId(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  uploadLoaclImage(imgFile: File): Promise<any> {
    const url = `homepage/carousel/${this.generateRandomId(32)}.jpg`;
    return this.ss.uploadBlobToURL(url, imgFile).then().then((upload) => {
      return {
        imgPath: url,
        imgDownloadPath: upload.downloadURL
      };
    });
  }

}
