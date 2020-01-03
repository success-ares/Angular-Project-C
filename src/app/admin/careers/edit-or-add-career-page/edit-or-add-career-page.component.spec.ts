import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddCareerPageComponent } from './edit-or-add-career-page.component';

describe('EditOrAddCareerPageComponent', () => {
  let component: EditOrAddCareerPageComponent;
  let fixture: ComponentFixture<EditOrAddCareerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddCareerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddCareerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
