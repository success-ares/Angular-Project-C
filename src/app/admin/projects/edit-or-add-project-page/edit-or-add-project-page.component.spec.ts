import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddProjectPageComponent } from './edit-or-add-project-page.component';

describe('EditOrAddProjectPageComponent', () => {
  let component: EditOrAddProjectPageComponent;
  let fixture: ComponentFixture<EditOrAddProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
