import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddBenefitPageComponent } from './edit-or-add-benefit-page.component';

describe('EditOrAddBenefitPageComponent', () => {
  let component: EditOrAddBenefitPageComponent;
  let fixture: ComponentFixture<EditOrAddBenefitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddBenefitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddBenefitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
