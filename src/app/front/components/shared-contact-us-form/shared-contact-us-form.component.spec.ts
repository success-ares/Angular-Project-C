import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedContactUsFormComponent } from './shared-contact-us-form.component';

describe('SharedContactUsFormComponent', () => {
  let component: SharedContactUsFormComponent;
  let fixture: ComponentFixture<SharedContactUsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedContactUsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedContactUsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
