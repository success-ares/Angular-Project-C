import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { VideoService } from './video.service';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  selector: 'app-video-galary',
  templateUrl: './video-galary.component.html',
  styleUrls: ['./video-galary.component.css'],
  providers: [ VideoService ]
})
export class VideoGalaryComponent implements OnInit , OnDestroy , AfterViewInit {
  urlsSub: Subscription;
  url = new FormControl(null, [Validators.required]);

  displayedColumns = ['url', 'move', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageTitle: string;
  progressPercentage: any;
  uploadingImages = false;
  pageIndex = 0;
  pageSize = 5;
  pageEvent= new PageEvent();
  urls = [];
  loading = true;
  pressedSave = false;

  constructor(
    private vs: VideoService
  ) { }

 async ngOnInit() {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
   this.urlsSub = this.vs.getVideosUrls().subscribe(res => {
     this.urls = res;
     this.dataSource.data = this.urls;
    this.dataSource.paginator = this.paginator;
      this.loading = false;
   });
   console.log(this.url);

  }

  getRowIndex(rowPageIndex: number): number {
    return (this.pageEvent.pageSize * this.pageEvent.pageIndex) + rowPageIndex;
  }

  move(index: number, up: boolean): void {
    const operand = up ? -1 : 1;
    const temp = this.urls[index];
    this.urls[index] = this.urls[index + operand];
    this.urls[index + operand] = temp;
    this.dataSource._updateChangeSubscription();
    this.vs.saveNewOrder(this.urls).then(() => {
      console.log('done');
    });
  }

  addVideoUrl() {
    this.vs.addVideoUrl({url : this.url.value}).then(() => {
      console.log('done');
      this.url.reset();
      this.paginator.lastPage();
    });
  }
    delete(index: any) {
      const result = confirm(`are you sure to delete this video`);
      if (result) {
        this.urls.splice(index, 1);
        this.vs.saveNewOrder(this.urls).then(() => {
          console.log('done');
          this.dataSource._updateChangeSubscription();
        });
      } else {
        console.log('cancelled');
      }
  }

    ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
    ngOnDestroy(): void {
    if (this.urlsSub) {
      this.urlsSub.unsubscribe();
    }
  }
}
