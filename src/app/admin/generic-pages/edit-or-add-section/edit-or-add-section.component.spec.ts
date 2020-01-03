import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddSectionComponent } from './edit-or-add-section.component';

describe('EditOrAddSectionComponent', () => {
  let component: EditOrAddSectionComponent;
  let fixture: ComponentFixture<EditOrAddSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
