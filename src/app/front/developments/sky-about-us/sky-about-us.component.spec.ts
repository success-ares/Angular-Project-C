import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkyAboutUsComponent } from './sky-about-us.component';

describe('SkyAboutUsComponent', () => {
  let component: SkyAboutUsComponent;
  let fixture: ComponentFixture<SkyAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkyAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
