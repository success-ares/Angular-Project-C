import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkAboutUsComponent } from './skywalk-about-us.component';

describe('SkywalkAboutUsComponent', () => {
  let component: SkywalkAboutUsComponent;
  let fixture: ComponentFixture<SkywalkAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
