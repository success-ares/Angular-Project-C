import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Injectable()
export class VideoService {
  readonly videoGalary = 'videoGalary';
  constructor(
    private ss: SharedService
  ) { }
  private getVideoId(url: String) {
    const rgx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    if (url.match(rgx) && url.match(rgx)[1]) {
      return url.match(rgx)[1];
    } else {
      return null;
    }
  }
  addVideoUrl(data) {
    const videoId = this.getVideoId(data.url);
    console.log(videoId);
    if (videoId) {
      data.url = `https://www.youtube.com/embed/${videoId}`;
      data.image = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }
   return this.ss.pushObjectToList( this.videoGalary , data);
  }
  saveNewOrder(videos) {
    return this.ss.saveObject(this.videoGalary , videos);
  }
  getVideosUrls() {
    return this.ss.getListAsValue(this.videoGalary , null);
  }
  removeVideoUrl(id) {
    return this.ss.deleteObject(`${this.videoGalary}/${id}`);
  }
}
