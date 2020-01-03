import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityElementsComponent } from './speciality-elements.component';

describe('SpecialityElementsComponent', () => {
  let component: SpecialityElementsComponent;
  let fixture: ComponentFixture<SpecialityElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
