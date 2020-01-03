import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageGalleryService } from '../image-gallery.service';
import { Subscription } from 'rxjs/Subscription';
import {GridLayout, Image, PlainGalleryConfig, PlainGalleryStrategy} from "@ks89/angular-modal-gallery";
import {ModalImage} from "@ks89/angular-modal-gallery";
import { SeoService } from "../../../shared/services/seo.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
  providers: [ImageGalleryService]
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  firebaseGallerySubscription: Subscription = null;
  loading = true;
  imageGallery = [];
  images: Image[]; // init this value with your images
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: 'calc(25% - 40px)', height: 'auto' }, { length: 100, wrap: true })
  };

  constructor(
    private imageGalleryService: ImageGalleryService,
    private seoService: SeoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.firebaseGallerySubscription = this.imageGalleryService.getGalleryList()
      .subscribe(imageGallery => {
        this.imageGallery = imageGallery;
        this.images = [];
        for (let i = 0; i < this.imageGallery.length; i++) {
          this.images.push(new Image(i,
            {
              img: this.imageGallery[i].imageDownloadURL
            })
          );
        }
        console.log(this.images);
        if (this.imageGallery && this.imageGallery.length > 0) {
          this.seoService.generateTags({
            title: 'Image gallery',
            image: this.imageGallery[0].imageDownloadURL,
            slug: this.router.url,
          });
        } else {
          this.seoService.generateTags({});
        }
        this.loading = false;
      });
  }

  addRandomImage() {
    const imageToCopy: Image = this.images[Math.floor(Math.random() * this.images.length)];
    const newImage: Image = new Image(this.images.length - 1 + 1, imageToCopy.modal, imageToCopy.plain);
    this.images = [...this.images, newImage]; // this is really important (you MUST create a new copy of the input array)
  }

  ngOnDestroy(): void {
    if (this.firebaseGallerySubscription) {
      this.firebaseGallerySubscription.unsubscribe();
    }
  }
}
