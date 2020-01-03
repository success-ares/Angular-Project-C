import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSectionComponent } from './shared-section.component';

describe('SharedSectionComponent', () => {
  let component: SharedSectionComponent;
  let fixture: ComponentFixture<SharedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
