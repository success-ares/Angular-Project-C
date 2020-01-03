import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGalaryComponent } from './video-galary.component';

describe('VideoGalaryComponent', () => {
  let component: VideoGalaryComponent;
  let fixture: ComponentFixture<VideoGalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
