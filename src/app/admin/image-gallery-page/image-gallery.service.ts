import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import ThenableReference = firebase.database.ThenableReference;
import {combineLatest} from "rxjs/observable/combineLatest";
import { map } from 'rxjs/internal/operators';

@Injectable()
export class ImageGalleryService {
  readonly imageGalleryPath = 'imageGallery';

  constructor(
    private sharedService: SharedService
  ) {}

  getGalleryList(): Observable<any[]> {
    return this.sharedService.getListAsValue(`${this.imageGalleryPath}`, null).pipe(map(galleryList => {
      return galleryList;
    }));
  }

  saveImageGallery(gallery): Promise<void> {
    return this.sharedService.saveObject(`${this.imageGalleryPath}`, gallery);
  }

  private generateRandomId(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  uploadAllLocalImages(gallery: any[]) {
    const promises = [];
    const completion: Observable<number>[] = [];
    const newImages = gallery.map(i => !(!(i.img)));
    gallery.forEach(image => {
      if (image.img) {
        const url = `imageGallery/${this.generateRandomId(32)}`;
        const uploadTask = this.sharedService.uploadBlobToURL(url, image.img);
        completion.push(uploadTask.percentageChanges().pipe(map(num => num / newImages.length)));
        promises.push(uploadTask.then().then((upload) => {
          return {
            imagePath: url,
            imageDownloadURL: upload.downloadURL
          };
        }));
      } else {
        promises.push(Promise.resolve(image));
      }
    });
    const finish = Promise.all(promises);
    const progress = combineLatest(completion).pipe(map(
      (...args) => {
        let percentage = 0;
        args[0].forEach(arg => {
          percentage += arg;
        });
        return percentage;
      }
    ));
    return {finish, progress};
  }
}
