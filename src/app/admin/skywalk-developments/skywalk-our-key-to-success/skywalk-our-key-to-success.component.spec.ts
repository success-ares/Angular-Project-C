import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkOurKeyToSuccessComponent } from './skywalk-our-key-to-success.component';

describe('SkywalkOurKeyToSuccessComponent', () => {
  let component: SkywalkOurKeyToSuccessComponent;
  let fixture: ComponentFixture<SkywalkOurKeyToSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkOurKeyToSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkOurKeyToSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
