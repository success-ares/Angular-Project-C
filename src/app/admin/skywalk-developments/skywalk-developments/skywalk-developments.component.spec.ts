import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkDevelopmentsComponent } from './skywalk-developments.component';

describe('SkywalkDevelopmentsComponent', () => {
  let component: SkywalkDevelopmentsComponent;
  let fixture: ComponentFixture<SkywalkDevelopmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkDevelopmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkDevelopmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
