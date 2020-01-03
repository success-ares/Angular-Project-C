import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkLocationComponent } from './skywalk-location.component';

describe('SkywalkLocationComponent', () => {
  let component: SkywalkLocationComponent;
  let fixture: ComponentFixture<SkywalkLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
