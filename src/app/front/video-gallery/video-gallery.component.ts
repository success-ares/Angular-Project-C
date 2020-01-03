import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from './video.service';
import { VideoModalComponent } from './video-modal/video-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SeoService } from "../../shared/services/seo.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css'],
  providers: [ VideoService ]
})
export class VideoGalleryComponent implements OnInit , OnDestroy {


  videoSub: Subscription;
  videosUrls: any;
  loading = true;
  constructor(
    private vs: VideoService,
    public dialog: MatDialog,
    private seoService: SeoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.videoSub = this.vs.getVideoGalary().subscribe(res => {
      this.videosUrls = res;
      this.loading = false;
      if (this.videosUrls && this.videosUrls.length > 0) {
        this.seoService.generateTags({
          title: 'Video gallery',
          image: this.videosUrls[0].image,
          slug: this.router.url,
        });
      } else {
        this.seoService.generateTags({
          title: 'Video gallery',
          slug: this.router.url,
        });
      }
    });
  }
  openModal(url) {
    this.dialog.open(VideoModalComponent, {
      data: {url},
      width: '70%',
      height: '50%'
    });
  }

  ngOnDestroy(): void {
    this.videoSub.unsubscribe();
  }

}
