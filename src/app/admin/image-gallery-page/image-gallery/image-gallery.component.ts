import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { ImageGalleryService } from '../image-gallery.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['../../admin-common-style.css', './image-gallery.component.css'],
  providers: [ImageGalleryService]
})
export class ImageGalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  firebaseGallerySubscription: Subscription = null;
  displayedColumns = ['image', 'move', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageTitle: string;
  progressPercentage: any;
  uploadingImages = false;
  pageIndex = 0;
  pageSize = 5;
  pageEvent= new PageEvent();
  imageGallery = [];
  loading = true;
  pressedSave = false;

  constructor(
    public imageGalleryService: ImageGalleryService,
    public translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.translate.get('admin.imageGallery.pageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.firebaseGallerySubscription = this.imageGalleryService.getGalleryList()
      .subscribe(imageGallery => {
        this.imageGallery = imageGallery;
        this.dataSource.data = this.imageGallery;
        this.loading = false;
      });
  }

  getRowIndex(rowPageIndex: number): number {
    return (this.pageEvent.pageSize * this.pageEvent.pageIndex) + rowPageIndex;
  }

  move(index: number, up: boolean): void {
    const operand = up ? -1 : 1;
    const temp = this.imageGallery[index];
    this.imageGallery[index] = this.imageGallery[index + operand];
    this.imageGallery[index + operand] = temp;
    this.dataSource._updateChangeSubscription();
  }

  delete(index: any) {
    this.translate.get('admin.imageGallery.confirmDelete').toPromise().then(confirmString => {
      const result = confirm(`${confirmString}`);
      if (result) {
        this.imageGallery.splice(index, 1);
        this.dataSource._updateChangeSubscription();
      } else {
        console.log('cancelled');
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  save(): void {
    this.uploadingImages = true;
    const uploadImages = this.imageGalleryService.uploadAllLocalImages(this.imageGallery);
    uploadImages.progress.subscribe(p => this.progressPercentage = p);
    uploadImages.finish.then((res) => {
      this.imageGallery = this.imageGallery.map((image, idx) => ({
        imageDownloadURL: res[idx].imageDownloadURL,
        imagePath: res[idx].imagePath,
      }));
      this.progressPercentage = 100;
      this.imageGalleryService.saveImageGallery(this.imageGallery)
        .then(() => {
          console.log('Updated successfully: ');
          this.uploadingImages = false;
        }).catch(err => {
          console.log('Failed to Update with Error:', err);
          this.uploadingImages = false;
        this.progressPercentage = 0;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseGallerySubscription) {
      this.firebaseGallerySubscription.unsubscribe();
    }
  }

  readImageData(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  handleImageSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.readImageData(file).then((img) => {
          this.imageGallery.push({
            img: file,
            imagePath: '',
            imageDownloadURL: img,
          });
          this.dataSource._updateChangeSubscription();
          this.paginator.lastPage();
        });
      }
    }
  }
}

